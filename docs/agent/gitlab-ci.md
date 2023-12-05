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