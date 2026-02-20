- [English](https://docs.codescoring.ru/osa-proxy/config-apk.en/index.md)

# Конфигурация Alpine пакетов

## Миграция URL репозитория

**Сценарий использования:** миграция репозиториев Alpine с прямых источников на прокси-сервер OSA Proxy.

Следующая таблица содержит сводку по перенаправлению URL репозиториев для Alpine.

| Источник           | URL в `repositories` до миграции                  | URL в `repositories` после миграции    | `application.yml` alpine.repository.registry      |
| ------------------ | ------------------------------------------------- | -------------------------------------- | ------------------------------------------------- |
| Nexus              | `https://nexus.host.ru/repository/alpine-proxy`   | `https://{osa-proxy-url}/nexus-alpine` | `https://nexus.host.ru/repository/alpine-proxy`   |
| Artifactory        | `https://jfrog.host.ru/artifactory/alpine-remote` | `https://{osa-proxy-url}/jfrog-alpine` | `https://jfrog.host.ru/artifactory/alpine-remote` |
| Официальный Alpine | `https://dl-cdn.alpinelinux.org/alpine`           | `https://{osa-proxy-url}/inet-alpine`  | `https://dl-cdn.alpinelinux.org/alpine`           |

## Миграция APK репозитория

**Исходный файл `/etc/apk/repositories`:**

```
https://dl-cdn.alpinelinux.org/alpine
```

Следующее определение репозитория необходимо добавить в YAML-конфигурацию сервиса (файл `application.yml`) в секцию alpine. Для применения изменений требуется перезапуск сервиса.

**Конфигурация в файле `application.yml`**

```
alpine:
  enabled: true
  repository:
    - name: codescoring-alpine
      scan-package: true
      registry: https://dl-cdn.alpinelinux.org/alpine
```

После настройки прокси-сервера и добавления его в application.yml, ваш файл репозиториев будет выглядеть так:

```
https://{osa-proxy-url}/codescoring-alpine
```
