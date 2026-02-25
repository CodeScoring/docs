- [English](https://docs.codescoring.ru/agent/gitlab-ci.en/index.md)

# Добавление в Gitlab CI

Консольный агент поддерживает добавление в Gitlab CI с помощью файла `.gitlab-ci.yaml` и поставляется как в виде docker-образа, так и в виде бинарного файла.

### Docker-образ Johnny

Пример содержания файла `.gitlab-ci.yaml` при использовании docker-образа консольного агента:

`<version>` необходимо заменить на версию агента. Список актуальных версий с описанием доступен на странице [Changelog](/changelog/johnny-changelog/).

```
stages:
  - test

sca:
  stage: test

  script:
    - docker pull REGISTRY_URL/johnny-depp:<version>
    - >
      docker run -v $(pwd):/code 
      <registry-address>/johnny-depp 
      --api_token $CODESCORING_API_TOKEN
      --api_url $CODESCORING_API_URL 
      --ignore .git 
      --ignore fixtures 
      --ignore parsers
      .

  artifacts:
    paths:
      - bom.json
    when: always
    expire_in: 1 week
```

### Бинарный файл Johnny

Для использования бинарного файла консольного агента, необходимо предварительно выполнить следующие действия на машине gitlab-runner'а:

1. Скачать файл командой

   ```
   wget -O /usr/local/bin/johnny https://REGISTRY_USERNAME:REGISTRY_PASSWORD@REGISTRY_URL/repository/files/codescoring/johnny-depp/JOHNNY_VERSION/johnny-linux-amd64-JOHNNY_VERSION
   ```

   или

   ```
   curl -o /usr/local/bin/johnny https://REGISTRY_USERNAME:REGISTRY_PASSWORD@REGISTRY_URL/repository/files/codescoring/johnny-depp/JOHNNY_VERSION/johnny-linux-amd64-JOHNNY_VERSION
   ```

   `JOHNNY_VERSION` необходимо заменить на версию агента. Список актуальных версий с описанием доступен на странице [Changelog](/changelog/johnny-changelog/). `REGISTRY_URL`, `REGISTRY_USERNAME` и `REGISTRY_PASSWORD` необходимо заменить на адрес, логин и пароль, полученные от вендора.

1. Разрешить исполнение файла

   ```
   chmod +x /usr/local/bin/johnny
   ```

Пример вызова бинарного файла агента в `.gitlab-ci.yaml`:

```
stages:
  - test

sca:
  stage: test

  script:
    - >
      johnny
      scan dir
      --api_token $JOHNNY_API_TOKEN
      --api_url $JOHNNY_API_URL
      --ignore .git
      --ignore fixtures
      --ignore parsers
      .

  artifacts:
    paths:
      - bom.json
    when: always
    expire_in: 1 week
```
