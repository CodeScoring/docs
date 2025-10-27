- [English](../../agent/scan-docker.en/)

# Сканирование контейнерных образов

Агент поддерживает функциональность сканирования образов в стандартах OCI и Docker и может быть запущен одним из перечисленных способов с указанием:

- пути до **tar**-архива созданного с использованием **docker save**:

```
./johnny scan image ./my_own.tar \
--api_url <api_url> \
--api_token <api_token>
```

- названия образа находящегося в демоне **Docker**, **Podman**:

```
./johnny scan image docker:python:3.9 \
--api_url <api_url> \
--api_token <api_token>
```

- названия образа из публичного **Docker HUB**:

```
./johnny scan image python:3.9 \
--api_url <api_url> \
--api_token <api_token>
```

- названия образа из приватного **registry**:

Перед работой с приватным репозиторием нужно выполнить команду `docker login`

```
./johnny scan image pvt_registry/johnny-depp:<version> \
--api_url <api_url> \
--api_token <api_token>
```

Альтернативно можно авторизоваться в приватном registry с помощью переменных окружения:

- `JOHNNY_REGISTRY_AUTH_AUTHORITY` - URL на registry (к примеру "docker.io", "localhost:5000" и т.д.);
- `JOHNNY_REGISTRY_AUTH_LOGIN` - логин;
- `JOHNNY_REGISTRY_AUTH_PASSWORD` - пароль;
- `JOHNNY_REGISTRY_AUTH_TOKEN` - токен;

или через аналогичные переменные в config-файле:

- `authority`;
- `login`;
- `password`;
- `token`.

**Примечание**: токен и логин с паролем взаимозаменяемы.

## Сканирование файловой системы внутри образа

Для выполнения сканирования файлов внутри образа необходимо добавить в команду параметр `--scan-files` или указать в config-файле переменную `scan-files` в секции `image`.

При сканировании файловой системы можно использовать параметр `--ignore` для исключения определенных файлов из анализа. Например:

`bash ./johnny scan image ./my_own.tar \ --api_url <api_url> \ --api_token <api_token> \ --scan-files \ --ignore "**/node_modules"`

## Параметры команды

Команда **scan image** имеет два уникальных параметра, помимо [общих настроек команды сканирования](/agent/scan/#_2):

- `--hash` – указание хэша образа;
- `--scan-files` – cканирование файлов в образе.

Для сводки доступных параметров команды и инструкции по использованию можно вызвать команду с флагом `-h, --help`.
