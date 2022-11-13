---
hide:
  - footer
---
# Работа с логами

1. Перейти в директорию с файлами запуска:

    ```bash linenums="1"
    cd /path/to/docker-compose
    ```

2. Выполнить команду копирования файла логов из контейнера в файл `codescoring_onprem.log`

    ```bash linenums="2"
    docker cp -L on-premise_fluentd_1:/fluentd/log/docker.log codescoring_onprem.log
    ```

3. Отправить вендору файл `codescoring_onprem.log`.
