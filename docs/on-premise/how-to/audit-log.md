---
hide:
  - footer
---
# Работа с аудит-логом

Аудит-лог – это журнал событий в системе **CodeScoring**. Он находится в разделе `Settings -> Audit log`.

В аудит-логе регистрируются события, которые полезны для просмотра истории действий пользователей, а также отслеживания ошибок в системе. Каждое событие содержит следующие данные:

- **Event time** – дата и время события;
- **Actor** – исполнитель;
- **Message** – сообщение с деталями;
- **Duration** – продолжительность события;

Журнал можно отфильтровать по периоду или исполнителю, а также найти в нем конкретное событие, используя поле `Search`. Также доступен экспорт журнала в формате CSV.

События в аудит-логе разделяются на несколько категорий. Ниже приведен полный список возможных событий по каждой из категорий с расшифровками.

## Активация лицензии

| Текст события  |  Расшифровка |
|----------------|--------------|
|*Object <ActivationKey: Owner: {owner.name}. Expired: YYYY-ММ-DD HH:MM:SS+HH:MM (timezone). Authors limit: {limit.number}> created* | Активация лицензии на ПО|

## Аутентификация пользователя

| Текст события  |  Расшифровка |
|----------------|--------------|
|*User logged in*|Пользователь успешно аутентифицировался в системе|
|*User logged out*|Пользователь вышел из системы|
|*Failed login attempt {username}*|Введен неверный пароль при попытке аутентификации|

## Управление объектами

| Текст события  |  Расшифровка |
|----------------|--------------|
|*Object {instance!r} created*|Создание любого объекта в системе пользователем через интерфейс|
|*Object {instance!r} updated*|Обновление любого объекта в системе пользователем через интерфейс|
|*Object {instance!r} deleted*|Удаление любого объекта в системе пользователем через интерфейс|

## Запуск SCA анализа

| Текст события  |  Расшифровка |
|----------------|--------------|
|*[SCA][{analysis_run.project.name}][{analysis_run.sequence}/{analysis_run.pk}] Analysis started*|SCA анализ проекта,c последовательным номером анализа в проекте/uuid запуска запущен|
|*[SCA][{analysis_run.project.name}][{analysis_run.sequence}/{analysis_run.pk}] Analysis finished*|SCA анализ проекта, c последовательным номером анализа в проекте/uuid запуска окончен|
|*[SCA][{analysis_run.project.name}][{analysis_run.sequence}/{analysis_run.pk}] Analysis failed. Check server logs.*|SCA анализ проекта, c последовательным номером анализа в проекте/uuid запуска завершился с ошибкой. Необходимо проверить логи сервера.|
|[SCA][{analysis_run.project.name}][{analysis_run.sequence}/{analysis_run.pk}] Analysis failed. Check server logs.|SCA анализ проекта, c последовательным номером анализа в проекте/uuid запуска завершился с ошибкой. Необходимо проверить логи сервера.|
|*Failed to clone for repository {repository.name}.*|Клонирование репозитория не удалось|
|*Failed to detect branch for repository "{repository.name}*|Не удалось обнаружить ветку для репозитория|
|*[{analysis_run.pk}][{project.name}][{analysis_run.sequence}] Clone source code*|Клонирование исходного кода проекта, c последовательным номером анализа в проекте и uuid запуска запущено|
|*[SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}*] *Clone source code*|Клонирование исходного кода проекта, c последовательным номером анализа в проекте и uuid запуска для проведения SCA анализа запущено|
|*SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}*] Collect files data*|Сбор данных о файлах проекта, c последовательным номером анализа в проекте и uuid запуска для проведения SCA анализа запущено|
|*[SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}] Collect manifests*|Сбор манифестов проекта, с последовательностью и uuid запуска для проведения SCA анализа запущено|
|*[SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}] Create pipeline*|Создание pipeline для SCA анализа проекта, c последовательным номером анализа в проекте и uuid запуска запущена|
|*[SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}] Check policies*|Проверка политик SCA анализа проекта, c последовательным номером анализа в проекте и uuid запуска запущена|
|*[SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}] Update project metrics*|Обновление метрик проекта для SCA анализа проекта, c последовательным номером анализа в проекте и uuid запуска запущено|
|*[SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}] Analyze dependencies*|Анализ зависимостей проекта для SCA анализа проекта, c последовательным номером анализа в проекте и uuid запуска запущен|
|*(Run #{task.id}) Analysis started via API*|Анализ запущен через консольный агент по API с uuid запуска|
|*Some tasks in analysis failed*|Некоторые задачи при анализе не выполнены|
|*Could not connect to OSS Index, reason: {err}*|Не удалось подключиться к индексу OSS с указанием ошибки|
|*[[SCA][{project.name}] Analysis didn't start (Reason: {err.message})]*|SCA анализ проекта не запустился с указанием ошибки|
|*Overall SCA run started for {len(projects)} project(s)*|Запущен SCA анализ для проектов|

## Запуск TQI анализа

| Текст события  |  Расшифровка |
|----------------|--------------|
|*Rebuild author {primary_email}*|Обновление информации по автору на основании правил объединения по основному email|
|*Generate authors merge rules*|Создание правил слияния авторов|
|*(Run #{run_id}) Collect commits data for project {project.name}*|Сбор данных коммитов для проекта с ID запуска запущен|
|*(Run #{run_id}) Create authors*|Создание авторов с ID запуска|
|*(Run #{run_id}) Load authors OSS contributions*|Загрузка вклада авторов в OSS|
|*(Run #{run_id}) Authors analysis started*|Начался анализ авторов с ID запуска|
|*(Run #{run_id}) Authors analysis completed*|Анализ авторов успешно завершен с ID запуска|
|*(Run #{run_id}) Authors analysis failed. Check server logs.*|Анализ авторов завершен с ошибкой с ID запуска. Необходимо проверить логи сервера|
|*(Run #{run_id}) Authors analysis cancelled*|Анализ авторов отменен с ID запуска|
|*(Run #{run_id}) Update project {project.name}*|Обновление проекта с ID запуска|
|*(Run #{run_id}) Clones analysis started*|Запущен анализ клонированного кода запущен  с ID запуска|
|*(Run #{run_id}) Clones analysis completed*|Завершен анализ клонированного кода  с ID запуска|
|*(Run #{run_id}) Clones analysis failed. Check server logs.*|Анализ клонированного кода  с ID запуска завершен с ошибкой. Необходимо проверить логи сервера|
|*(Run #{run_id}) Clones analysis cancelled*|Анализ клонированного кода  с ID запуска отменен|
|*(Run #{run_id}) Clone source code for project {project.name}*|Клонирование репозитория исходного кода проекта запущено с ID запуска|

## Управление политиками

| Текст события  |  Расшифровка |
|----------------|--------------|
|*Policy ignore {policy_ignore} created*|Создание политики игнорирования из алертов|
|*Policy ignore {policy_ignore} activated*|Активация политики игнорирования из алертов|
|*To Policy ignore {policy_ignore} added Policy {policy_alert.policy}*|Добавлена политика в существующее правило игнорирования|


