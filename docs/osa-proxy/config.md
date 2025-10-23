---
hide:
  - footer
---

# Настройка сервиса

## Основные параметры

Конфигурация **OSA Proxy** осуществляется через файл `application.yml`:

!!! example "Пример конфигурационного файла"

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
      block-on-codescoring-errors: блокирует загрузку пакета при 5xx status, ошибках сканирования (scan_failed)
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
        - name: nexus-nuget
          scan-package: true
          scan-manifest: true
          registry: http://localhost:8081/repository/nuget-v3-proxy
    ```

!!! warning "Особенности работы в Nexus Repository и JFrog Artifactory"

    - Для JFrog Artifactory рекомендуется выставить `Custom Base URL` и использовать его в поле `registry` для корректной замены ссылок на пакеты внутри манифестов;
    - Для Nexus Repository идентичного функционала нет, в манифестах будет использован хост и порт (если указан) из запроса. При наличии `reverse proxy` рекомендуется использовать ссылку на него. Например: `registry: https://nexushost.ru/repository/pypi-proxy`.

## Развертывание
После настройки файла `application.yml` приложение может быть развернуто и выполнено либо в среде контейнера Docker, либо оркестрировано с помощью Helm-чарта для развертываний в Kubernetes (k8s).

**1. Развертывание в контейнере Docker:**
Чтобы запустить приложение как контейнер Docker, выполните следующую команду.

``` bash
docker run -d \
-p 8080:8080 \
-e SPRING_CONFIG_ADDITIONAL_LOCATION=file:/app/config/ \
-v /path/to/your/config/application.yml:/app/config/application.yml \
--name cs-proxy \
<registry-address>/cs-proxy:<tag>
```

**2. Развертывание в Kubernetes (Helm Chart):**
Для сред Kubernetes приложение может быть развернуто с использованием предоставленного Helm-чарта, доступного по адресу `https://{REGISTRY_URL}/repository/helm`.

## Дополнительные настройки

### Настройки уровня логирования

!!! example "Пример настройки логирования"

    ```yaml
    logging:
      level:
        ru:
          codescoring: info
    ```

### Размер буфера для обработки больших манифестов

!!! example "Пример настройки размера буфера"

    ```yaml
    spring:
      http:
        codecs:
          max-in-memory-size: 50MB (это настройка по умолчанию, уже включенная в приложение, увеличьте ее, если вы столкнулись с очень большими манифестами)
    ```

## Политики повторных попыток и circuit breaker для запросов к платформе:

### Настройка повторных попыток

Эта конфигурация определяет политику повторных попыток для сервиса `codeScoringApi`. Она настроена на обработку временных сбоев путем повторной попытки запроса до 3 раз.

Повторные попытки используют стратегию экспоненциального отступления, начиная с задержки в 1 секунду и удваивая ее с каждой попыткой. Эта политика применяется только к определенным исключениям, таким как `WebClientRequestException`.

### Настройка Circuit Breaker

Circuit breaker (автоматический выключатель) для `codeScoringApi` действует как механизм быстрого отказа. Он отслеживает частоту сбоев и, если она достигает 50% (рассчитывается по последним 20 вызовам), он «открывается» и предотвращает дальнейшие запросы в течение 30 секунд. Это дает нижестоящему сервису время на восстановление. После периода ожидания он переходит в «полуоткрытое» состояние, позволяя пройти 5 пробным вызовам, чтобы определить, восстановился ли сервис.

Конфигурация Retry и Circuit Breaker может быть переопределена путем установки [следующих свойств](https://resilience4j.readme.io/docs/getting-started-3), например, для `codeScoringApi`.

### Добавление truststore сертификатов

!!! example "Пример добавления truststore сертифкатов в application.yml"

```yaml
spring:
  cloud:
    gateway:
      server:
        webflux:
          httpclient:
            ssl:
              trustedX509Certificates:
                - /usr/local/share/ca-certificates/solarrt.crt
                - /etc/ssl/certs/ca-certificates.crt
```

## Конфигурация проксирования и миграция репозиториев пакетных менеджеров

**Кейс использования:** Миграция репозитория `npm` из Artifactory на CS Proxy.

**Исходный файл `.npmrc`:**
```shell
registry=https://artifactory.domain.ru/artifactory/api/npm/npm-remote/
//artifactory.domain.ru/artifactory/api/npm/npm-remote/:_password=1NHTGVrUnJQ
//artifactory.domain.ru/artifactory/api/npm/npm-remote/:username=asdf
//artifactory.domain.ru/artifactory/api/npm/npm-remote/:email=asdf@domain.ru
//artifactory.domain.ru/artifactory/api/npm/npm-remote/:always-auth=true
```

В YAML-конфигурацию сервиса (файл application.yml) в раздел npm необходимо добавить следующее определение репозитория. Для применения изменений требуется перезапуск сервиса.
```yaml
npm:
  enabled: true
  repository:
    - name: arti-npm
      scan-package: true
      scan-manifest: true
      registry: https://artifactory.domain.ru/artifactory/api/npm/npm-remote/
```

Обновленный файл .npmrc:
```shell
registry=https://cs-proxy.domain.ru/arti-npm
//cs-proxy.domain.ru/arti-npm/:_password=1NHTGVrUnJQ
//cs-proxy.domain.ru/arti-npm/:username=asdf
//cs-proxy.domain.ru/arti-npm/:email=asdf@domain.ru
//cs-proxy.domain.ru/arti-npm/:always-auth=true
```
В следующей таблице представлена сводная информация по перенаправлению URL-адресов репозиториев для различных пакетных менеджеров. Параметры аутентификации и другие конфигурации, такие как данные пользователя и пароля, остаются без изменений.

### NuGet

| Источник            | До                                                            | После                                                           | nuget.repository.registry                                   |
|---------------------|---------------------------------------------------------------|-----------------------------------------------------------------|-------------------------------------------------------------|
| Nexus               | `https://nexus.host.ru/repository/nuget.org-proxy/index.json` | `https://cs-proxy.ru/nexus-nuget/nuget-api/index.json`          | `https://nexus.host.ru/repository/nuget.org-proxy`          |
| Artifactory         | `https://jfrog.host.ru/artifactory/api/nuget/v3/nuget-safe`   | `https://cs-proxy.ru/arti-nuget/nuget-api`                      | `https://jfrog.host.ru/artifactory/api/nuget/v3/nuget-safe` |
| Official Repository | `https://api.nuget.org/v3/index.json`                         | `https://cs-proxy.ru/codescoring-nuget/nuget-api/v3/index.json` | `https://api.nuget.org`                                     |

### NPM

| Источник            | До                                                     | После                           | npm.repository.registry                                |
|---------------------|--------------------------------------------------------|---------------------------------|--------------------------------------------------------|
| Nexus               | `https://nexus.host.ru/repository/npm-proxy`           | `https://cs-proxy.ru/nexus-npm` | `https://nexus.host.ru/repository/npm-proxy`           |
| Artifactory         | `https://jfrog.host.ru/artifactory/api/npm/npm-remote` | `https://cs-proxy.ru/jfrog-npm` | `https://jfrog.host.ru/artifactory/api/npm/npm-remote` |
| Official Repository | `https://registry.npmjs.org`                           | `https://cs-proxy.ru/cs-npm`    | `https://registry.npmjs.org`                           |

### Maven

| Источник            | До                                               | После                           | maven.repository.registry                        |
|---------------------|--------------------------------------------------|---------------------------------|--------------------------------------------------|
| Nexus               | `https://nexus.host.ru/repository/maven-remote`  | `https://cs-proxy.ru/nexus-mvn` | `https://nexus.host.ru/repository/maven-remote`  |
| Artifactory         | `https://jfrog.host.ru/artifactory/maven-remote` | `https://cs-proxy.ru/jfrog-npm` | `https://jfrog.host.ru/artifactory/maven-remote` |
| Official Repository | `https://repo.maven.apache.org/maven2`           | `https://cs-proxy.ru/cs-mvn`    | `https://repo.maven.apache.org/maven2`           |

### PyPI

| Источник            | До                                                              | После                                         | pypi.repository.registry                                 |
|---------------------|-----------------------------------------------------------------|-----------------------------------------------|----------------------------------------------------------|
| Nexus               | `https://nexus.host.ru/repository/pip-remote`                   | `https://cs-proxy.ru/nexus-pypi/simple`       | `https://nexus.host.ru/repository/pip-remote`            |
| Artifactory         | `https://jfrog.host.ru/artifactory/api/pypi/pypi-remote/simple` | `https://cs-proxy.ru/jfrog-pypi`              | `https://jfrog.host.ru/artifactory/api/pypi/pypi-remote` |
| Official Repository | `https://pypi.org/simple`                                       | `https://cs-proxy.ru/codescoring-pypi/simple` | `https://pypi.org`                                       |