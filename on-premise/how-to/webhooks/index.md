- [English](https://docs.codescoring.ru/on-premise/how-to/webhooks.en/index.md)

# Подключение вебхуков

Codescoring поддерживает систему оповещений на базе вебхуков. При возникновении событий отправляется `POST` HTTP-запрос на указанный URL.

## Добавление нового вебхука

Для добавления нового вебхука на платформе необходимо выполнить следующие действия:

1. Перейти в раздел `Настройки -> Вебхуки`.

1. Нажать на кнопку **Добавить**.

1. Заполнить поля в форме:

   - **Название** – название в системе CodeScoring;
   - **URL** – адрес с указанием протокола. Например: `http://webhook.com/`;
   - **Проекты** - список проектов, для которых будут применяться вебхуки. Если поле пустое, будут учитываться все проекты;
   - **События** – список событий, на которые сработает оповещение;
   - **Токен** – токен, который передается в HTTP-запросе (заголовок `X-CodeScoring-Authentication`);

1. Проверить подключение после заполнения данных по кнопке **Проверить подключение**. При тестировании используется триггер `test` с пустым payload.

После создания нового подключения по кнопке **Добавить** вебхук отобразится в списке раздела с возможностью посмотреть детальную информацию, отредактировать или удалить его.

## Структура тела запроса

```
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

Коды HTTP в диапазоне [200; 299] считаются успешными. Если ответ сервера не входит в этот диапазон, событие считается неуспешным, накапливается и отправляется повторно по следующему расписанию: 1 минута → 5 минут → 30 минут → 3 часа → 12 часов → 24 часа → 48 часов. Если хотя бы один запрос остается безуспешным через 48 часов, вебхук отключается, и события больше не отправляются.

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

| Название события                             | Описание события                                           | Значение trigger в запросе                   | Схема payload в запросе                                                                                                                          |
| -------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| SCA Policy has been triggered                | Сработала политика при SCA-анализе                         | sca_policy_has_been_triggered                | `  ` "alert_id": 0, "stage": "dev                                                                                                                |
| OSA Policy has been triggered                | Сработала политика при OSA-анализе                         | osa_policy_has_been_triggered                | `  ` "alert_id": 0, "stage": "dev                                                                                                                |
| Project SCA analysis started                 | SCA-анализ проекта был запущен                             | project_sca_analysis_started                 | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Project SCA analysis finished                | SCA-анализ проекта был завершён                            | project_sca_analysis_finished                | `  ` "project_id": 0, "project_name": "project_name", "vulnerabilities_count": 0, "dependencies_count": 0 ` `                                    |
| Project SCA analysis cancelled               | SCA-анализ проекта был отменён                             | project_sca_analysis_cancelled               | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Project SCA analysis failed                  | SCA-анализ проекта был завершён с ошибкой                  | project_sca_analysis_failed                  | `  ` "project_id": 0, "project_name": "project_name", "error": "error_description" ` `                                                           |
| Container Image SCA analysis started         | SCA-анализ контейнерного образа был запущен                | container_image_sca_analysis_started         | `  ` "container_image_id": 0, "container_image_name": "container_image_name" ` `                                                                 |
| Container Image SCA analysis finished        | SCA-анализ контейнерного образа был завершён               | container_image_sca_analysis_finished        | `  ` "container_image_id": 0, "container_image_name": "container_image_name", "vulnerabilities_count": 0, "dependencies_count": 0 ` `            |
| Container Image SCA analysis cancelled       | SCA-анализ контейнерного образа был отменён                | container_image_sca_analysis_cancelled       | `  ` "container_image_id": 0, "container_image_name": "container_image_name" ` `                                                                 |
| Container Image SCA analysis failed          | SCA-анализ контейнерного образа был завершён с ошибкой     | container_image_sca_analysis_failed          | `  ` "container_image_id": 0, "container_image_name": "container_image_name", "error": "error_description" ` `                                   |
| Clone analysis started                       | Анализ дубликатов проекта был запущен                      | clones_analysis_started                      | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Clone analysis finished                      | Анализ дубликатов проекта был завершён                     | clones_analysis_finished                     | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Clone analysis cancelled                     | Анализ дубликатов проекта был отменён                      | clones_analysis_cancelled                    | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Clone analysis failed                        | Анализ дубликатов проекта был завершён с ошибкой           | clones_analysis_failed                       | `  ` "project_id": 0, "project_name": "project_name", "error": "error_description" ` `                                                           |
| Authors analysis started                     | Анализ авторов проекта был запущен                         | authors_analysis_started                     | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Authors analysis finished                    | Анализ авторов проекта был завершён                        | authors_analysis_finished                    | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Authors analysis failed                      | Анализ авторов проекта был завершён с ошибкой              | authors_analysis_failed                      | `  ` "project_id": 0, "project_name": "project_name", "error": "error_description" ` `                                                           |
| Authors analysis cancelled                   | Анализ авторов проекта был отменён                         | authors_analysis_cancelled                   | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Cloning of repository started                | Клонирование репозитория было запущено                     | cloning_of_repository_started                | `  ` "project_id": 0, "project_name": "project_name", "repo_url": "repo_url", "repo_ref_name": "repo_ref_name" ` `                               |
| Cloning of repository finished               | Клонирование репозитория было завершено                    | cloning_of_repository_finished               | `  ` "project_id": 0, "project_name": "project_name", "repo_url": "repo_url", "repo_ref_name": "repo_ref_name" ` `                               |
| Cloning of repository failed                 | Клонирование репозитория было завершено с ошибкой          | cloning_of_repository_failed                 | `  ` "project_id": 0, "project_name": "project_name", "repo_url": "repo_url", "repo_ref_name": "repo_ref_name", "error": "error_description" ` ` |
| Project Secrets analysis started             | Начался анализ секретов проекта                            | project_secrets_analysis_started             | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Project Secrets analysis finished            | Завершился анализ секретов проекта                         | project_secrets_analysis_finished            | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Project Secrets analysis cancelled           | Анализ секретов проекта был отменен                        | project_secrets_analysis_cancelled           | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Project Secrets analysis failed              | Анализ секретов проекта был завершен с ошибкой             | project_secrets_analysis_failed              | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Secrets ML model user training run started   | Началось обучение ML модели для модуля Секретов            | ml_model_user_secrets_training_run_started   | `  ` Пустой payload ` `                                                                                                                          |
| Secrets ML model user training run finished  | Обучение ML модели для модуля Секретов завершено           | ml_model_user_secrets_training_run_finished  | `  ` Пустой payload ` `                                                                                                                          |
| Secrets ML model user training run cancelled | Обучение ML модели для модуля Секретов отменено            | ml_model_user_secrets_training_run_cancelled | `  ` Пустой payload ` `                                                                                                                          |
| Secrets ML model user training run failed    | Обучение ML модели для модуля Секретов завершено с ошибкой | ml_model_user_secrets_training_run_failed    | `  ` Пустой payload ` `                                                                                                                          |
| Secrets ML model user accepted               | ML модель для модуля Секретов принята                      | ml_model_user_secrets_accepted               | `  ` Пустой payload ` `                                                                                                                          |
| Secrets ML model user purged                 | ML модель для модуля Секретов очищена                      | ml_model_user_secrets_purged                 | `  ` Пустой payload ` `                                                                                                                          |

## Пример простого приложения на Flask

```
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
