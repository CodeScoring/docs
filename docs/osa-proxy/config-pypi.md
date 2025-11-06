---
hide:
  - footer
---

# Конфигурация PyPI

## Миграция URL репозитория

**Сценарий использования:** миграция репозитория PyPI с Artifactory на OSA Proxy.

Следующая таблица содержит сводку по перенаправлению URL репозиториев для PyPI. Параметры аутентификации и другие настройки, такие как имя пользователя и пароль, остаются без изменений.

| Источник                | URL в pip.conf / pip.ini до миграции                            | URL в pip.conf / pip.ini после миграции | `application.yml` pypi.repository.registry               |
|-------------------------|-----------------------------------------------------------------|-----------------------------------------|----------------------------------------------------------|
| Nexus                   | `https://nexus.host.ru/repository/pip-remote/simple`            | `https://{osa-proxy-url}/nexus-pypi/simple` | `https://nexus.host.ru/repository/pip-remote`            |
| Artifactory             | `https://jfrog.host.ru/artifactory/api/pypi/pypi-remote/simple` | `https://{osa-proxy-url}/jfrog-pypi/simple` | `https://jfrog.host.ru/artifactory/api/pypi/pypi-remote` |
| Официальный репозиторий | `https://pypi.org/simple`                                       | `https://{osa-proxy-url}/inet-pypi/simple`  | `https://pypi.org`                                       |

## Миграция PyPI репозитория

**Исходный файл `pip.conf` (Linux/macOS) или `pip.ini` (Windows):**

```ini
[global]
index-url = https://jfrog.host.ru/artifactory/api/pypi/pypi-remote/simple
trusted-host = jfrog.host.ru
```

Или с аутентификацией:

```ini
[global]
index-url = https://username:password@jfrog.host.ru/artifactory/api/pypi/pypi-remote/simple
trusted-host = jfrog.host.ru
```

Следующее определение репозитория необходимо добавить в YAML-конфигурацию сервиса (файл `application.yml`) в секцию pypi. Для применения изменений требуется перезапуск сервиса.

**Конфигурация в файле `application.yml`**

```yaml
pypi:
  enabled: true
  repository:
    - name: jfrog-pypi
      scan-manifest: true
      scan-package: true
      registry: https://jfrog.host.ru/artifactory/api/pypi/pypi-remote
      packages-registry: https://jfrog.host.ru/artifactory/api/pypi/pypi-remote/packages
```

**Обновлённый файл `pip.conf` (Linux/macOS) или `pip.ini` (Windows):**

```ini
[global]
index-url = https://{osa-proxy-url}/jfrog-pypi
trusted-host = {osa-proxy-url}
```

Или с аутентификацией:

```ini
[global]
index-url = https://username:password@{osa-proxy-url}/jfrog-pypi
trusted-host = {osa-proxy-url}
```

### Расположение конфигурационных файлов

- **Linux/macOS**: `~/.config/pip/pip.conf` или `~/.pip/pip.conf`
- **Windows**: `%APPDATA%\pip\pip.ini` или `%HOME%\pip\pip.ini`
- **Для virtualenv**: `$VIRTUAL_ENV/pip.conf`
