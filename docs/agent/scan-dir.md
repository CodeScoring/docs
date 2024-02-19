---
hide:
  - footer
---
# Сканирование директории

Сканирование директории производится при помощи субкоманды `scan dir`.

При запуске агент:

1. Рекурсивно проходит по всему содержимому указанной директории (если указан конкретный манифест, обрабатывает только его)
  1. Идентифицирует файлы манифестов и разбирает их
  2. Хеширует каждый файл (при запуске с `--with-hashes`)
2. Формирует запрос к инсталляции
3. После получения результата показывает суммарную информацию по найденным манифестам, зависимостям, уязвимостям, сработавшим политикам и более подробную информацию по каждой уязвимости и сработавшей политике
4. Дополнительно в текущей директории формируется файл `bom.json`, содержащий полный Software Bill of Materials в формате **CycloneDX**.

В зависимости от результата работы и параметров запуска агент возвращает соответствующий exit code.

## Опции сканирования

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

Version: 2024.7.0

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
      --api_token string                  API token for integration with CodeScoring server (required if api_url is set) (default "api_token")
      --api_url string                    CodeScoring server url (e.g. https://codescoring.mycompany.com) (required if api_token is set) (default "api_url")
      --bom-path string                   Path for save bom file (default "bom.json")
      --config string                     Config file (default "codescoring-johnny-config.yaml")
      --create-project                    Create project in CodeScoring if not exists
      --debug                             Output detailed log
      --export-vulns-to-csv string        Path to csv file for local summary result
  -f, --format string                     Report format. Supported formats: coloredtable, table, text (default "coloredtable")
      --gdt-match string                  Section in gradle dependency tree for scan (default "compileClasspath")
      --go-path string                    Path to go for resolve (default "go")
      --go-resolve                        Enable resolve using go
      --gradle-path string                Path to gradle for resolve (default "gradle")
      --gradle-resolve                    Enable resolve using gradle
  -g, --group-vulnerabilities-by string   Group vulnerabilities by. Supported kinds 'vulnerability', 'affect' (default "vulnerability")
      --ignore stringArray                Ignore paths (--ignore first --ignore "/**/onem?re")
      --maven-path string                 Path to mvn for resolve (default "mvn")
      --maven-resolve                     Enable resolve using mvn
      --no-summary                        Do not print summary
      --only-hashes                       Search only for direct inclusion of dependencies using file hashes
      --project string                    Project name in CodeScoring
      --save-results                      Save results to CodeScoring. Used just together with project name
      --sbt-path string                   Path to sbt for resolve (default "sbt")
      --sbt-resolve                       Enable resolve using sbt
      --scan-archives                     Scan archives. Supported types: '.jar', '.rar', '.tar', '.tar.bz2', '.tbz2', '.tar.gz', '.tgz', '.tar.xz', '.txz', '.war', '.zip', '.aar', '.egg', '.hpi', '.nupkg', '.whl'
      --scan-depth int                    Archive scanning depth (default 1)
  -s, --sort-vulnerabilities-by string    Sort vulnerabilities by. Comma separated field names. For DESC - write field name with prefix '-'.
                                          FieldNames: 'vulnerability', 'fixedversion', 'cvss2', 'cvss3', 'cwes', 'links', 'affect' (default "-cvss3,-cvss2,fixedversion,vulnerability,cwes,links,affect")
      --stage string                      Policy stage (build, dev, source, stage, test, prod, proxy) (default "build")
  -t, --timeout uint16                    Timeout of analysis results waiting in seconds. Default: 3600 (default 3600)
      --with-hashes                       Search for direct inclusion of dependencies using file hashes
      --yarn-path string                  Path to yarn for resolve (default "yarn")
      --yarn-resolve                      Enable resolve using yarn

Use " scan [command] --help" for more information about a command.
```

По умолчанию агент проходит по содержимому директории рекурсивно (включая вложенные директории). Для нерекурсивного сканирования необходимо добавить параметр `--no-recursion` к команде `scan dir`.

В параметре `--api_url` должен быть указан полный адрес on-premise инсталляции. Значение для `--api_token` можно взять в профиле пользователя инсталляции.

Указание параметра `--project` позволит при сканировании применить политики, относящиеся к выбранному проекту.

Для указания пути к файлу сохранения SBOM необходимо добавить параметр `--bom-path` в запрос или назначить переменную `bom-path` в config-файле. По умолчанию SBOM сохраняется в директории запуска в файл `bom.json`.

## Пример запуска команды

```bash
./johnny scan dir . \
--api_token <api_token> \
--api_url <api_url> \
--ignore .tmp --ignore fixtures --ignore .git 
```