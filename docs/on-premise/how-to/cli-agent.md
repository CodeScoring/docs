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
- 0: successful run, no vulnerabilities found
- 1: vulnerabilities found, action required
- 2: run failure

Application Options:
      --api_token=  API token for integration with CodeScoring server
      --api_url=    CodeScoring server url (e.g. https://codescoring.mycompany.com)
      --ignore=     Ignore paths (--ignore first --ignore "/**/onem?re")
      --debug       Output detailed log
      --no-summary  Do not print summary

Help Options:
  -h, --help        Show this help message

Arguments:
  path:             Scan path
```

В параметре `--api_url` должен быть указан полный адрес on-premise инсталляции. Значение для `--api_token` можно взять в профиле пользователя инсталляции.


При запуске агент:

1. рекурсивно проходит по всему содержимому указанной директории (если указан конкретный манифест, обрабатывает только его)
	1. идентифицирует файлы манифестов и разбирает их
	2. хеширует каждый файл
2. формирует запрос к инсталляции
3. после получения результата показывает суммарную информацию по найденным манифестам, зависимостям и уязвимостям, а также более подробную информацию по каждой уязвимости
4. дополнительно в текущей директории формируется файл `bom.json`, содержащий полный Software Bill of Materials в формате CycloneDX Json.

В зависимости от результата работы агент возвращает соответствующий exit code.


Пример запуска на директорию:

```
./johnny --api_token <api_token> --api_url <api_url> --ignore .tmp --ignore fixtures --ignore .git .
```


## Запуск с помощью Docker

Для работы запуска через Docker в данный момент нужна активная [авторизация в registry с образами нашей системы](/on-premise/installation).


Пример вызова на текущей директории


```
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

```
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
