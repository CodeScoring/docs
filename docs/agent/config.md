---
hide:
  - footer
---

# Настройка через файл конфигурации

Управлять параметрами консольного агента можно через добавление файла конфигурации `codescoring-johnny-config.yaml` в директорию с агентом. Ниже представлен список доступных параметров и пример конфиг-файла.

### Параметры композиционного анализа

- **project** – название проекта в инсталляции CodeScoring;
- **save-results** – сохранение результатов в инсталляции CodeScoring. Используется в паре с названием проекта. Значение по умолчанию – `false`;
- **license** – лицензия анализируемого проекта, например `mit`;
- **stage** – этап разработки. Возможные значения: `build`, `dev`, `source`, `stage`, `test`, `prod`, `proxy`;
- **bom-path** – путь (с названием файла), по которому будет сохраняться сформированный файл `bom.json`;
- **bom-format** – формат формируемого SBoM. Возможные значения: `cyclonedx_v1_6_json`, `cyclonedx_v1_5_json`, `cyclonedx_v1_4_json`,`cyclonedx_v1_6_ext_json`. Значение по умолчанию: `cyclonedx_v1_6_json`;
- **timeout** – ограничение по времени ожидания анализа (в секундах).

### Общие параметры сканирования

- **ignore** – директории, которые будут игнорироваться при сканировании;
- **no-summary** – скрытие сводной информацию по проведенному сканированию в консоли. По умолчанию значение `false`;
- **only-hashes** – поиск **только** прямых включений Open Source библиотек по хэшам. По умолчанию значение `false`;
- **with-hashes** – поиск прямых включений Open Source библиотек по хэшам. По умолчанию значение `false`;
- **no-recursion** – выключение рекурсивного скана для команды `scan dir`. По умолчанию значение `false`;
- **block-on-empty-result** – блокирование сборки при получении пустого результата. При активации агент возвращает exit code **3** в случае отсутствия артефактов для анализа.

### Параметры сканирования Docker-образов

- **scan-files** – сканирование файловой системы внутри образа. По умолчанию значение `false`;
- **insecure-skip-tls-verify** –  пропуск TLS верификации при подключении к реестру образов. По умолчанию значение `false`;
- **insecure-use-http** – использование протокола http при подключении к реестру образов. По умолчанию значение `false`;
- **authority** – URL для подключения к реестру образов;
- **login** – логин учетной записи для подключения к реестру образов;
- **password** – пароль учетной записи для подключения к реестру образов;
- **token** – токен для подключения к реестру образов. 

### Параметры парсинга для разных технологий

#### Общие параметры

- **enabled** – включение парсеров для данной технологии;
- **parsers** – набор парсеров для манифестов.

#### Параметры парсеров

- **enabled** – включение данного парсера;
- **match** – условие для определения подходящих манифестов, может быть по названию (`equal`) или расширению (`extension`);
- **properties** – дополнительные свойства для парсеров окружения, такие как путь к исполняемым файлам;
- **dotnet-path**, **maven-path**, **gradle-path**, **yarn-path**, **go-path**, **sbt-path**,**npm-path**, **pnpm-path**, **composer-path**, **pip-path**, **poetry-path**, **conda-lock-path**  – пути к пакетным менеджерам для разрешения зависимостей в окружении;
- **resolve-enabled** – разрешение зависимостей в окружении. По умолчанию значение `false`.

### Параметры сканирования архивов

- **scan** – сканирование архивов. По умолчанию значение `false`;
- **depth** – глубина сканирования архивов. По умолчанию значение `1`.

### Параметры вывода результатов

- **format** – формат вывода. По умолчанию `coloredtable`. Возможна выгрузка в форматы `table`, `text`, `junit`, `sarif`, `csv`, `gl-dependency-scanning-report`, `gl-code-quality-report`;
- **group-vulnerabilities-by** – переменная для группировки уязвимостей в таблице;
- **sort-vulnerabilities-by** – порядок переменных для сортировки уязвимостей в таблице.

### Параметры инсталляции

- **api_url** – адрес инсталляции;
- **api_token** – токен для доступа к инсталляции.

### Пример файла

```yaml
# analysis options
analysis:
  # Project name in CodeScoring
  project: ""
  # Save results to CodeScoring. Used only together with project name
  save-results: false
  # Policy stage (build, dev, source, stage, test, prod, proxy)
  stage: build
  # License code
  license: mit
  # Path for save bom
  bom-path: "bom.json"
  # Format for bom
  bom-format: cyclonedx_v1_6_json
  # Timeout of analysis results waiting in seconds
  timeout: 3600
# scan options
scan:
  # general scan options
  general:
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
    # Block on empty result
    block-on-empty-result: true
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
  # Supported technologies
  technologies:
    # C
    clang:
      # Use C parsers
      enabled: true
      # C parsers
      parsers:
        # conan.lock parser
        conan_lock:
          # use parser
          enabled: true
          # matching criteria
          match: equal("conan.lock")
        # conanfile.py parser  
        conanfile_py:
          # use parser
          enabled: true
          # matching criteria
          match: equal("conanfile.py")
        conanfile_txt:
          # use parser
          enabled: true
          # matching criteria
          match: equal("conanfile.txt")
    # C#
    csharp:
      # Use C# parsers
      enabled: true
      # C# parsers
      parsers:
        # .csporj parser
        csproj:
          # use parser
          enabled: true
          # matching criteria
          match: extension(".csproj")
        # dependencyReport.json parser
        dependencyreport_json:
          # use parser
          enabled: true
          # matching criteria
          match: equal("dependencyReport.json")
        # .csproj dotnet environment parser
        dotnet_csproj_env:
          # use parser
          enabled: false
          # matching criteria
          match: extension(".csproj")
          # parser properties
          properties:
            # path to dotnet for resolve
            dotnet-path: dotnet
        # .nuspec parser
        nuspec:
          # use parser
          enabled: true
          # matching criteria
          match: extension(".nuspec")
        # packages.config parser
        packages_config:
          # use parser
          enabled: true
          # matching criteria
          match: equal("packages.config")
        # packages.lock.json parser
        packages_lock_json:
          # use parser
          enabled: true
          # matching criteria
          match: equal("packages.lock.json")
        # paket.dependencies parser
        paket_dependencies:
          # use parser
          enabled: true
          # matching criteria
          match: equal("paket.dependencies")
        # paket.lock parser
        paket_lock:
          # use parser
          enabled: true
          # matching criteria
          match: equal("paket.lock")
        # project.assets.json parser
        project_assets_json:
          # use parser
          enabled: true
          # matching criteria
          match: equal("project.assets.json")
        # Project.json parser
        project_json:
          # use parser
          enabled: true
          # matching criteria
          match: equal("Project.json")
        # Project.lock.json parser
        project_lock_json:
          # use parser
          enabled: true
          # matching criteria
          match: equal("Project.lock.json")
    # Golang
    go:
      # Use Golang parsers
      enabled: true
      # Golang parsers
      parsers:
        # go.mod parser
        go_mod:
          # use parser
          enabled: true
          # matching criteria
          match: equal("go.mod")
        # go.mod environment parser
        go_mod_env:
          # use parser
          enabled: false
          # matching criteria
          match: equal("go.mod")
          # parser properties
          properties:
            # path to go for resolve
            go-path: go
        # go.sum parser
        go_sum:
          # use parser
          enabled: true
          # matching criteria
          match: equal("go.sum")
    # Java
    java:
      # Use Java parsers
      enabled: true
      # Java parsers
      parsers:
        # build.gradle, build.gradle.kts environment parser
        build_gradle_env:
          # use parser
          enabled: false
          # matching criteria
          match: extension("build.gradle") || extension("build.gradle.kts")
          # parser properties
          properties:
            # path to gradle for resolve
            gradle-path: ./gradlew
        # .gradle parser
        gradle:
          # use parser
          enabled: true
          # matching criteria
          match: extension(".gradle")
        # gradle dependency tree parser
        gradle-dependency-tree_txt:
          # use parser
          enabled: true
          # matching criteria
          match: equal("gradle-dependency-tree.txt") || equal("gradle-dependencies.txt")
          # parser properties
          properties:
            # configuration for parse
            configuration: ""
        # .gradle.kts parser
        gradle_kts:
          # use parser
          enabled: true
          # matching criteria
          match: extension(".gradle.kts")
        # gradle.lockfile parser
        gradle_lockfile:
          # use parser
          enabled: true
          # matching criteria
          match: extension("gradle.lockfile")
        # ivy.xml parser
        ivy_xml:
          # use parser
          enabled: true
          # matching criteria
          match: equal("ivy.xml")
        # jar parser
        jar:
          # use parser
          enabled: true
          # matching criteria
          match: extension(".jar") || extension(".war") || extension(".ear")
          # parser properties
          properties:
            # parse depth
            depth: 1
        # maven dependency tree parser
        maven-dependency-tree_txt:
          # use parser
          enabled: true
          # matching criteria
          match: equal("maven-dependency-tree.txt") || equal("mvn-dependency-tree.txt")
        # pom.xml maven environment parser
        maven_pom_xml_env:
          # use parser
          enabled: false
          # matching criteria
          match: equal("pom.xml")
          # parser properties
          properties:
            # path to maven for resolve
            maven-path: mvn
        # pom.xml parser
        pom_xml:
          # use parser
          enabled: true
          # matching criteria
          match: equal("pom.xml")
        # scala dependency tree parser
        scala-dependency-tree_txt:
          # use parser
          enabled: true
          # matching criteria
          match: equal("scala-dependency-tree.txt") || equal("sbt-dependency-tree.txt")
        # build.sbt environment parser
        scala_build_sbt_env:
          # use parser
          enabled: false
          # matching criteria
          match: equal("build.sbt")
          # parser properties
          properties:
            # path to sbt for resolve
            sbt-path: sbt
    # JavaScript
    js:
      # Use JavaScript parsers
      enabled: true
      # JavsScript parsers
      parsers:
        # npm-shrinkwrap.json parser
        npm-shrinkwrap_json:
          # use parser
          enabled: true
          # matching criteria
          match: equal("npm-shrinkwrap.json")
        # package.json npm environment parser
        npm_package_json_env:
          # use parser
          enabled: false
          # matching criteria
          match: equal("package.json")
          # parser properties
          properties:
            # path to npm for resolve
            npm-path: npm
        # package-lock.json parser
        package-lock_json:
          # use parser
          enabled: true
          # matching criteria
          match: equal("package-lock.json")
        # package.json parser
        package_json:
          # use parser
          enabled: true
          # matching criteria
          match: equal("package.json")
        # yarn.lock parser
        yarn_lock:
          # use parser
          enabled: true
          # matching criteria
          match: equal("yarn.lock")
        # package.json yarn environment parser
        yarn_package_json_env:
          # use parser
          enabled: false
          # matching criteria
          match: equal("package.json")
          # parser properties
          properties:
            # path to yarn for resolve
            yarn-path: yarn
        # pnpm-lock.yaml parser
        pnpm_lock_yaml:
          # use parser
          enabled: true
          # matching criteria
          match: equal("pnpm-lock.yaml")
        # package.json pnpm environment parser
        pnpm_package_json_env:
          # use parser
          enabled: false
          # matching criteria
          match: equal("package.json")
          # parser properties
          properties:
            # path to npm for resolve
            pnpm-path: pnpm
    # Objective-C
    objective_c:
      # Use Objective-C parsers
      enabled: true
      # Objective-C parsers
      parsers:
        # Podfile parser
        podfile:
          # use parser
          enabled: true
          # matching criteria
          match: equal("Podfile")
        # Podfile.lock parser
        podfile_lock:
          # use parser
          enabled: true
          # matching criteria
          match: equal("Podfile.lock")
        # .podspec parser
        podspec:
          # use parser
          enabled: true
          # matching criteria
          match: extension(".podspec")
    # PHP
    php:
      # Use PHP parsers
      enabled: true
      # PHP parsers
      parsers:
        # composer.json parser
        composer_json:
          # use parser
          enabled: true
          # matching criteria
          match: equal("composer.json")
        # composer.lock parser
        composer_lock:
          # use parser
          enabled: true
          # matching criteria
          match: equal("composer.lock")
        # composer environment parser
        composer_env:
          # use parser
          enabled: false
          # matching criteria
          match: equal("composer.json")
          # parser properties
          properties:
            # path to composer for resolve
            composer-path: composer
    # Python
    python:
      # Use Python parsers
      enabled: true
      # Python parsers
      parsers:
        # pip-resolved-dependencies.txt parser
        pip-resolved-dependencies_txt:
          # use parser
          enabled: true
          # matching criteria
          match: equal("pip-resolved-dependencies.txt")
        # pip environment parser
        pip_env:
          # use parser
          enabled: false
          # matching criteria
          match: equal("codescoring_pip_for_freeze")
          # parser properties
          properties:
            # path to pip for resolve
            pip-path: pip
        # Pipfile parser
        pipfile:
          # use parser
          enabled: true
          # matching criteria
          match: equal("Pipfile")
        # Pipfile.lock parser
        pipfile_lock:
          # use parser
          enabled: true
          # matching criteria
          match: equal("Pipfile.lock")
        # poetry.lock parser
        poetry_lock:
          # use parser
          enabled: true
          # matching criteria
          match: equal("poetry.lock")
        # pyproject.toml poetry environment parser
        poetry_pyproject_toml_env:
          # use parser
          enabled: false
          # matching criteria
          match: equal("pyproject.toml")
          # parser properties
          properties:
            # path to poetry for resolve
            poetry-path: poetry
        # pyproject.toml parser
        pyproject_toml:
          # use parser
          enabled: true
          # matching criteria
          match: equal("pyproject.toml")
        # requirements.txt parser
        requirements_txt:
          # use parser
          enabled: true
          # matching criteria
          match: match(".*require[^/]*(/)?[^/]*.(txt|pip)$")
        # setup.py parser
        setup_py:
          # use parser
          enabled: true
          # matching criteria
          match: equal("setup.py")
      # technology properties
      properties:
        # python version
        python-version: ""
    # Ruby
    ruby:
      # Use Ruby parsers
      enabled: true
      # Ruby parsers
      parsers:
        # Gemfile parser
        gemfile:
          # use parser
          enabled: true
          # matching criteria
          match: equal("Gemfile") || equal("gems.rb")
        # Gemfile.lock parser
        gemfile_lock:
          # use parser
          enabled: true
          # matching criteria
          match: equal("Gemfile.lock") || equal("gems.locked")
        # .gemspec parser
        gemspec:
          # use parser
          enabled: true
          # matching criteria
          match: extension(".gemspec")
    # Rust
    rust:
      # Use Rust parsers
      enabled: true
      # Rust parsers
      parsers:
        # cargo.lock parser
        cargo_lock:
          # use parser
          enabled: true
          # matching criteria
          match: equal("cargo.lock")
        # cargo.toml parser
        cargo_toml:
          # use parser
          enabled: true
          # matching criteria
          match: equal("cargo.toml")
    # Conda
    conda:
      # Use Conda parsers
      enabled: true
      # Conda parsers
      parsers:
        # Conda-lock parser
        conda-lock_yml:
          # use parser
          enabled: true
          # matching criteria
          match: equal("conda-lock.yml")
        # Conda env parser
        conda_yml_env:
          # use parser
          enabled: false
          # matching criteria
          match: equal("environment.yml") || equal("environment.yaml") || equal("meta.yml") || equal("meta.yaml")
          # parser properties
          properties:
            # path to conda-lock for resolve
            conda-lock-path: conda-lock
  # scan archives options
  scan-archives:
    # scan archives
    scan: false
    # archive scanning depth
    depth: 1
# stats options
stats:
  # Report format. Supported formats: coloredtable, table, text, junit, sarif, csv. Default output to console.
  format: coloredtable,junit>>junit.xml
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