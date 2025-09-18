---
hide:
  - footer
---

# Настройка сервиса

## Основные параметры

Конфигурация CodeScoring Proxy осуществляется через файл `application.yml`:

!!! example Пример конфигурационного файла

  ```yaml
  # Параметры CodeScoring
  codescoring:
    host: URL-адрес сервера CodeScoring
    token: токен авторизации
    work-mode: рабочий режим (применяется только к сканированию пакетов)
                # warmup | Разогрев кэша сканирования без мониторинга запросов, без блокировки
                # spectator | Разогрев кэша сканирования с мониторингом запросов, без блокировки
                # moderate | Блокировка на основе политик с использованием результатов кэша, загрузка непроверенных компонентов разрешена
                # strict | Блокировка на основе политик с использованием результатов кэша, загрузка непроверенных компонентов заблокирована
                # strict_wait | Блокировка на основе политик, ожидание, пока компонент не будет отсканирован
    proxy-manager-host: хост прокси-сервера
    enable-status-line: true/false (добавляет сообщение о причине блокировки в строку состояния)
    block-status-code: статус код для блокировки загрузки пакетов
    block-on-codescoring-errors: блокирует загрузку пакета при 5xx status, ошибках сканирования (scan_failed) или ошибки registry_not_configured

  # Настройки PyPI
  pypi:
    enabled: true
    repository:
      - name: internet-pypi
        scan-manifest: true
        scan-package: true
        registry: https://pypi.org
        packages-registry: https://files.pythonhosted.org
      - name: arti-pypi
        scan-manifest: true
        scan-package: true
        registry: http://localhost:8081/artifactory/api/pypi/pypi-remote
        packages-registry: http://localhost:8081/artifactory/api/pypi/pypi-remote/packages
      - name: nexus-pypi
        scan-manifest: true
        scan-package: true
        registry: https://localhost:8081/repository/pypi-proxy
        packages-registry: https://localhost:8081/repository/pypi-proxy/packages

  # Настройки Maven
  maven:
    enabled: true
    repository:
      - name: internet-mvn
        scan-manifest: true
        scan-package: true
        registry: https://repo1.maven.org/maven2
      - name: arti-mvn
        scan-manifest: false
        scan-package: true
        registry: http://localhost:8081/artifactory/maven-remote
      - name: nexus-mvn
        scan-manifest: false
        scan-package: true
        registry: http://localhost:8081/repository/maven-proxy

  # Настройки NPM
  npm:
    enabled: true
    repository:
      - name: internet-npm
        scan-package: true
        scan-manifest: true
        registry: https://registry.npmjs.org
      - name: arti-npm
        scan-package: true
        scan-manifest: true
        registry: http://localhost:8081/artifactory/api/npm/npm-remote
      - name: nexus-npm
        scan-package: true
        scan-manifest: true
        registry: http://localhost:8081/repository/npm-proxy

  # Настройки NuGet
  nuget:
    enabled: true
    repository:
      - name: codescoring-nuget
        scan-package: true
        registry: https://api.nuget.org
      - name: arti-nuget
        scan-package: true
        registry: http://localhost:8081/artifactory/api/nuget/v3/nuget-remote
      - name: nexus-npm
        scan-package: true
        scan-manifest: true
        registry: http://localhost:8081/repository/npm-proxy
  ```

## Дополнительные настройки

### Настройки уровня логирования

!!! example Пример настройки логирования

  ```yaml
  logging:
    level:
      ru:
        codescoring: info
  ```

### Размер буфера для обработки больших манифестов

!!! example Пример настройки размера буфера

  ```yaml
  spring:
    http:
      codecs:
        max-in-memory-size: 50MB (это настройка по умолчанию, уже включенная в приложение, увеличьте ее, если вы столкнулись с очень большими манифестами)
  ```

## Политики повторных попыток и circuit breaker для запросов к инсталляции:

### Настройка повторных попыток

Эта конфигурация определяет политику повторных попыток для сервиса `codeScoringApi`. Она настроена на обработку временных сбоев путем повторной попытки запроса до 3 раз. 

Повторные попытки используют стратегию экспоненциального отступления, начиная с задержки в 1 секунду и удваивая ее с каждой попыткой. Эта политика применяется только к определенным исключениям, таким как `WebClientRequestException`.

### Настройка Circuit Breaker

Circuit breaker (автоматический выключатель) для `codeScoringApi` действует как механизм быстрого отказа. Он отслеживает частоту сбоев и, если она достигает 50% (рассчитывается по последним 20 вызовам), он «открывается» и предотвращает дальнейшие запросы в течение 30 секунд. Это дает нижестоящему сервису время на восстановление. После периода ожидания он переходит в «полуоткрытое» состояние, позволяя пройти 5 пробным вызовам, чтобы определить, восстановился ли сервис.

Конфигурация Retry и Circuit Breaker может быть переопределена путем установки [следующих свойств](https://resilience4j.readme.io/docs/getting-started-3), например, для `codeScoringApi`.