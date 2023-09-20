---
hide:
  - footer
---
# Сканирование директории

Сканирование директории производится при помощи субкоманды `scan dir`.

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

Version: 2023.33.0

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
      --api_token string             API token for integration with CodeScoring server (required if api_url is set)
      --api_url string               CodeScoring server url (e.g. https://codescoring.mycompany.com) (required if api_token is set)
      --bom-path string              Path for save bom file (default "bom.json")
      --config string                config file
      --create-project               Create project in CodeScoring if not exists
      --debug                        Output detailed log
      --export-vulns-to-csv string   Path to csv file for local summary result
      --gdt-match string             section in gradle dependency tree for scan (default "compileClasspath")
      --ignore stringArray           Ignore paths (--ignore first --ignore "/**/onem?re")
      --no-summary                   Do not print summary
      --only-hashes                  Search only for direct inclusion of dependencies using file hashes
      --project string               Project name in CodeScoring
      --save-results                 Save results to CodeScoring. Used just together with project name
      --scan-archives                Scan archives. Supported types: '.jar', '.rar', '.tar', '.tar.bz2', '.tbz2', '.tar.gz', '.tgz', '.tar.xz', '.txz', '.war', '.zip', '.aar', '.egg', '.hpi', '.nupkg', '.whl'
      --scan-depth int               Archive scanning depth (default 1)
      --stage string                 Policy stage (build, dev, source, stage, test, prod, proxy) (default "build")
      --with-hashes                  Search for direct inclusion of dependencies using file hashes

Use " scan [command] --help" for more information about a command.
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

Для указания пути к файлу сохранения SBOM необходимо добавить параметр `--bom-path` в запрос или назначить переменную `bom-path` в config-файле. По умолчанию SBOM сохраняется в директории запуска в файл `bom.json`.

Пример запуска на директорию:

```bash
./johnny scan dir . \
--api_token <api_token> \
--api_url <api_url> \
--ignore .tmp --ignore fixtures --ignore .git 
```