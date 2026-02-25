- [Русский](https://docs.codescoring.ru/agent/config/index.md)

# Using configuration file

You can manage the parameters of the CLI agent by adding the configuration file `codescoring-johnny-config.yaml` to the directory with the agent. Below is a list of available parameters and an example of config file.

## List of parameters

### Composition analysis parameters

- **project** – name of the project in the CodeScoring platform;
- **save-results** – saving the results in the CodeScoring platform. Used in conjunction with the project name. The default value is `false`;
- **license** – license of the analyzed project, for example `mit`;
- **stage** – development stage. Possible values: `build`, `dev`, `source`, `stage`, `test`, `prod`, `proxy`;
- **bom-path** – path (with file name) where the generated `bom.json` file will be saved;
- **bom-format** – format of the generated SBOM. Possible values: `cyclonedx_v1_6_json`, `cyclonedx_v1_5_json`, `cyclonedx_v1_4_json`,`cyclonedx_v1_6_ext_json`, `cyclonedx_v1_7_json`. Default value: `cyclonedx_v1_6_json`;
- **timeout** – limit on analysis waiting time (in seconds);
- [2024.52.0](/changelog/on-premise-changelog.en/#2024520-2024-12-28) **branch-or-tag** – a reference to a repository branch or tag, such as `refs/tags/v1.0` (for the `scan dir` and `scan file` commands);
- [2024.52.0](/changelog/on-premise-changelog.en/#2024520-2024-12-28) **commit** – a commit hash in the version control system (for the `scan dir` and `scan file` commands);
- [2024.52.0](/changelog/on-premise-changelog.en/#2024520-2024-12-28) **hash** – an image hash (for the `scan image` command);
- [2025.7.0](/changelog/on-premise-changelog.en/#202570-2025-02-14) **cloud-resolve** – use dependency resolution in cloud. Default value is `false`.

### General scan parameters

- **ignore** – directories that will be ignored during scanning;
- **no-summary** – hide summary information on the scan in the console. Default value is `false`;
- **only-hashes** – search for **only** direct inclusions of Open Source libraries by hashes. Default value is `false`;
- **with-hashes** – search for direct inclusions of Open Source libraries by hashes. Default value is `false`;
- **no-recursion** – disable recursive scanning for the `scan dir` command. The default value is `false`.
- **block-on-empty-result** – blocking the build when an empty result is returned. When activated, the agent returns exit code **3** if there are no artifacts for analysis.

### Docker image scanning parameters

- **scan-files** – scanning the file system inside the image. Default value is `false`;
- **insecure-skip-tls-verify** – skip TLS verification when connecting to the image registry. Default value is `false`;
- **insecure-use-http** – use the HTTP protocol when connecting to the image registry. Default value is `false`;
- **registries** – list of configurations for connecting to multiple image registries. Each list item may contain:
- **authority** – registry URL (for example, `docker.io`, `localhost:5000`);
- **login** – username for connecting to the registry;
- **password** – password for connecting to the registry;
- **token** – token for connecting to the registry. Mutually exclusive with the `login` and `password` parameters.

### C and C++ build scanning parameters

- **build-result** – flag indicating that the input data is the results of a previous build, including compiled artifacts. Default value is `false`;
- **lib-versions** – path to a JSON file with the list of versions of the libraries being analyzed;
- **output** – path to the file where the build analysis results will be saved;
- **unresolved-file** – path to the file where information about libraries with unresolved versions will be saved.

### Parsing parameters for different technologies

#### Common parameters

- **enabled** – enables parsers for the given technology;
- **parsers** – set of parsers for manifests.

#### Parser parameters

- **enabled** – enables this parser;
- **match** – condition for matching suitable manifests, can be by name (`equal`) or extension (`extension`);
- **properties** – additional properties for environment parsers, such as the path to executables;
- **dotnet-path**, **maven-path**, **gradle-path**, **yarn-path**, **go-path**, **sbt-path**, **npm-path**, **pnpm-path**, **composer-path**, **pip-path**, **poetry-path**, **conda-lock-path** – paths to package managers for dependency resolution in the environment;
- **resolve-enabled** – enables dependency resolution in the environment. Default value is `false`;
- **dotnet-args**, **gradle-args**, **maven-args**, **sbt-args**, **npm-args**, **yarn-args**, **pnpm-args**, **composer-args**, **poetry-args**, **conda-args**, **swift-args** – arguments to pass to the corresponding package managers when resolving dependencies in the environment;
- **configuration** – configuration for the `gradle-dependency-tree_txt` parser;
- **depth** – parsing depth for the `jar` parser. Default value is `1`;
- **python-version** – Python version used for dependency resolution in the environment.

### Archive scanning parameters

- **scan** – scan archives. Default value is `false`;
- **depth** – archive scanning depth. Default value is `1`.

### Output parameters

- **format** – output format for found vulnerabilities. Default value is `coloredtable`. Export to formats `table`, `text`, `junit`, `sarif`, `csv`, `gl-dependency-scanning-report`, `gl-code-quality-report` is available;
- **group-vulnerabilities-by** – field used to group vulnerabilities in the table;
- **sort-vulnerabilities-by** – order of fields for sorting vulnerabilities in the table;
- **alerts-format** – output format for the policy alerts report. Supported formats: `coloredtable`, `table`, `text`, `json`, `csv`. Default value is `coloredtable`.

### Platform parameters

- **api_url** – platform address;
- **api_token** – token for access to the platform;
- **localization** — CLI output localization language. Possible values: `en`, `ru`. The default value is `en`.

### Secret scanning launch parameters

- [2025.13.0](/changelog/on-premise-changelog.en/#2025130-2025-03-28) **gitleaks-path** – path to the Gitleaks executable file to be used during scanning;
- [2025.13.0](/changelog/on-premise-changelog.en/#2025130-2025-03-28) **gl-secrets-report** – enables the generation of a secrets report in GitLab format. Default: `false`;
- [2025.13.0](/changelog/on-premise-changelog.en/#2025130-2025-03-28) **gl-secrets-report-filename** – name of the generated GitLab secrets report file. Default: `gl-secrets-report.json`.

### [Gitleaks secret scanning tool](https://github.com/gitleaks/gitleaks?tab=readme-ov-file#readme) parameters

- [2025.13.0](/changelog/on-premise-changelog.en/#2025130-2025-03-28) **baseline-path** – path to the Gitleaks baseline report file. All previously detected secrets recorded in this file will be ignored during rescanning;
- [2025.13.0](/changelog/on-premise-changelog.en/#2025130-2025-03-28) **enable-rule** – list of rule IDs to be **enabled** during scanning;
- [2025.13.0](/changelog/on-premise-changelog.en/#2025130-2025-03-28) **gitleaks-ignore-path** – path to the `.gitleaksignore` file or the directory containing it. Default: `.` (current directory);
- [2025.13.0](/changelog/on-premise-changelog.en/#2025130-2025-03-28) **ignore-gitleaks-allow** – ignores `gitleaks:allow` comments. Default: `false`;
- [2025.13.0](/changelog/on-premise-changelog.en/#2025130-2025-03-28) **log-level** – logging level. Possible values: `trace, debug, info, warn, error, fatal`. Default: `info`;
- [2025.13.0](/changelog/on-premise-changelog.en/#2025130-2025-03-28) **max-decode-depth** – maximum depth for recursive decoding. A value of `0` disables decoding;
- [2025.13.0](/changelog/on-premise-changelog.en/#2025130-2025-03-28) **max-target-megabytes** – maximum file size (in megabytes) to be processed. Files exceeding this size will be skipped. Default: `0` (no limit);
- [2025.13.0](/changelog/on-premise-changelog.en/#2025130-2025-03-28) **no-banner** – disables the Gitleaks startup banner. Default: `false`;
- [2025.13.0](/changelog/on-premise-changelog,en/#2025130-2025-03-28) **no-color** – disables colored output in verbose mode. Default: `false`;
- [2025.13.0](/changelog/on-premise-changelog.en/#2025130-2025-03-28) **redact** – masks detected secrets in logs and console output. A value of 0 fully reveals secrets, while 100 completely hides them. Intermediate values, such as 20, mask 20% of the secret. Default: `0`;
- [2025.13.0](/changelog/on-premise-changelog.en/#2025130-2025-03-28) **verbose** – enables verbose output during scanning. Default: `false`.

## Example file

````
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
        sln:
          # use parser
          enabled: true
          # matching criteria
          match: extension(".sln")
        sln_env:
          # use parser
          enabled: false
          # matching criteria
          match: extension(".sln")
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
        # bun.lock parser
        bun_lock:
          # use parser
          enabled: true
          # matching criteria
          match: equal("bun.lock")
        # package.json bun environment parser
        bun_env:
          # use parser
          enabled: false
          # matching criteria
          match: equal("package.json")
          # parser properties
          properties:
            # path to bun for resolve
            bun-path: bun
            # args for bun tool
            bun-args: ""
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
        # pipdeptree parser
        pipdeptree:
          # use parser
          enabled: true
          # matching criteria
          match: equal("pipdeptree.txt")
        # pipdeptree environment parser
        pipdeptree_env:
          # use parser
          enabled: false
          # matching criteria
          match: equal("codescoring_pipdeptree")
          # parser properties
          properties:
            # path to pipdeptree for resolve
            pipdeptree-path: pip
            # args for pipdeptree tool
            pipdeptree-args: ""
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
        # uv.lock parser
        uv_lock:
          # use parser
          enabled: true
          # matching criteria
          match: equal("uv.lock")
        # pyproject.toml uv environment parser
        uv_env:
          # use parser
          enabled: false
          # matching criteria
          match: equal("pyproject.toml")
          # parser properties
          properties:
            # path to uv for resolve
            uv-path: uv
            # args for uv tool
            uv-args: ""
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
      # path to gitleaks config
      gitleaks-config: ""
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
  # Localization language (en|ru). Default: en
  localization: en
````

### Priority of settings

Since agent startup parameters can be configured in multiple ways, if two or more methods are used at the same time, the agent will accept parameters in the following priority order:

1. Value of the [scan-technology](/agent/scan-technology.en) command (if used);
1. Value of the command flag;
1. Value of [environment variable](/agent/env-variables.en);
1. Value from [config file](/agent/config.en).
