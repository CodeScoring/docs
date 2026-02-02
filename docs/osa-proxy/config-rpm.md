---
hide:
  - footer
---

# Конфигурация RPM пакетов

## Миграция URL репозитория

**Сценарий использования:** миграция репозиториев RPM (YUM/DNF) с прямых источников на прокси-сервер OSA Proxy.

Следующая таблица содержит сводку по перенаправлению URL репозиториев для RPM.

| Источник           | `baseurl` в `.repo` до миграции                    | `baseurl` в `.repo` после миграции     | `application.yml` rpm.repository.registry          |
|--------------------|----------------------------------------------------|----------------------------------------|----------------------------------------------------|
| Nexus              | `https://nexus.host.ru/repository/rpm-proxy`       | `https://{osa-proxy-url}/nexus-rpm`    | `https://nexus.host.ru/repository/rpm-proxy`       |
| Artifactory        | `https://jfrog.host.ru/artifactory/rpm-remote`     | `https://{osa-proxy-url}/jfrog-rpm`    | `https://jfrog.host.ru/artifactory/rpm-remote`     |
| Официальный Mirror | `https://repo.almalinux.org/almalinux`             | `https://{osa-proxy-url}/inet-rpm`     | `https://repo.almalinux.org/almalinux`             |

## Миграция YUM/DNF репозитория

**Исходный файл `/etc/yum.repos.d/almalinux.repo`:**

```ini
[baseos]
name=AlmaLinux $releasever - BaseOS
baseurl=https://repo.almalinux.org/almalinux/$releasever/BaseOS/$basearch/os/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-AlmaLinux-9
```

Следующее определение репозитория необходимо добавить в YAML-конфигурацию сервиса (файл `application.yml`) в секцию rpm. Для применения изменений требуется перезапуск сервиса.

**Конфигурация в файле `application.yml`**

```yaml
rpm:
  enabled: true
  repository:
    - name: codescoring-rpm
      scan-package: true
      registry: https://repo.almalinux.org/almalinux
```

После настройки прокси-сервера и добавления его в application.yml, конфигурация репозитория будет выглядеть так:

```ini
[baseos]
name=AlmaLinux $releasever - BaseOS
baseurl=https://{osa-proxy-url}/codescoring-rpm/$releasever/BaseOS/$basearch/os/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-AlmaLinux-9
```
