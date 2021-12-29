# Работа с логами

1. Перейти в директорию с файлами запуска:

    ```bash linenums="1"
    cd /path/to/docker-compose
    ```

2. Выполнить команду копирования файла логов из контейнера в файл docker.log

    ```bash linenums="1"
    docker cp -L on-premise_fluentd_1:/fluentd/log/docker.log .
    ```

3. Отправить вендору файл `docker.log`.
