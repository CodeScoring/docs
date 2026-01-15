---
hide:
  - footer
---

# Конфигурация Debian пакетов

## Миграция URL репозитория

**Сценарий использования:** миграция репозиториев Debian с прямых источников на прокси-сервер OSA Proxy.

Следующая таблица содержит сводку по перенаправлению URL репозиториев для Debian. Обратите внимание, что формат строк репозитория `deb` или `deb-src` (дистрибутив, компоненты) остается без изменений, меняется только базовый URL репозитория.

| Источник           | URL в `sources.list` до миграции                   | URL в `sources.list` после миграции    | `application.yml` apt.repository.registry          |
|--------------------|----------------------------------------------------|----------------------------------------|----------------------------------------------------|
| Nexus              | `https://nexus.host.ru/repository/debian-group`    | `https://{osa-proxy-url}/nexus-debian` | `https://nexus.host.ru/repository/debian-group`    |
| Artifactory        | `https://jfrog.host.ru/artifactory/debian-virtual` | `https://{osa-proxy-url}/jfrog-debian` | `https://jfrog.host.ru/artifactory/debian-virtual` |
| Официальный Debian | `https://deb.debian.org/debian/`                   | `https://{osa-proxy-url}/inet-debian`  | `http://deb.debian.org/debian/`                    |

## Миграция APT репозитория

**Исходный файл `/etc/apt/sources.list` или `/etc/apt/sources.list.d/*.list`:**

```shell
Types: deb
URIs: https://deb.debian.org/debian
Suites: noble noble-updates noble-backports
Components: main universe restricted multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

Следующее определение репозитория необходимо добавить в YAML-конфигурацию сервиса (файл `application.yml`) в секцию debian. Для применения изменений требуется перезапуск сервиса.

**Конфигурация в файле `application.yml`**

```yaml
debian:
  enabled: true
  repository:
    - name: debian-apt
      scan-package: true
      distro: bullseye
      registry: http://deb.debian.org/debian/
```

После настройки прокси-сервера и добавления его в application.yml, ваш sources.list будет выглядеть так:

```shell
Types: deb
URIs: https://{osa-proxy-url}/codescoring-debian
Suites: noble noble-updates noble-backports
Components: main universe restricted multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```