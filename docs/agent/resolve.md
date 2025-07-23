---
hide:
  - footer
---

# Разрешение зависимостей в окружении сборки

Пакетные менеджеры некоторых экосистем по умолчанию не включают транзитивные зависимости в манифесты. Для качественного проведения композиционного анализа при работе с ними рекомендуется применять механизм разрешения зависимостей в окружении сборки.

## Настройка разрешения зависимостей

При разрешении зависимостей в окружении агент проверяет отсутствие lock-файла, самостоятельно запускает пакетный менеджер или инструмент сборки и формирует полный список компонентов с учетом корректной версии сборки. На данный момент функциональность доступна для следующих экосистем:

- .NET
- Go
- Gradle
- Maven
- npm
- Poetry
- sbt
- yarn
- pip
- Composer
- pnpm
- Conda

Параметры разрешения зависимостей в окружении, пути к пакетному менеджеру и параметры выполнения регулируются следующими параметрами в команде `scan`:

- `--dotnet-resolve` / `--dotnet-path` / `--dotnet-args`
- `--go-resolve` / `--go-path`
- `--gradle-resolve` / `--gradle-path` / `--gradle-args`
- `--maven-resolve` / `--maven-path` / `--maven-args`
- `--npm-resolve` / `--npm-path` / `--npm-args`
- `--poetry-resolve` / `--poetry-path` / `--poetry-args`
- `--sbt-resolve` / `--sbt-path` / `--sbt-args`
- `--yarn-resolve` / `--yarn-path` / `--yarn-args`
- `--pip-resolve` / `--pip-path` / `--pip-args`
- `--composer-resolve` / `--composer-path` / `--composer-args`
- `--pnpm-resolve` / `--pnpm-path` / `--pnpm-args`
- `--conda-resolve` / `--conda-lock-path` / `--conda-args`

Пример команды:

``` bash
./johnny \
scan dir . \
--api_token <api_token> \
--api_url <api_url> \
--dotnet-resolve
--dotnet-path <path/to/dotnet>
```

При необходимости перечисленные параметры можно добавить в [конфигурационный файл агента](/agent/config).

### Gradle

Для разрешения зависимостей в Gradle по умолчанию необходимо задать следующее значение:

``` bash
--gradle-path : ./gradlew
```

Консольный агент Johnny формирует и анализирует файл [gradle-dependency-tree.txt](../../dependencies/java#gradle).