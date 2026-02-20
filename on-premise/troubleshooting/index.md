- [English](https://docs.codescoring.ru/on-premise/troubleshooting.en/index.md)

# Диагностика неполадок

## Работа с логами

1. Перейти в директорию с файлами запуска:

   ```
   cd /path/to/docker/compose
   ```

1. Выполнить команду копирования файла логов из контейнера в файл `codescoring_onprem.log`

   ```
   docker cp -L PROJECT_NAME_fluentd_1:/fluentd/log/docker.log codescoring_onprem.log
   ```

1. Отправить вендору файл `codescoring_onprem.log`.

## Переустановка системы

При необходимости начать процесс установки с нуля нужно выполнить очистку томов.

Если на сервере с докером нет других контейнеров, кроме проекта CodeScoring, выполнить команду:

```
docker system prune --all --volumes
```

Если на сервере есть ещё другие проекты на docker:

1. остановить docker compose:

   ```
   docker compose down --remove-orphans
   ```

1. выполнить команду:

   ```
   docker volume rm PROJECT_NAME__db-data
   ```

1. Если возникнет ошибка, что данный том используется контейнером, следует выполнить команду и повторить предыдущие шаги (`CT_HASH` будет в сообщении об ошибке):

   ```
   docker rm CT_HASH
   ```

Если проблема не решается, обратиться к контактному лицу вендора, оказывающему сопровождение, для получения дальнейших инструкций.
