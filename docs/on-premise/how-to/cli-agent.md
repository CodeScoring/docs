---
hide:
  - footer
---
# Работа с консольным агентом

Консольный агент системы CodeScoring называется **johnny** и на данный момент предоставляется для скачивания совместно с on-premise версией системы.

Агент — это исполняемый бинарный файл. Готовые регулярные сборки есть для linux-совместимых систем. По запросу доступны сборки под Windows и MacOS. 

## Принцип работы

При работе в режиме сканирования директорий с исходным кодом, агент рекурсивно `обходит` директорию указанную в параметрах запуска и осуществляет поиск и разбор манифестов [известных пакетных менеджеров](/supported-package-managers).

В режиме [сканирования образов](#_4) агент исследует файловую систему указанного образа, производя инвентаризацию компонентного состава.

По окончанию работы формируется **sbom** файл и в консоль выводится информация о найденных уязвимостях.

## Настройка через конфигурационный файл

Управлять параметрами консольного агента можно через добавление config-файла в директорию с агентом.

Пример конфиг-файла: 

```yaml
# analysis options
analysis:
  # Project name in CodeScoring
  project: ""
  # Save results to CodeScoring. Used only together with project name
  save-results: false
  # Policy stage (build, dev, source, stage, test, prod, proxy)
  stage: build
# scan options
scan:
  # general scan options
  general:
    # Path to csv file for local summary result
    export-vulns-to-csv: ""
    # Ignore paths
    # - first
    # - /**/onem?re
    ignore:
      - .tmp
      - parsers
      - fixtures
      - .git
    # Do not print summary
    no-summary: false
    # Search only for direct inclusion of dependencies using file hashes
    only-hashes: false
    # Search for direct inclusion of dependencies using file hashes
    with-hashes: false
  # image scan options
  image:
    # skip TLS verification when communicating with the registry
    insecure-skip-tls-verify: false
    # use http instead of https when connecting to the registry
    insecure-use-http: false
    # credentials for specific registries
    registries:
      - # the URL to the registry (e.g. "docker.io", "localhost:5000", etc.)
        # same as JOHNNY_REGISTRY_AUTH_AUTHORITY env var
        authority: ""
        # same as JOHNNY_REGISTRY_AUTH_LOGIN env var
        login: ""
        # same as JOHNNY_REGISTRY_AUTH_PASSWORD env var
        password: ""
        # note: token and username/password are mutually exclusive
        # same as JOHNNY_REGISTRY_AUTH_TOKEN env var
        token: ""
  # specific parsers options
  parsers:
    # maven parser options
    maven:
      # gradle dependency tree options
      gdt:
        # section name for parse
        match: compileClasspath
  # scan archives options
  scan-archives:
    # scan archives
    scan: false
```


## Сканирование директории

Сканирование директории производится при помощи субкоманды `scan dir`.

Доступные и необходимые опции запуска агента для сканирования можно посмотреть при помощи флага `help`.

```
$ ./johnny scan --help
johnny - CLI tool for dependency analysis for vulnerabilities and license compliance issues. Works in connection with CodeScoring SCA.
CodeScoring website: https://codescoring.ru
Documentation: https://docs.codescoring.ru

Exit codes:
- 0: successful run, no issues
- 1: some issues found, action required
- 2: run failure

Version: 2023.23.0

Usage:
   scan [command]

Available Commands:
  dir         Scan directory
  file        Scan file
  image       Scan image

Flags:
  -h, --help      help for scan
  -v, --version   version for scan

Global Flags:
      --api_token string             API token for integration with CodeScoring server (required if api_url is set)
      --api_url string               CodeScoring server url (e.g. https://codescoring.mycompany.com) (required if api_token is set)
      --config string                config file
      --create-project               Create project in CodeScoring if not exists
      --debug                        Output detailed log
      --export-vulns-to-csv string   Path to csv file for local summary result
      --gdt-match string             section in gradle dependency tree for scan (default "compileClasspath")
      --ignore stringArray           Ignore paths (--ignore first --ignore "/**/onem?re")
      --no-summary                   Do not print summary
      --only-hashes                  Search only for direct inclusion of dependencies using file hashes
      --project string               Project name in CodeScoring
      --save-results                 Save results to CodeScoring. Used just together with project name
      --scan-archives                Scan archives. Supported types: '.jar', '.rar', '.tar', '.tar.bz2', '.tbz2', '.tar.gz', '.tgz', '.tar.xz', '.txz', '.war', '.zip', '.aar', '.egg', '.hpi', '.nupkg', '.whl'
      --scan-depth int               Archive scanning depth (default 1)
      --stage string                 Policy stage (build, dev, source, stage, test, prod, proxy) (default "build")
      --with-hashes                  Search for direct inclusion of dependencies using file hashes

Use " scan [command] --help" for more information about a command.
```

В параметре `--api_url` должен быть указан полный адрес on-premise инсталляции. Значение для `--api_token` можно взять в профиле пользователя инсталляции.

Указание параметра `--project` позволит при сканировании применить политики относящиеся к выбранному проекту.

При запуске агент:

1. Рекурсивно проходит по всему содержимому указанной директории (если указан конкретный манифест, обрабатывает только его)
	1. Идентифицирует файлы манифестов и разбирает их
	2. Хеширует каждый файл (при запуске с `--with-hashes`)
2. Формирует запрос к инсталляции
3. После получения результата показывает суммарную информацию по найденным манифестам, зависимостям, уязвимостям, сработавшим политикам и более подробную информацию по каждой уязвимости и сработавшей политике
4. Дополнительно в текущей директории формируется файл `bom.json`, содержащий полный Software Bill of Materials в формате **CycloneDX Json**.

В зависимости от результата работы и параметров запуска агент возвращает соответствующий exit code.

Для указания пути к файлу сохранения SBOM необходимо добавить параметр `--bom-path` в запрос или назначить переменную `bom-path` в config-файле. По умолчанию SBOM сохраняется в директории запуска в файл `bom.json`.

Пример запуска на директорию:

```bash
./johnny scan dir --api_token <api_token> --api_url <api_url> --ignore .tmp --ignore fixtures --ignore .git .
```

## Сканирование архивов

Для сканирования архивов используется флаг `--scan-archives`.

По умолчанию сканирование архивов работает только на на один уровень вложенности. Для указания глубины сканирования необходимо добавить в команду параметр `--scan-depth` или указать в config-файле переменную `depth` в секции `scan-archives`.

Поддерживаемые форматы архивов:

- `.jar`
- `.rar`
- `.tar`
- `.tar.bz2`
- `.tbz2`
- `.tar.gz`
- `.tgz`
- `.tar.xz`
- `.txz`
- `.war`
- `.zip`
- `.aar`
- `.egg`
- `.hpi`
- `.nupkg`
- `.whl`

## Сканирование образов

Агент поддерживает функциональность сканирования образов в стандартах OCI и Docker и может быть запущен одним из перечисленных способов с указанием:

  - пути до **tar**-архива созданного с использованием **docker save**:
  
    ```bash
    ./johnny scan image --api_url=<api_url> --api_token=<api_token> ./my_own.tar
    ```

  - названия образа находящегося в демоне **Docker**, **Podman**:
  
    ```bash
    ./johnny scan image --api_url=<api_url> --api_token=<api_token> docker:python:3.9
    ```

  - названия образа из публичного **Docker HUB**:
  
    ```bash
    ./johnny scan image --api_url=<api_url> --api_token=<api_token> python:3.9
    ```

  - названия образа из приватного **registry**:

    Перед работой с приватным репозиторием нужно выполнить команду ```docker login```
    ```bash
    ./johnny scan image --api_url=<api_url> --api_token=<api_token> pvt_registry/johnny-depp:2023.5.0
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

Для выполнения сканирования файлов внутри образа необходимо добавить в команду параметр `--scan-files` или указать в config-файле переменную `scan-files` в секции `image`.

## Запуск с помощью Docker

Для работы запуска через Docker в данный момент нужна активная [авторизация в registry с образами системы](/on-premise/installation).

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

## Добавление в Jenkins pipeline


Пример для добавления в `pipeline`

```groovy
pipeline {
    agent any

  environment {
    CODESCORING_REGISTRY_URL='registry-one.codescoring.ru'
    CODESCORING_AGENT_IMAGE='registry-one.codescoring.ru/johnny-depp:2022.47.0'
    CODESCORING_REGISTRY_CREDENTIALS=credentials('cs-registry-creds')
    CODESCORING_API_URL='https://localhost:8080'
  }

  stages {

    stage("Login to Codescoring docker registry") {
      steps {
        sh """
        docker login -u "$CODESCORING_REGISTRY_CREDENTIALS_USR" "$CODESCORING_REGISTRY_URL" -p "$CODESCORING_REGISTRY_CREDENTIALS_PSW"
          """
      }
    }

    stage('Run CodeScoring Agent') {
      steps {
        sh """
        docker run -v \$(pwd):/code --rm ${CODESCORING_AGENT_IMAGE} --api_token ${CODESCORING_API_TOKEN} --api_url ${CODESCORING_API_URL} --ignore .tmp --ignore fixtures --ignore .git .
        """
      }
    }
  } 
}
```

## Сохранение результатов сканирования

Для сохранения результатов сканирования в on-premise инсталляции необходимо добавить в команду параметры `--save-results` и `--project` или указать в config-файле следующие переменные:

- `project` — имя CLI-проекта в системе, в который будут сохраняться результаты; 
- `save-results` — флаг сохранения результатов, по умолчанию стоит значение **false**.

Если CLI-проект не создан в системе заранее, его можно добавить, добавив в команду вызова johnny или указав в config-файле параметр `--create-project`.
