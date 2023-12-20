---
hide:
  - footer
---

# Настройка через конфигурационный файл

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
    # gradle parser options
    gradle:
      # gradle dependency tree options
      gdt:
        # section name for parse
        match: compileClasspath
    # maven parser options
    maven:
      # path to mvn
      maven-path: mvn
      # enable resolve with mvn
      resolve-enabled: false
  # scan archives options
  scan-archives:
    # scan archives
    scan: false
    # archive scanning depth
    depth: 1
```
