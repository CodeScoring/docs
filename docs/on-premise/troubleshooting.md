# В случае проблем

При необходимости начать процесс установки с нуля нужно выполнить очистку томов.

Если на сервере с докером нет других контейнеров, кроме проекта CodeScoring, выполнить команду:

```bash linenums="1"
docker system prune --all --volumes
```

Если на сервере есть ещё другие проекты на docker:

1. остановить docker-compose
2. выполнить команду:

    ```bash linenums="1"
    docker volume rm PROJECT_NAME__db-data
    ```

3. Если возникнет ошибка, что данный том используется контейнером, следует выполнить команду и повторить предыдущие шаги (`CT_HASH` будет в сообщении об ошибке).:

    ```bash linenums="1"
    docker rm CT_HASH 
    ```

Если проблема не решается, обратиться к контактному лицу Вендора, оказывающему сопровождение для получения дальнейших инструкций.
