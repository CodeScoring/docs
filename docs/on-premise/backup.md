# Создание и восстановление резервной копии установки

1. Перейти в директорию с файлами запуска:

    ```bash linenums="1"
    cd /path/to/docker-compose
    ```

2. Для создания резервной копии команду:


    ```bash linenums="1"
    docker-compose -p PROJECT_NAME run backup create
    ```

2. Для восстановления из резервной копии выполнить команду:


    ```bash linenums="1"
    docker-compose -p PROJECT_NAME run restore BACKUP_FILENAME
    ```

    `BACKUP_FILENAME` — имя файла резервной копии. Список доступныех резервных копий можно получить выполнив команду `ls -la ./backup`

4. Перезапустить инсталляцию:

    ```bash linenums="1"
    docker-compose -p PROJECT_NAME up -d --force-recreate
    ```
