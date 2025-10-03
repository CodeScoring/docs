---
hide:
  - footer
---

# Подключение вебхуков

Codescoring поддерживает систему оповещений на базе вебхуков. При возникновении событий отправляется `POST` HTTP-запрос на указанный URL.

## Добавление нового вебхука

Для добавления нового вебхука на платформе необходимо выполнить следующие действия:

1. Перейти в раздел `Настройки -> Вебхуки`.
2. Нажать на кнопку **Добавить**.
3. Заполнить поля в форме:

    - **Название** – название в системе CodeScoring;
    - **URL** – адрес с указанием протокола. Например: `http://webhook.com/`;
    - **Проекты** - список проектов, для которых будут применяться вебхуки. Если поле пустое, будут учитываться все проекты;
    - **События** – список событий, на которые сработает оповещение;
    - **Njrty** – токен, который передается в HTTP-запросе (заголовок `X-CodeScoring-Authentication`);

4. Проверить подключение после заполнения данных по кнопке **Проверить подключение**. При тестировании используется триггер `test` с пустым payload.

После создания нового подключения по кнопке **Добавить** вебхук отобразится в списке раздела с возможностью посмотреть детальную информацию, отредактировать или удалить его.

## Структура тела запроса

```json
{
  "events": [
    {
      "created_at": "datetime_in_iso_format",
      "trigger": "trigger_name",
      "payload": {
        ...
      }
    },
    ...
  ]
}
```

## Механизм отправления запросов

Запросы обрабатываются каждые 5 секунд, согласно периодической задаче, выполняемой системой.

Вебхук обычно отправляет одно событие за запрос. Однако в следующих случаях может быть отправлен массив событий:

- **Отправка накопленных событий:** если за единицу времени (по умолчанию – 5 секунд) произошло несколько событий, они будут отправлены одним запросом;
- **Ретраи (повторные попытки):** если сервер не ответил или вернул ошибку на предыдущую попытку, все неуспешные события отправляются повторно единым запросом.

Коды HTTP в диапазоне [200; 299] считаются успешными. Если ответ сервера не входит в этот диапазон, событие считается неуспешным, накапливается и отправляется повторно по следующему расписанию: 1 минута → 5 минут → 30 минут → 3 часа → 12 часов → 24 часа → 48 часов.
Если хотя бы один запрос остается безуспешным через 48 часов, вебхук отключается, и события больше не отправляются.

## Управление вебхуками через API

Для управления вебхуками предоставляется API по эндпоинту `/api/settings/webhooks` со следующими командами:

- `GET /api/settings/webhooks/` — получить список всех вебхуков;
- `POST /api/settings/webhooks/` — создать новый вебхук;
- `GET /api/settings/webhooks/{id}/` — получить информацию по ID;
- `PUT /api/settings/webhooks/{id}/` — полностью обновить данные;
- `PATCH /api/settings/webhooks/{id}/` — частично обновить данные;
- `DELETE /api/settings/webhooks/{id}/` — удалить вебхук по ID;
- `POST /api/settings/webhooks/{id}/refresh_availability_status/` — обновить статус доступности;
- `POST /api/settings/webhooks/test/` — протестировать подключение;
- `GET /api/settings/webhooks/triggers/` — получить список доступных триггеров.

## Доступные события

<table>
  <thead>
    <tr>
      <th>Название события</th>
      <th>Описание события</th>
      <th>Значение trigger в запросе</th>
      <th>Схема payload в запросе</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>SCA Policy has been triggered</td>
      <td>Сработала политика при SCA-анализе</td>
      <td>sca_policy_has_been_triggered</td>
      <td>
        <pre>
  ```
  "alert_id": 0,
  "stage": "dev|source|build|stage|test|prod|proxy",
  "level": "info|warning|critical",
  "policy_id": 0,
  "policy_name": 0,
  "dependency_id": 0,
  "dependency_purl": "purl",
  "matched_criteria": ["matched_criteria", ...],
  "project_id": 0
  ```
</pre>
      </td>
    </tr>
    <tr>
      <td>OSA Policy has been triggered</td>
      <td>Сработала политика при OSA-анализе</td>
      <td>osa_policy_has_been_triggered</td>
      <td>
        <pre>
  ```
  "alert_id": 0,
  "stage": "dev|source|build|stage|test|prod|proxy",
  "level": "info|warning|critical",
  "policy_id": 0,
  "policy_name": 0,
  "dependency_id": 0,
  "dependency_purl": "purl",
  "matched_criteria": ["matched_criteria", ...],
  "container_image_id": 0,
  "artifact_repository_id": 0
  ```
</pre>
      </td>
    </tr>
    <tr>
      <td>Project SCA analysis started</td>
      <td>SCA-анализ проекта был запущен</td>
      <td>project_sca_analysis_started</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name"
  ```
</pre>
      </td>
    </tr>
    <tr>
      <td>Project SCA analysis finished</td>
      <td>SCA-анализ проекта был завершён</td>
      <td>project_sca_analysis_finished</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name",
  "vulnerabilities_count": 0,
  "dependencies_count": 0
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Project SCA analysis cancelled</td>
      <td>SCA-анализ проекта был отменён</td>
      <td>project_sca_analysis_cancelled</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Project SCA analysis failed</td>
      <td>SCA-анализ проекта был завершён с ошибкой</td>
      <td>project_sca_analysis_failed</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name",
  "error": "error_description"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Container Image SCA analysis started</td>
      <td>SCA-анализ контейнерного образа был запущен</td>
      <td>container_image_sca_analysis_started</td>
      <td>
        <pre>
  ```
  "container_image_id": 0,
  "container_image_name": "container_image_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Container Image SCA analysis finished</td>
      <td>SCA-анализ контейнерного образа был завершён</td>
      <td>container_image_sca_analysis_finished</td>
      <td>
        <pre>
  ```
  "container_image_id": 0,
  "container_image_name": "container_image_name",
  "vulnerabilities_count": 0,
  "dependencies_count": 0
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Container Image SCA analysis cancelled</td>
      <td>SCA-анализ контейнерного образа был отменён</td>
      <td>container_image_sca_analysis_cancelled</td>
      <td>
        <pre>
  ```
  "container_image_id": 0,
  "container_image_name": "container_image_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Container Image SCA analysis failed</td>
      <td>SCA-анализ контейнерного образа был завершён с ошибкой</td>
      <td>container_image_sca_analysis_failed</td>
      <td>
        <pre>
  ```
  "container_image_id": 0,
  "container_image_name": "container_image_name",
  "error": "error_description"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Clone analysis started</td>
      <td>Анализ дубликатов проекта был запущен</td>
      <td>clones_analysis_started</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Clone analysis finished</td>
      <td>Анализ дубликатов проекта был завершён</td>
      <td>clones_analysis_finished</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Clone analysis cancelled</td>
      <td>Анализ дубликатов проекта был отменён</td>
      <td>clones_analysis_cancelled</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Clone analysis failed</td>
      <td>Анализ дубликатов проекта был завершён с ошибкой</td>
      <td>clones_analysis_failed</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name",
  "error": "error_description"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Authors analysis started</td>
      <td>Анализ авторов проекта был запущен</td>
      <td>authors_analysis_started</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Authors analysis finished</td>
      <td>Анализ авторов проекта был завершён</td>
      <td>authors_analysis_finished</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Authors analysis failed</td>
      <td>Анализ авторов проекта был завершён с ошибкой</td>
      <td>authors_analysis_failed</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name",
  "error": "error_description"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Authors analysis cancelled</td>
      <td>Анализ авторов проекта был отменён</td>
      <td>authors_analysis_cancelled</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Cloning of repository started</td>
      <td>Клонирование репозитория было запущено</td>
      <td>cloning_of_repository_started</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name",
  "repo_url": "repo_url",
  "repo_ref_name": "repo_ref_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Cloning of repository finished</td>
      <td>Клонирование репозитория было завершено</td>
      <td>cloning_of_repository_finished</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name",
  "repo_url": "repo_url",
  "repo_ref_name": "repo_ref_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Cloning of repository failed</td>
      <td>Клонирование репозитория было завершено с ошибкой</td>
      <td>cloning_of_repository_failed</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name",
  "repo_url": "repo_url",
  "repo_ref_name": "repo_ref_name",
  "error": "error_description"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Project Secrets analysis started</td>
      <td>Начался анализ секретов проекта</td>
      <td>project_secrets_analysis_started</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Project Secrets analysis finished</td>
      <td>Завершился анализ секретов проекта</td>
      <td>project_secrets_analysis_finished</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Project Secrets analysis cancelled</td>
      <td>Анализ секретов проекта был отменен</td>
      <td>project_secrets_analysis_cancelled</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Project Secrets analysis failed</td>
      <td>Анализ секретов проекта был завершен с ошибкой</td>
      <td>project_secrets_analysis_failed</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Secrets ML model user training run started</td>
      <td>Началось обучение ML модели для модуля Секретов</td>
      <td>ml_model_user_secrets_training_run_started</td>
      <td>
        <pre>
  ```
  Пустой payload
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Secrets ML model user training run finished</td>
      <td>Обучение ML модели для модуля Секретов завершено</td>
      <td>ml_model_user_secrets_training_run_finished</td>
      <td>
        <pre>
  ```
  Пустой payload
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Secrets ML model user training run cancelled</td>
      <td>Обучение ML модели для модуля Секретов отменено</td>
      <td>ml_model_user_secrets_training_run_cancelled</td>
      <td>
        <pre>
  ```
  Пустой payload
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Secrets ML model user training run failed</td>
      <td>Обучение ML модели для модуля Секретов завершено с ошибкой</td>
      <td>ml_model_user_secrets_training_run_failed</td>
      <td>
        <pre>
  ```
  Пустой payload
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Secrets ML model user accepted</td>
      <td>ML модель для модуля Секретов принята</td>
      <td>ml_model_user_secrets_accepted</td>
      <td>
        <pre>
  ```
  Пустой payload
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Secrets ML model user purged</td>
      <td>ML модель для модуля Секретов очищена</td>
      <td>ml_model_user_secrets_purged</td>
      <td>
        <pre>
  ```
  Пустой payload
  ```
 </pre>
      </td>
    </tr>
  </tbody>
</table>



## Пример простого приложения на Flask

```python
import json

from flask import Flask, request


app = Flask(__name__)

events = []


@app.get('/')
def show_events():
    return f'<pre>{json.dumps(events, indent=2)}</pre>'


@app.post('/')
def handle_events():
    received_events = request.json.get('events', [])
    events.extend(received_events)
    return 'OK'
```