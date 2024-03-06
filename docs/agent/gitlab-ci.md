---
hide:
  - footer
---

# Добавление в Gitlab CI

Консольный агент поддерживает добавление в Gitlab CI с помощью файла `.gitlab-ci.yaml`.

Пример содержания файла:

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

Для использования бинарного файла консольного агента:

1. Скачать файл командой
```bash
wget -O /usr/local/bin/johnny https://registry-one.codescoring.ru/repository/files/codescoring/johnny-depp/JOHNNY_VERSION/johnny-linux-amd64-JOHNNY_VERSION
```
2. Разрешить исполнение файла

```bash
chmod +x /usr/local/bin/johnny
```

Пример использования в Gitlab CI:

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
