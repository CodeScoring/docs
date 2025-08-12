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
- **timeout** – ограничение по времени ожидания анализа (в секундах);
- <a href="/changelog/on-premise-changelog/#2024520-2024-12-28" class="version-tag">2024.52.0</a> **branch-or-tag** – ссылка на ветку репозитория или тег, например `refs/tags/v1.0` (для команд `scan dir` и `scan file`);
- <a href="/changelog/on-premise-changelog/#2024520-2024-12-28" class="version-tag">2024.52.0</a> **commit** – хэш коммита в системе контроля версий (для команд `scan dir` и `scan file`);
- <a href="/changelog/on-premise-changelog/#2024520-2024-12-28" class="version-tag">2024.52.0</a> **hash** – хэш образа (для команды `scan image`);
- <a href="/changelog/on-premise-changelog/#202570-2025-02-14" class="version-tag">2025.7.0</a> **cloud-resolve** – использование разрешения зависимостей в облаке. По умолчанию значение `false`.

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
- **registries** – список конфигураций для подключения к нескольким реестрам образов. Каждый элемент списка может содержать:
  - **authority** – URL реестра (например, `docker.io`, `localhost:5000`);
  - **login** – имя пользователя для подключения к реестру;
  - **password** – пароль для подключения к реестру;
  - **token** – токен для подключения к реестру. Взаимоисключается с параметрами `login` и `password`.

### Параметры сканирования сборки C и C++

- **build-result** – флаг, указывающий, что входными данными являются результаты предыдущей сборки, включая скомпилированные артефакты. По умолчанию значение `false`;
- **lib-versions** – путь к JSON-файлу со списком версий анализируемых библиотек;
- **output** – путь к файлу, в который будут сохранены результаты анализа сборки;
- **unresolved-file** – путь к файлу, в который будет сохранена информация о библиотеках с неразрешёнными версиями.

### Параметры парсинга для разных технологий

#### Общие параметры

- **enabled** – включение парсеров для данной технологии;
- **parsers** – набор парсеров для манифестов.

#### Параметры парсеров

- **enabled** – включение данного парсера;
- **match** – условие для определения подходящих манифестов, может быть по названию (`equal`) или расширению (`extension`);
- **properties** – дополнительные свойства для парсеров окружения, такие как путь к исполняемым файлам;
- **dotnet-path**, **maven-path**, **gradle-path**, **yarn-path**, **go-path**, **sbt-path**,**npm-path**, **pnpm-path**, **composer-path**, **pip-path**, **poetry-path**, **conda-lock-path**  – пути к пакетным менеджерам для разрешения зависимостей в окружении;
- **resolve-enabled** – разрешение зависимостей в окружении. По умолчанию значение `false`;
- **dotnet-args**, **gradle-args**, **maven-args**, **sbt-args**, **npm-args**, **yarn-args**, **pnpm-args**, **composer-args**, **poetry-args**, **conda-args**, **swift-args** – аргументы для передачи соответствующим пакетным менеджерам при разрешении зависимостей в окружении;
- **configuration** – конфигурация для парсера `gradle-dependency-tree_txt`;
- **depth** – глубина парсинга для парсера `jar`. По умолчанию значение `1`;
- **python-version** – версия Python, используемая для разрешения зависимостей в окружении.

### Параметры сканирования архивов

- **scan** – сканирование архивов. По умолчанию значение `false`;
- **depth** – глубина сканирования архивов. По умолчанию значение `1`.

### Параметры вывода результатов

- **format** – формат вывода найденных уязвимостей. По умолчанию `coloredtable`. Возможна выгрузка в форматы `table`, `text`, `junit`, `sarif`, `csv`, `gl-dependency-scanning-report`, `gl-code-quality-report`;
- **group-vulnerabilities-by** – переменная для группировки уязвимостей в таблице;
- **sort-vulnerabilities-by** – порядок переменных для сортировки уязвимостей в таблице;
- **alerts-format** – формат вывода отчёта по срабатываниям политик. Поддерживаются форматы: `coloredtable`, `table`, `text`, `json`, `csv`. Значение по умолчанию – `coloredtable`.

### Параметры инсталляции

- **api_url** – адрес инсталляции;
- **api_token** – токен для доступа к инсталляции.

### Параметры запуска поиска секретов

- <a href="/changelog/on-premise-changelog/#2025130-2025-03-28" class="version-tag">2025.13.0</a> **gitleaks-path** – путь к исполняемому файлу gitleaks, который будет использоваться при сканировании;
- <a href="/changelog/on-premise-changelog/#2025130-2025-03-28" class="version-tag">2025.13.0</a> **gl-secrets-report** – включение формирования отчета о найденных секретах в формате GitLab. По умолчанию `false`;
- <a href="/changelog/on-premise-changelog/#2025130-2025-03-28" class="version-tag">2025.13.0</a> **gl-secrets-report-filename** – имя формируемого файла для отчета в формате GitLab. По умолчанию `gl-secrets-report.json`.

### Параметры [инструмента поиска секретов Gitleaks](https://github.com/gitleaks/gitleaks?tab=readme-ov-file#readme)

- <a href="/changelog/on-premise-changelog/#2025130-2025-03-28" class="version-tag">2025.13.0</a> **baseline-path** – путь к baseline файлу отчета gitleaks. Все обнаруженные ранее секреты, зафиксированные в этом файле, будут проигнорированы при повторном сканировании;
- <a href="/changelog/on-premise-changelog/#2025130-2025-03-28" class="version-tag">2025.13.0</a> **enable-rule** – список ID правил, которые будут **включены** при сканировании;
- <a href="/changelog/on-premise-changelog/#2025130-2025-03-28" class="version-tag">2025.13.0</a> **gitleaks-ignore-path** – путь к файлу .gitleaksignore или директории, содержащей его. По умолчанию `.` (текущая директория);
- <a href="/changelog/on-premise-changelog/#2025130-2025-03-28" class="version-tag">2025.13.0</a> **ignore-gitleaks-allow** – игнорирование комментариев gitleaks:allow. По умолчанию `false`;
- <a href="/changelog/on-premise-changelog/#2025130-2025-03-28" class="version-tag">2025.13.0</a> **log-level** – уровень логирования. Возможные значения: `trace, debug, info, warn, error, fatal`. По умолчанию `info`;
- <a href="/changelog/on-premise-changelog/#2025130-2025-03-28" class="version-tag">2025.13.0</a> **max-decode-depth** – максимальная глубина рекурсивного декодирования. Значение `0` отключает декодирование;
- <a href="/changelog/on-premise-changelog/#2025130-2025-03-28" class="version-tag">2025.13.0</a> **max-target-megabytes** – максимальный размер файлов (в мегабайтах), которые будут обрабатываться. Файлы, превышающие этот размер, будут пропущены. По умолчанию 0 (ограничение отсутствует);
- <a href="/changelog/on-premise-changelog/#2025130-2025-03-28" class="version-tag">2025.13.0</a> **no-banner** – отключение баннера gitleaks при запуске. По умолчанию `false`;
- <a href="/changelog/on-premise-changelog/#2025130-2025-03-28" class="version-tag">2025.13.0</a> **no-color** – отключение цветного вывода для подробного (verbose) режима. По умолчанию `false`;
- <a href="/changelog/on-premise-changelog/#2025130-2025-03-28" class="version-tag">2025.13.0</a> **redact** – маскирование найденных секретов в логах и консоли. Значение 0 полностью отображает секреты, 100 – полностью скрывает. Можно задать промежуточное значение, например, 20 (маскирует 20% секрета). По умолчанию `0`;
- <a href="/changelog/on-premise-changelog/#2025130-2025-03-28" class="version-tag">2025.13.0</a> **verbose** – включение подробного (verbose) вывода при сканировании. По умолчанию `false`.

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
  # Reference to repository branch or tag (e.g. refs/tags/v1.0). For scan dir and scan file commands
  branch-or-tag: ""
  # Commit. For scan dir and scan file commands
  commit: ""
  # Hash. For scan image command
  hash: ""
  # Use cloud resolve
  cloud-resolve: false
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
  # Directory scan options
  dir:
    # Prevents from recursively scan directories
    no-recursion: false
  # Scanning a build for C and C++ languages options
  build:
    # input is the result of the previous build process, including compiled artifacts
    build-result: false
    # path to a JSON file with a list of versions of the libraries being analyzed
    lib-versions: ""
    # path to a file where the build results will be saved
    output: ""
    # path to a file where information about libraries with unresolved versions will be saved
    unresolved-file: UnresolvedLibs20241030_123655.json
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
            # pass args to dotnet tool
            dotnet-args: ""
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
            # args to gradle tool
            gradle-args: ""
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
            # args to mvn tool
            maven-args: ""
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
            # args to sbt tool
            sbt-args: ""
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
            # args for npm tool
            npm-args: ""
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
            # args for yarn tool
            yarn-args: ""
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
            # args for pnpm tool
            pnpm-args: ""
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
            # pass args to composer tool
            composer-args: ""
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
            # args for pip tool
            pip-args: ""
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
            # args for poetry tool
            poetry-args: ""
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
    # conda
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
            # args for conda tool
            conda-args: ""
    # swift
    swift:
      # Use swift parsers
      enabled: true
      # swift parsers
      parsers:
        # Package.resolved parser
        package_resolved:
          # use parser
          enabled: true
          # matching criteria
          match: equal("Package.resolved")
        # Package.swift parser
        package_swift:
          # use parser
          enabled: true
          # matching criteria
          match: equal("Package.swift")
        # Package.swift env parser
        package_swift_env:
          # use parser
          enabled: false
          # matching criteria
          match: equal("Package.swift")
          # parser properties
          properties:
            # path to swift for resolve
            swift-path: swift
            # args for swift tool
            swift-args: ""
  # scan secrets
  secrets:
    # gitleaks options
    gitleaks:
      # path to baseline with issues that can be ignored
      baseline-path: ""
      # only enable specific rules by id
      enable-rule: [ ]
      # path to .gitleaksignore file or folder containing one
      gitleaks-ignore-path: .
      # path to gitleaks binary to be used during scanning
      gitleaks-path: gitleaks
      # ignore gitleaks:allow comments
      ignore-gitleaks-allow: false
      # log level (trace, debug, info, warn, error, fatal)
      log-level: info
      # allow recursive decoding up to this depth (default \"0\", no decoding is done)
      max-decode-depth: 0
      # files larger than this will be skipped
      max-target-megabytes: 0
      # suppress banner
      no-banner: false
      # turn off color for verbose output
      no-color: false
      # redact secrets from logs and stdout. To redact only parts of the secret just apply a percent value from 0..100. For example --redact=20 (default 100%)
      redact: "0"
      # show verbose output from scan
      verbose: false
    # output report in gitlab format
    gl-secrets-report: false
    # output file for report in gitlab format
    gl-secrets-report-filename: gl-secrets-report.json
  # scan archives options
  scan-archives:
    # scan archives
    scan: false
    # archive scanning depth
    depth: 1
# stats options
stats:
  # Report format. Supported formats: coloredtable, table, text, junit, sarif, csv. Default output coloredtable to console.
  format: coloredtable,junit>>junit.xml
  # Policy alerts report format. Supported formats: coloredtable, table, text, json, csv. Default output coloredtable to console.
  alerts-format: coloredtable
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

### Приоритет настроек

Поскольку параметры запуска агента можно настроить несколькими способами, при одновременном использовании двух и более способов агент будет принимать параметры в следующем порядке приоритетов:

1. Значение команды [scan-technology](/agent/scan-technology) (если она используется);
2. Значение флага команды;
3. Значение [переменной окружения](/agent/env-variables);
4. Значение из [конфиг-файла](/agent/config).
