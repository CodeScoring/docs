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

Параметры разрешения зависимостей в окружении и пути к пакетному менеджеру регулируются следующими флагами в команде `scan`:

- `--dotnet-resolve` / `--dotnet-path`
- `--go-resolve` / `--go-path`
- `--gradle-resolve` / `--gradle-path`
- `--maven-resolve` / `--maven-path`
- `--npm-resolve` / `--npm-path`
- `--poetry-resolve` / `--poetry-path`
- `--sbt-resolve` / `--sbt-path`
- `--yarn-resolve` / `--yarn-path`
- `--pip-resolve` / `--pip-path`
- `--composer-resolve` / `--composer-path`
- `--pnpm-resolve` / `--pnpm-path`
- `--conda-resolve` / `--conda-lock-path`

Пример команды:

``` bash
./johnny \
scan dir . \
--api_token <api_token> \
--api_url <api_url> \
--dotnet-resolve true
--dotnet-path <path/to/dotnet>
```

При необходимости перечисленные параметры можно добавить в [конфигурационный файл агента](/agent/config).
