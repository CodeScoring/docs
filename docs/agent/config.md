---
hide:
  - footer
---

# Настройка через конфигурационный файл

Управлять параметрами консольного агента можно через добавление config-файла в директорию с агентом.

Параметры композиционного анализа:

- **project** – название проекта в инсталляции CodeScoring;
- **save-results** – сохранение результатов в инсталляции CodeScoring. Используется в паре с названием проекта. Значение по умолчанию – `false`;
- **stage** – этап разработки, для которого действует политика безопасности. Возможные значения: `build`, `dev`, `source`, `stage`, `test`, `prod`, `proxy`;
- **bom-path** - директория, в которую будет сохраняться сформированный файл `bom.json`;

Общие параметры сканирования:

- **export-vulns-to-csv** – путь к CSV-файлу для сохранения локальных результатов сканирования;
- **ignore** – файлы, которые будут игнорироваться при сканировании;
- **no-summary** – отсутствие вывода сводной информацию по проведенному сканированию. По умолчанию значение `false`;
- **only-hashes** – поиск **только** прямых включений Open Source библиотек по хэшам. По умолчанию значение `false`;
- **with-hashes** – поиск прямых включений Open Source библиотек по хэшам. По умолчанию значение `false`;

Параметры сканирования Docker-образов:

- **scan-files** – сканирование файловой систему внутри образа. По умолчанию значение `false`;
- **insecure-skip-tls-verify** –  пропуск TLS верификацию при подключении к реестру образов; По умолчанию значение `false`;
- **insecure-use-http** – использование протокола http при подключении к реестру образов. По умолчанию значение `false`;
- **authority** – URL для подключения к реестру образов;
- **login** – логин учетной записи для подключения к реестру образов;
- **password** – пароль учетной записи для подключения к реестру образов;
- **token** – токен для подключения к реестру образов. 

Параметры парсинга:

- **match** – название секции для парсинга `gradle dependency tree`.

Параметры сканирования архивов:

- **scan** – сканирование архивов. По умолчанию значение `false`;
- **depth** – глубина сканирования архивов. По умолчанию значение `1`.

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
  # Path for save bom
  bom-path: "bom.json"
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
    # scan files in image
    scan-files: false
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
    # archive scanning depth
    depth: 1
```
