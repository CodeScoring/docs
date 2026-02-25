- [English](https://docs.codescoring.ru/on-premise/scripts.en/index.md)

# Скрипты для управления платформой

## Порядок запуска скриптов

Скрипты запускаются в backend-сервисе платформы:

- для Docker Compose:

```
docker exec -it <backend service> ./manage.py runscript <команда>`
```

- для Helm:

```
kubectl exec -it <backend service> ./manage.py runscript <команда>
```

Переменные, передаваемые в скрипт, являются строго позиционными и обозначаются ключом `--script-arg`, опциональные переменные указаны в квадратных скобках.

## Доступные команды

### `set_new_secret_key`

Данная команда устанавливает новое значение переменной окружения `SECRET_KEY`. Чтобы избежать проблем с кодировкой, алиасами или других неожиданных действий консоли, значение `NEW_SECRET_KEY` рекомендуется скопировать из вывода в терминале после окончания работы скрипта.

**Синтаксис**

```
 set_new_secret_key --script-arg="NEW_SECRET_KEY" [--script-arg="OLD_SECRET_KEY"]
```

**Варианты использования**

1. Изменение с явно указанного `OLD_SECRET_KEY` на явно указанный `NEW_SECRET_KEY`. Данное изменение требуется в ситуации, когда во время запуска платформы значение переменной окружения `SECRET_KEY` отличалось от `OLD_SECRET_KEY`.

   ```
   ./manage.py runscript set_new_secret_key --script-arg="NEW_SECRET_KEY" --script-arg="OLD_SECRET_KEY"
   ```

   Данная команда перешифрует все чувствительные поля с переданного `OLD_SECRET_KEY` на `NEW_SECRET_KEY`.

   **Важно:** Если значение переменной `SECRET_KEY` на момент запуска скрипта не совпадало с `NEW_SECRET_KEY`, после успешного окончания скрипта необходимо изменить значение переменной `SECRET_KEY` на `NEW_SECRET_KEY`, и перезапустить платформу.

1. Изменение на явно указанный `NEW_SECRET_KEY` без указания `OLD_SECRET_KEY`. Требуется в ситуации, когда `OLD_SECRET_KEY` совпадает с указанным в `settings.SECRET_KEY`.

   ```
   ./manage.py runscript set_new_secret_key --script-arg="NEW_SECRET_KEY"
   ```

   Данная команда перешифрует все чувствительные поля с ключа, установленного в `settings.SECRET_KEY` на `NEW_SECRET_KEY`.

   После успешного окончания скрипта необходимо изменить значение переменной `SECRET_KEY` на `NEW_SECRET_KEY` и перезапустить платформу.
