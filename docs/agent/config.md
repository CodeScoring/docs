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
  #	Project name in CodeScoring
  project: ""
  # Save results to CodeScoring. Used only together with project name
  save-results: false
  # Policy stage (build, dev, source, stage, test, prod, proxy)
  stage: build
  # Path for save bom
  bom-path: "bom.json"
  # Timeout of analysis results waiting in seconds
  timeout: 3600
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
  # Prevents from recursively scan directories
  dir:
    no-recursion: false
  # specific parsers options
  parsers:
    # gradle parser options
    gradle:
      # gradle dependency tree options
      gdt:
        # section name for parse
        match: compileClasspath
      # path to gradle
      gradle-path: gradle
      # enable resolve with gradle
      resolve-enabled: false
    # maven parser options
    maven:
      # path to mvn
      maven-path: mvn
      # enable resolve with mvn
      resolve-enabled: false
    # go parser options
    go:
      # path to go
      go-path: go
      # enable resolve with go
      resolve-enabled: false
    # yarn parser options
    yarn:
      # path to yarn
      yarn-path: yarn
      # enable resolve with yarn
      resolve-enabled: false
    # scala parser options
    scala:
      # path to sbt
      sbt-path: sbt
      # enable resolve with sbt
      resolve-enabled: false
  # scan archives options
  scan-archives:
    # scan archives
    scan: false
    # archive scanning depth
    depth: 1
# stats options
stats:
  # Report format
  format: coloredtable
  # Group vulnerabilities by field
  group-vulnerabilities-by: vulnerability
  # Sort vulnerabilities by fields
  sort-vulnerabilities-by: -cvss3,-cvss2,fixedversion,vulnerability,cwes,links,affect
# cli options
cli:
  # CodeScoring server url
  api_url: https://example_url
  # API token for integration with CodeScoring server
  api_token: example_token
```
