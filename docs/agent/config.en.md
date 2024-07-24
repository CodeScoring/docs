---
hide:
  - footer
---

# Agent configuration

# Using configuration file

You can manage the parameters of the CLI agent by adding the configuration file `config.yaml` to the directory with the agent. Below is a list of available parameters and an example of config file.

### Composition Analysis Options

- **project** – name of the project in the CodeScoring installation;
- **save-results** – saving the results in the CodeScoring installation. Used in conjunction with the project name. The default value is `false`;
- **stage** – development stage. Possible values: `build`, `dev`, `source`, `stage`, `test`, `prod`, `proxy`;
- **bom-path** – path (with file name) where the generated `bom.json` file will be saved;
- **timeout** – limit on analysis waiting time (in seconds).

### General scan options

- **ignore** – directories that will be ignored during scanning;
- **no-summary** – hide summary information on the scan in the console. Default value is `false`;
- **only-hashes** – search for **only** direct inclusions of Open Source libraries by hashes. Default value is `false`;
- **with-hashes** – search for direct inclusions of Open Source libraries by hashes. Default value is `false`;
- **no-recursion** – disable recursive scanning for the `scan dir` command. The default value is `false`.

### Docker image scanning options

- **scan-files** – scanning the file system inside the container image. Default value is `false`;
- **insecure-skip-tls-verify** – skip TLS verification when connecting to the image registry. Default value is `false`;
- **insecure-use-http** – use the http protocol when connecting to the image registry. Default value is `false`;
- **authority** – URL for connecting to the image registry;
- **login** – account login for connecting to the image registry;
- **password** – account password for connecting to the image registry;
- **token** – token for connecting to the image registry.

### Manifest parsing options

- **maven-path**, **gradle-path**, **yarn-path**, **go-path**, **sbt-path** – paths to package managers for resolving dependencies in the environment ;
- **resolve-enabled** – resolution of dependencies in the environment. The default value is `false`.

### Archive scanning options

- **scan** – scan archives. Default value is `false`;
- **depth** – archive scanning depth. The default value is `1`.

### Results output options

- **format** – output format. Default value is `coloredtable`;
- **group-vulnerabilities-by** – variable for grouping vulnerabilities in the table;
- **sort-vulnerabilities-by** – order of variables for sorting vulnerabilities in the table.

### Installation parameters

- **api_url** – installation address;
- **api_token** – token for access to the installation.

### Example file

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
    # npm parser options
    npm:
      # path to npm
      npm-path: npm
      # enable resolve with npm
      resolve-enabled: false
    # poetry parser options
    poetry:
      # path to poetry
      poetry-path: poetry
      # enable resolve with poetry
      resolve-enabled: false
    # pypi parsers options
    pypi:
      # python version
      python-version: ""
    # dotnet parser options
    dotnet:
      # path to dotnet
      dotnet-path: dotnet
      # enable resolve with dotnet
      resolve-enabled: false
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