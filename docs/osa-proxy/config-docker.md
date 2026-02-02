---
hide:
  - footer
---

# Конфигурация Docker Registry

## Миграция URL реестра

**Сценарий использования:** миграция Docker реестров с прямых источников на прокси-сервер OSA Proxy.

Следующая таблица содержит сводку по перенаправлению URL для Docker.

| Источник           | URL до миграции                                    | URL после миграции                     | `application.yml` docker.repository.registry       |
|--------------------|----------------------------------------------------|----------------------------------------|----------------------------------------------------|
| Nexus              | `nexus.host.ru:5000`                               | `{osa-proxy-url}/nexus-docker`         | `https://nexus.host.ru:5000`                       |
| Artifactory        | `jfrog.host.ru/docker-remote`                      | `{osa-proxy-url}/jfrog-docker`         | `https://jfrog.host.ru/docker-remote`              |
| Docker Hub         | `registry.hub.docker.com`                          | `{osa-proxy-url}/codescoring-docker`   | `https://registry-1.docker.io`                  |

## Миграция Docker клиента

Следующее определение репозитория необходимо добавить в YAML-конфигурацию сервиса (файл `application.yml`) в секцию docker. Для применения изменений требуется перезапуск сервиса.

**Конфигурация в файле `application.yml`**

```yaml
docker:
  enabled: true
  repository:
    - name: codescoring-docker
      scan-package: true
      registry: https://jfrog.host.ru/docker-remote 
```

После настройки прокси-сервера и добавления его в application.yml, команда для загрузки образа будет выглядеть так:

```bash
docker pull {osa-proxy-url}/codescoring-docker/library/alpine:latest
```

## Использование поддоменов для доступа

При использовании более одного Docker-репозитория необходимо включить поддержку поддоменов. Имена поддоменов должны соответствовать именам репозиториев из конфигурации `docker.repository`.

В этом случае команда для загрузки образа будет выглядеть так:
```bash
docker pull codescoring-docker.osaproxyhost.ru/library/postgres
```

Если настроен только один репозиторий, использование поддоменов не требуется — Docker-реестр будет доступен напрямую через хост OSA Proxy:
```bash
docker pull osaproxyhost.ru/library/postgres
```
