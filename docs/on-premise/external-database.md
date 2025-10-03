---
hide:
  - footer
---

# Работа платформы CodeScoring в Docker Compose со внешней СУБД

1. В случае, если необходимо использовать схему, отличную от `public`, необходимо явно задать
`search_path` для пользователя, включив в него целевую схему, чтобы обеспечить корректное разрешение объектов:
  ```sql
  ALTER USER codescoring_user_name SET search_path = non_default_schema_name;
  ```

2. Необходимо сконфигурировать соответствующие параметры в файле `.env`:

    - `POSTGRES_DB`
    - `POSTGRES_USER`
    - `POSTGRES_PASSWORD`
    - `POSTGRES_HOST`
    - `POSTGRES_PORT`

3. Для администрирования платформы необходимо применять файл `external-db.override.yml`, который поставляется вместе с файлом `docker-compose.yml`:

    - Запуск платформы:
        ```bash
        docker compose -f ./docker-compose.yml -f external-db.override.yml up -d --force-recreate --remove-orphans --renew-anon-volumes
        ```
    - Просмотр логов:
        ```bash
        docker compose -f ./docker-compose.yml -f external-db.override.yml logs -f
        ```
    - Остановка платформы:
        ```bash
          docker compose -f ./docker-compose.yml -f external-db.override.yml down --remove-orphans
        ```

