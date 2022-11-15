---
hide:
  - footer
---
# Обновление установки

1. Перейти в директорию с файлами запуска:

    ```bash linenums="1"
    cd /path/to/docker-compose
    ```

2. Выполнить команду обновления образов:


    ```bash linenums="2"
    docker-compose -p PROJECT_NAME pull
    ```

3. Перезапустить инсталляцию:

    ```bash linenums="3"
    docker-compose -p PROJECT_NAME up -d --force-recreate
    ```