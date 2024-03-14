---
hide:
  - footer
---

# Добавление в Gitlab CI

Консольный агент поддерживает добавление в Gitlab CI с помощью файла `.gitlab-ci.yaml` и поставляется как в виде docker-образа, так и в виде бинарного файла.

### Docker-образ Johnny

Пример содержания файла `.gitlab-ci.yaml` при использовании docker-образа консольного агента:

`<version>` необходимо заменить на версию агента. Список актуальных версий с описанием доступен [здесь](/changelog/#johnny).

```yaml
stages:
  - test

sca:
  stage: test

  script:
    - docker pull <registry-address>/johnny-depp:<version>
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

`JOHNNY_VERSION` необходимо заменить на версию агента. Список актуальных версий с описанием доступен [здесь](/changelog/#johnny).

1. Скачать файл командой
  ```bash
  wget -O /usr/local/bin/johnny https://registry-one.codescoring.ru/repository/files/codescoring/johnny-depp/JOHNNY_VERSION/johnny-linux-amd64-JOHNNY_VERSION
  ```
2. Разрешить исполнение файла
  ```bash
  chmod +x /usr/local/bin/johnny
  ```

Далее для вызова агента в рамках `.gitlab-ci.yaml`:

```yaml
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
