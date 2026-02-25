- [English](https://docs.codescoring.ru/on-premise/backup.en/index.md)

# Резервное копирование

## Создание резервной копии установки

1. Перейти в директорию с файлами запуска:

   ```
   cd /path/to/docker/compose
   ```

1. Для создания резервной копии выполнить команду:

   ```
   docker compose run backup create
   ```

   Файл резервной копии сохранится в директорию `backup`.

## Восстановление из резервной копии

1. Для восстановления из резервной копии выполнить команду:

   ```
   docker compose run backup restore BACKUP_FILENAME
   ```

   `BACKUP_FILENAME` — имя файла резервной копии. Список доступных резервных копий можно получить выполнив команду:

   ```
   ls -la ./backup
   ```

1. Перезапустить платформу:

   ```
   docker compose up -d --force-recreate --renew-anon-volumes
   ```
