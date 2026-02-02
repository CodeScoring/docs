---
hide:
  - footer
---

# Обновление PostgreSQL в Docker

Обновление мажорной версии PostgreSQL требует инициализации БД с использованием новой версии PostgreSQL, создания дампа и его восстановления. Ниже описана процедура для инсталляций CodeScoring, развёрнутых с помощью Docker Compose.

## Необходимые условия

### Дисковое пространство

Требуется свободное дисковое пространство в объёме не менее **размера тома `db-data`**.

Пример утилизации дискового пространства при обновлении:

- версии PostgreSQL:
    - исходная: 13.21
    - новая: 15.15
- данные инсталляции CodeScoring:
    - ~500 000 пакетов
    - ~1 200 проектов
    - ~22 000 образов
- размер тома `db-data`: ~50 GiB
- потребление дискового пространства в процессе обновления:
    - сжатая резервная копия: ~9 GiB
    - сжатый дамп: ~3 GiB
    - размер `db-data` после восстановления: ~32 GiB

### Окно планового технического обслуживания

Процедура требует полной остановки CodeScoring. Фактическое время выполнения зависит от объёма данных.

Для примера выше:

- создание сжатой резервной копии: ~11 минут 45 секунд
- восстановление резервной копии: ~2 минуты 30 секунд
- `pg_dump` + `pg_restore`: ~3 минуты 30 секунд
- перенос данных между томами: ~1 минута
- сбор статистики планировщика: ~1 секунда

## Переопределение конфигурации Docker Compose

Для обновления требуется файл переопределения конфигурации Docker Compose. Файл `postgres-upgrade.override.yml` поставляется, начиная с версии CodeScoring 2026.3.1, и располагается в той же директории, что и файл `docker-compose.yml`.

### Описание компонентов файла переопределения конфигурации

#### Тома

- `upgrade-new-db-data` - временный `pgdata` PostgreSQL новой версии
- `upgrade-dump` - сжатый дамп
- `upgrade-backup` - сжатый бэкап

#### Сервисы

- `psql-new` - PostgreSQL новой версии с конфигурацией, идентичной сервису `psql`
- `upgrade-dump` - создание сжатого дампа
- `upgrade-dump-restore` - восстановление дампа в PostgreSQL новой версии
- `upgrade-cleanup-transfer` - очистка и перенос данных в основной том `db-data`
- `upgrade-analyze-in-stages` - итеративный сбор статистики планировщика
- `upgrade-backup` - создание резервной копии
- `upgrade-backup-restore` - восстановление резервной копии


## Резервное копирование

### Создание резервной копии

Остановите CodeScoring:

```bash
docker compose \
  -f docker-compose.yml \
  -f postgres-upgrade.override.yml \
  down
```

Создайте резервную копию:

```bash
docker compose \
    -f docker-compose.yml \
    -f postgres-upgrade.override.yml \
    run --rm upgrade-backup
```

### Восстановление резервной копии

Остановите CodeScoring:

```bash
docker compose \
  -f docker-compose.yml \
  -f postgres-upgrade.override.yml \
  down
```

Восстановите резервную копию:

```bash
docker compose \
    -f docker-compose.yml \
    -f postgres-upgrade.override.yml \
    run --rm upgrade-backup-restore
```

Убедитесь, что значение `POSTGRES_IMAGE` в файле `.env` соответствует версии PostgreSQL **до** обновления:

```dotenv
POSTGRES_IMAGE=postgres:13.23-rev1 # версия, с которой обновляемся
```

## Процедура обновления

Установите в .env:

```dotenv
POSTGRES_IMAGE=postgres:13.23-rev1 # версия, с которой обновляемся
POSTGRES_UPGRADE_IMAGE=postgres:15.15-rev1 # версия, на которую обновляемся
```

Загрузите образы, необходимые для обновления:

```bash
docker compose \
  -f docker-compose.yml \
  -f postgres-upgrade.override.yml \
  pull
```

Остановите все сервисы:

```bash
docker compose \
  -f docker-compose.yml \
  -f postgres-upgrade.override.yml \
  down
```

Инициализируйте PostgreSQL новой версии, выполните дамп и восстановление:

```bash
docker compose \
  -f docker-compose.yml \
  -f postgres-upgrade.override.yml \
  run --rm upgrade-dump-restore
```

Снова остановите сервисы:

```bash
docker compose \
  -f docker-compose.yml \
  -f postgres-upgrade.override.yml \
  down
```

Перенесите данные в основной том `db-data`:

```bash
docker compose \
  -f docker-compose.yml \
  -f postgres-upgrade.override.yml \
  run --rm upgrade-cleanup-transfer
```

Установите версию PostgreSQL для образа, используемого сервисом `psql`, в файле `.env`:

```dotenv
POSTGRES_IMAGE=postgres:15.15-rev1 # версия, на которую обновились
```

Запустите сбор статистики (можно не дожидаться завершения):

```bash
docker compose \
  -f docker-compose.yml \
  -f postgres-upgrade.override.yml \
  run --rm upgrade-analyze-in-stages
```

Запустите CodeScoring:

```bash
docker compose -f docker-compose.yml up \
  --detach \
  --force-recreate \
  --remove-orphans \
  --renew-anon-volumes
```

Проверьте логи и убедитесь в работоспособности инсталляции CodeScoring:

```bash
docker compose logs -f
```

Удалите следующие тома:

- `${COMPOSE_PROJECT_NAME}_upgrade-new-db-data`
- `${COMPOSE_PROJECT_NAME}_upgrade-dump`
- `${COMPOSE_PROJECT_NAME}_upgrade-backup`
