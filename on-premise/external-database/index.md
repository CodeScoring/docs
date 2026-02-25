- [English](https://docs.codescoring.ru/on-premise/external-database.en/index.md)

# Работа платформы CodeScoring в Docker Compose со внешней СУБД

1. В случае, если необходимо использовать схему, отличную от `public`, необходимо явно задать `search_path` для пользователя, включив в него целевую схему, чтобы обеспечить корректное разрешение объектов:

   ```
   ALTER USER codescoring_user_name SET search_path = non_default_schema_name;
   ```

1. Необходимо сконфигурировать соответствующие параметры в файле `.env`:

   - `POSTGRES_DB`
   - `POSTGRES_USER`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_HOST`
   - `POSTGRES_PORT`

1. Для администрирования платформы необходимо применять файл `external-db.override.yml`, который поставляется вместе с файлом `docker-compose.yml`:

   - Запуск платформы:

     ```
     docker compose -f ./docker-compose.yml -f external-db.override.yml up -d --force-recreate --remove-orphans --renew-anon-volumes
     ```

   - Просмотр логов:

     ```
     docker compose -f ./docker-compose.yml -f external-db.override.yml logs -f
     ```

   - Остановка платформы:

     ```
       docker compose -f ./docker-compose.yml -f external-db.override.yml down --remove-orphans
     ```
