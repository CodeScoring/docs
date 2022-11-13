---
hide:
  - footer
---
# Работа с консольным агентом

Консольный агент системы CodeScoring называется **johnny** и на данный момент предоставляется для скачивания совместно с on-premise версией системы.

Агент — это исполняемый бинарный файл. Готовые регулярные сборки есть для linux-совместимых систем. По запросу доступны сборки под Windows и MacOS. 


## Возможности агента

Доступные и необходимые опции запуска агента можно посмотреть непосредственно при его вызове.

```
./johnny
Usage:
  johnny [OPTIONS] [path]

johnny - CLI tool for dependency analysis for vulnerabilities and license compliance issues. Works in connection with CodeScoring SCA.
CodeScoring website: https://codescoring.ru
Documentation: https://docs.codescoring.ru

Exit codes:
- 0: successful run, no issues
- 1: some issues found, action required
- 2: run failure

Application Options:
      --api_token=   API token for integration with CodeScoring server
      --api_url=     CodeScoring server url (e.g. https://codescoring.mycompany.com)
      --project=     Project name in CodeScoring
      --ignore=      Ignore paths (--ignore first --ignore "/**/onem?re")
      --debug        Output detailed log
      --with-hashes  Search for direct inclusion of dependencies using file hashes
      --no-summary   Do not print summary
      --version

Help Options:
  -h, --help         Show this help message

Arguments:
  path:              Scan path
```

В параметре `--api_url` должен быть указан полный адрес on-premise инсталляции. Значение для `--api_token` можно взять в профиле пользователя инсталляции.

Указание параметра `--project` позволит при сканировании применить политики относящиеся к выбранному проекту.


При запуске агент:

1. Рекурсивно проходит по всему содержимому указанной директории (если указан конкретный манифест, обрабатывает только его)
	1. Идентифицирует файлы манифестов и разбирает их
	2. Хеширует каждый файл (при запуске с `--with-hashes`)
2. Формирует запрос к инсталляции
3. После получения результата показывает суммарную информацию по найденным манифестам, зависимостям, уязвимостям, сработавшим политикам и более подробную информацию по каждой уязвимости и сработавшей политике
4. Дополнительно в текущей директории формируется файл `bom.json`, содержащий полный Software Bill of Materials в формате CycloneDX Json.

В зависимости от результата работы и параметров запуска агент возвращает соответствующий exit code.


Пример запуска на директорию:

```bash
./johnny --api_token <api_token> --api_url <api_url> --ignore .tmp --ignore fixtures --ignore .git .
```


## Запуск с помощью Docker

Для работы запуска через Docker в данный момент нужна активная [авторизация в registry с образами нашей системы](/on-premise/installation).


Пример вызова на текущей директории


```bash
docker run -v \
    $(pwd):/code \
    <registry-address>/johnny-depp \
    --api_token <api_token> \
    --api_url <api_url> \
    --ignore .tmp --ignore fixtures --ignore .git \
     . 
```


## Добавление в Gitlab CI


Пример для добавления в `.gitlab-ci.yaml`

```yaml
stages:
  - test

sca:
  stage: test

  script:
    - docker pull <registry-address>/johnny-depp:latest
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
