---
hide:
  - footer
---

# Scan command

The agent is launched using the `scan` command with possible scanning options:

- `scan dir` – [scanning a directory](/agent/scan-dir.en/);
- `scan file` – [scanning a file](/agent/scan-file.en);
- `scan image` – [scanning a container image](/agent/scan-docker.en);
- `scan bom` – [scanning a SBoM](/agent/scan-bom.en);
- `scan <technology>` - [scanning a directory using settings for selected technology](/agent/scan-technology.en);

## Launch options

Available and required options for launching the agent for scanning can be viewed using the `help` flag.

```markdown
$ ./johnny scan --help
johnny - CLI tool for dependency analysis for vulnerabilities and license compliance issues. Works in connection with CodeScoring SCA.
CodeScoring website: https://codescoring.ru
Documentation: https://docs.codescoring.ru

Exit codes:
- 0: successful run, no issues
- 1: some issues found, action required
- 2: run failure

- 3: successful run, no result

- 4: signing or verification failure

Version: 2025.37.0

Usage:
   scan [command]

Scan Technologies Commands:
  clang       Scan clang
  conda       Scan conda
  csharp      Scan csharp
  go          Scan go
  java        Scan java
  js          Scan js
  objective_c Scan objective_c
  php         Scan php
  python      Scan python
  ruby        Scan ruby
  rust        Scan rust
  swift       Scan swift

Additional Commands:
  bom         Scan bom
  build       Scan build
  dir         Scan directory
  file        Scan file
  image       Scan image

Flags:
  -h, --help      help for scan
  -v, --version   version for scan

Global Flags:
      --alerts-format string              Alerts format. Supported formats: coloredtable, table, text, csv, json. Default output to console. Supports multiformat. Example: 'coloredtable,csv>>csv.csv'  (default "coloredtable")
      --api_token string                  API token for integration with CodeScoring server (required if api_url is set)
      --api_url string                    CodeScoring server url (e.g. https://codescoring.mycompany.com) (required if api_token is set)
      --block-on-empty-result             Block on empty result
      --bom                               save result to bom
      --bom-format string                 Bom format. Supported formats: cyclonedx_v1_4_json,cyclonedx_v1_5_json,cyclonedx_v1_6_ext_json,cyclonedx_v1_6_json (default "cyclonedx_v1_6_json")
      --bom-path string                   Path for save bom file (default "bom.json")
      --cg-lang string                    Language to parse call graph with. Supported languages: java
      --cg-path string                    Path to call graph for vulnerability reachability analysis
      --cloud-resolve                     Activate cloud resolve
      --composer-args string              pass flags to 'composer install'
      --composer-path string              Path to composer for resolve (default "composer")
      --composer-resolve                  Enable resolve using composer
      --conda-args string                 pass flags to conda
      --conda-lock-path string            Path to conda-lock for resolve (default "conda-lock")
      --conda-resolve                     Enable resolve using conda-lock
      --config string                     Config file (default "codescoring-johnny-config.yaml")
      --create-project                    Create project in CodeScoring if not exists
      --debug                             Output detailed log
      --dotnet-args string                pass flags to 'dotnet restore'
      --dotnet-path string                Path to dotnet for resolve (default "dotnet")
      --dotnet-resolve                    Enable resolve using dotnet
  -f, --format string                     Report format. Supported formats: coloredtable, table, text, junit, sarif, csv, gl-dependency-scanning-report, gl-code-quality-report. Default output to console. Supports multiformat. Example: 'coloredtable,junit>>junit.xml'  (default "coloredtable")
      --gdt-match string                  Section in gradle dependency tree for scan. By default - parse all sections
      --go-path string                    Path to go for resolve (default "go")
      --go-resolve                        Enable resolve using go
      --gradle-args string                pass flags to 'gradle dependencies'
      --gradle-path string                Path to gradle for resolve (default "./gradlew")
      --gradle-resolve                    Enable resolve using gradle
  -g, --group-vulnerabilities-by string   Group vulnerabilities by. Supported kinds 'vulnerability', 'affect' (default "vulnerability")
      --ignore stringArray                Ignore paths (--ignore first --ignore "/**/onem?re")
      --license string                    Project license code
      --maven-args string                 pass flags to 'mvn dependency:tree'
      --maven-path string                 Path to mvn for resolve (default "mvn")
      --maven-resolve                     Enable resolve using mvn
      --no-summary                        Do not print summary
      --no-wait                           No wait analysis results
      --npm-args string                   pass flags to 'npm install'
      --npm-path string                   Path to npm for resolve (default "npm")
      --npm-resolve                       Enable resolve using npm
      --only-hashes                       Search only for direct inclusion of dependencies using file hashes
      --pip-args string                   pass flags to 'pip freeze'
      --pip-path string                   Path to pip for resolve (default "pip")
      --pip-resolve                       Enable resolve using pip
      --pnpm-args string                  pass flags to 'pnpm install'
      --pnpm-path string                  Path to pnpm for resolve (default "pnpm")
      --pnpm-resolve                      Enable resolve using pnpm
      --poetry-args string                pass flags to 'poetry debug resolve'
      --poetry-path string                Path to poetry for resolve (default "poetry")
      --poetry-resolve                    Enable resolve using poetry
      --progress-bar string               Progress bar formats: spinner,text
      --project string                    Project name in CodeScoring
      --project-group string              Group for created project in CodeScoring
      --project-proprietor string         Proprietor for created project in CodeScoring
      --python-version string             Python version
      --save-results                      Save results to CodeScoring. Used just together with project name
      --sbt-args string                   pass flags to 'sbt dependencyTree'
      --sbt-path string                   Path to sbt for resolve (default "sbt")
      --sbt-resolve                       Enable resolve using sbt
      --scan-archives                     Scan archives. Supported types: '.jar', '.rar', '.tar', '.tar.bz2', '.tbz2', '.tar.gz', '.tgz', '.tar.xz', '.txz', '.war', '.zip', '.aar', '.egg', '.hpi', '.nupkg', '.whl'
      --scan-depth int                    Archive scanning depth (default 1)
  -s, --sort-vulnerabilities-by string    Sort vulnerabilities by. Comma separated field names. For DESC - write field name with prefix '-'.
                                          FieldNames: 'vulnerability', 'fixedversion', 'cvss2', 'cvss3', 'cwes', 'links', 'affect' (default "-cvss3,-cvss2,fixedversion,vulnerability,cwes,links,affect")
      --stage string                      Policy stage (build, dev, source, stage, test, prod, proxy) (default "build")
      --swift-args string                 pass flags to 'swift build
      --swift-path string                 Path to swift for resolve (default "swift")
      --swift-resolve                     Enable resolve using swift
  -t, --timeout uint16                    Timeout of analysis results waiting in seconds (default 3600)
      --with-hashes                       Search for direct inclusion of dependencies using file hashes
      --yarn-args string                  pass flags to 'yarn install'
      --yarn-path string                  Path to yarn for resolve (default "yarn")
      --yarn-resolve                      Enable resolve using yarn

Use " scan [command] --help" for more information about a command.
```

The `--api_url` parameter must contain the full address of the on-premise installation. The value for `--api_token` can be taken from the installation user profile.

If the `--api_url` and `--api_token` parameters are not specified, the scan will run without interacting with the CodeScoring installation. As a result, the scan will generate an SBoM file containing only the list of components and their versions, without enrichment with additional information.

Specifying the `--project` parameter will allow scanning to apply policies related to the selected project.

To specify the path to a SBOM save file, you must add the `--bom-path` parameter to the request or assign the `bom-path` variable in the config file. By default, the SBOM is saved in the startup directory in the file `bom.json`.

## Run results

Depending on the run result and launch parameters, the agent returns the corresponding exit code:

- 0: successful run, no issues were detected;
- 1: issues found after a successful run, user action required;
- 2: run failure;
- 3: empty result, no artifacts were found for analysis. Returned only if the `--block-on-empty-result` parameter is set to `true`.

### Priority of settings

Since agent startup parameters can be configured in multiple ways, if two or more methods are used at the same time, the agent will accept parameters in the following priority order:

1. Value of the [scan-technology](/agent/scan-technology.en) command (if used);
2. Value of the command flag;
3. Value of [environment variable](/agent/env-variables.en);
4. Value from [config file](/agent/config.en).

