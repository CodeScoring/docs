---
hide:
  - footer
---

# Работа с API

CodeScoring имеет открытый API, который позволяет программно взаимодействовать с системой. Для описания команд API используется инструмент Swagger, доступный по ссылке **[platform-url]/api/swagger**.

## Начало работы

Чтобы начать работу с CodeScoring API, необходим токен для аутентификации запросов. Получить токен можно в разделе `Профиль` по нажатию кнопки **Сгенерировать** в поле `API токен`.

Для аутентификации запросов вне Swagger необходимо прописать токен в header следующим образом:

`Authorization: Token <YOUR_TOKEN>`

## Структура API

Открытый API предоставляет ряд эндпоинтов, которые позволяют выполнять основные операции в системе. Эндпоинты объединены в разделы, соответствующие объектам в системе CodeScoring — зависимостям, лицензиям, уязвимостям, авторам и т.д.

## Пагинация

Для постраничного вывода результатов используется параметр `page` для указания номера страницы и параметр `per_page` для указания количества элементов на странице.

Значение параметра `per_page` регулируется переменной окружения `PLATFORM_API_MAX_PAGE_SIZE`, по умолчанию равно 100.

!!! warning "Рекомендация по значению переменной PLATFORM_API_MAX_PAGE_SIZE"

    Установка значения выше 100 может ухудшить производительность системы.

Некоторые эндпоинты работают **только** в режиме постраничного вывода, подробности можно получить на странице документации API **[platform-url]/api/swagger**.

## Примеры использования

- Запустить анализ всех проектов:

```bash
curl -X 'POST' \
  '[platform_url]/api/analyses/overall_sca/start/' \
  -H 'accept: application/json' \
  -H 'Authorization: token <YOUR_TOKEN>'
```

- Добавить политику:

```bash
curl -X 'POST' \
  '[platform_url]/api/policies/' \
  -H 'accept: application/json' \
  -H 'Authorization: token <YOUR_TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "string",
  "stages": [
    "dev"
  ],
  "level": "info",
  "proprietors": [
    0
  ],
  "projects": [
    0
  ],
  "conditions": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "conditions_connector": "and",
  "is_active": true,
  "is_blocks_build": true,
  "description": "string"
}'
```

- Получить информацию об отдельном проекте:

```bash
curl -X 'GET' \
  '[platform_url]/api/projects/340/' \
  -H 'accept: application/json' \
  -H 'Authorization: token <YOUR_TOKEN>'
```

- Получить список доступных лицензий:

```bash
curl -X 'GET' \
  '[platform_url]/api/licenses/' \
  -H 'accept: application/json' \
  -H 'Authorization: token <YOUR_TOKEN>'
```

**Важно!**: команды создания и изменения основных сущностей в системе, таких как проекты, находятся в разделах с приставкой **settings >**.
