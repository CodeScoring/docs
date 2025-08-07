---
hide:
  - footer
---

# Настройка сервиса

## Основные параметры

Конфигурация CodeScoring Proxy осуществляется через файл `application.yml`:

```yaml
# Параметры CodeScoring
codescoring:
  host: URL сервера CodeScoring
  token: токен авторизации
  work-mode: режим работы (например, strict_wait)
  proxy-manager-host: хост прокси-менеджера
  enable-status-line: включение строки статуса

# Конфигурация для PyPI
pypi:
  enabled: true/false
  registry: URL основного реестра
  packages-registry: URL для скачивания пакетов
  repository:
    - name: имя репозитория
      project: проект в CodeScoring
      scan-manifest: true/false
      scan-package: true/false

# Конфигурация для Maven
maven:
  enabled: true/false
  registry: URL реестра
  repository:
    - name: имя репозитория
      project: проект в CodeScoring
      scan-manifest: true/false
      scan-package: true/false

# Конфигурация для NPM
npm:
  enabled: true/false
  registry: URL реестра
  repository:
    - name: имя репозитория
      project: проект в CodeScoring
      scan-manifest: true/false
      scan-package: true/false

# Конфигурация для NuGet
nuget:
  enabled: true/false
  registry: URL реестра
  repository:
    - name: имя репозитория
      project: проект в CodeScoring
      scan-manifest: true/false
      scan-package: true/false
````

## Дополнительные настройки

- Настройка уровней логирования
- Настройка размера буфера для обработки больших файлов
- Кэширование результатов сканирования (Caffeine cache)
- Настройка retry политик для запросов к CodeScoring