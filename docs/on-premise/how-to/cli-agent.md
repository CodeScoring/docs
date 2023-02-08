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

## Возможности агента

Доступные и необходимые опции запуска агента можно посмотреть непосредственно при его вызове.

```
./johnny
Usage:
  johnny [OPTIONS] [path-or-image-name]

johnny - CLI tool for dependency analysis for vulnerabilities and
license compliance issues. Works in connection with CodeScoring SCA.
CodeScoring website: https://codescoring.ru
Documentation: https://docs.codescoring.ru

Exit codes:
- 0: successful run, no issues
- 1: some issues found, action required
- 2: run failure

Version: 2023.5.0

Application Options:
      --api_token=           API token for integration with CodeScoring
                             server
      --api_url=             CodeScoring server url (e.g.
                             https://codescoring.mycompany.com)
      --project=             Project name in CodeScoring
      --ignore=              Ignore paths (--ignore first --ignore
                             "/**/onem?re")
      --debug                Output detailed log
      --with-hashes          Search for direct inclusion of dependencies
                             using file hashes
      --only-hashes          Search only for direct inclusion of
                             dependencies using file hashes
      --no-summary           Do not print summary
      --export-vulns-to-csv= Path to csv file for local summary result
      --stage=               Policy stage (build, dev, source, stage,
                             test, prod, proxy) (default: build)
      --version              Show Version
      --gdt-match=           section in gradle dependency tree for scan
                             (default: compileClasspath)
      --scan-archives        Scan archives. Supported types: '.jar',
                             '.rar', '.tar', '.tar.bz2', '.tbz2',
                             '.tar.gz', '.tgz', '.tar.xz', '.txz',
                             '.war', '.zip', '.aar', '.egg', '.hpi',
                             '.nupkg', '.whl'
      --image                Scan image (use argument
                             [path-or-image-name] as image name or path
                             to tar)

Help Options:
  -h, --help                 Show this help message

Arguments:
  path-or-image-name:        Scan path or image name
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


Пример запуска на директорию:

```bash
./johnny --api_token <api_token> --api_url <api_url> --ignore .tmp --ignore fixtures --ignore .git .
```

### Сканирование образов

Агент поддерживает функциональность сканирования образов в стандартах OCI и Docker и может быть запущен одним из перечисленных способов с указанием:

  - пути до **tar**-архива созданного с использованием **docker save**:
  
    ```bash
    ./johnny --api_url=<api_url> --api_token=<api_token> --image ./my_own.tar
    ```

  - названия образа находящегося в демоне **Docker**, **Podman**:
  
    ```bash
    ./johnny --api_url=<api_url> --api_token=<api_token> --image docker:python:3.9
    ```

  - названия образа из публичного **Docker HUB**:
  
    ```bash
    ./johnny --api_url=<api_url> --api_token=<api_token> --image python:3.9
    ```

  - названия образа из приватного **registry**:

    Перед работой с приватным репозиторием нужно выполнить команду ```docker login```
    ```bash
    ./johnny --api_url=<api_url> --api_token=<api_token> --image pvt_registry/johnny-depp:2023.5.0
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