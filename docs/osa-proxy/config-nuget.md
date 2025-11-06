---
hide:
  - footer
---

# Конфигурация NuGet

## Миграция URL репозитория

**Сценарий использования:** миграция репозитория NuGet с Artifactory на OSA Proxy.

Следующая таблица содержит сводку по перенаправлению URL репозиториев для NuGet. Параметры аутентификации и другие настройки, такие как имя пользователя и пароль, остаются без изменений.

| Источник            | URL в NuGet.config до миграции                                | URL в NuGet.config после миграции                        | `application.yml` nuget.repository.registry                 |
|---------------------|---------------------------------------------------------------|----------------------------------------------------------|-------------------------------------------------------------|
| Nexus               | `https://nexus.host.ru/repository/nuget.org-proxy/index.json` | `https://{osa-proxy-url}/nexus-nuget/nuget-api/index.json`   | `https://nexus.host.ru/repository/nuget.org-proxy`          |
| Artifactory         | `https://jfrog.host.ru/artifactory/api/nuget/v3/nuget-safe`   | `https://{osa-proxy-url}/arti-nuget/nuget-api`               | `https://jfrog.host.ru/artifactory/api/nuget/v3/nuget-safe` |
| Официальный репозиторий | `https://api.nuget.org/v3/index.json`                     | `https://{osa-proxy-url}/inet-nuget/nuget-api/v3/index.json` | `https://api.nuget.org`                                     |

## Миграция NuGet репозитория

**Исходный файл `NuGet.config`:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="Artifactory" value="https://jfrog.host.ru/artifactory/api/nuget/v3/nuget-safe" />
  </packageSources>
  <packageSourceCredentials>
    <Artifactory>
      <add key="Username" value="your-username" />
      <add key="ClearTextPassword" value="your-password" />
    </Artifactory>
  </packageSourceCredentials>
</configuration>
```

Следующее определение репозитория необходимо добавить в YAML-конфигурацию сервиса (файл `application.yml`) в секцию nuget. Для применения изменений требуется перезапуск сервиса.

**Конфигурация в файле `application.yml`**

```yaml
nuget:
  enabled: true
  repository:
    - name: arti-nuget
      scan-package: true
      registry: https://jfrog.host.ru/artifactory/api/nuget/v3/nuget-safe
```

**Обновлённый файл `NuGet.config`:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="OSA-Proxy" value="https://{osa-proxy-url}/arti-nuget/nuget-api" />
  </packageSources>
  <packageSourceCredentials>
    <OSA-Proxy>
      <add key="Username" value="your-username" />
      <add key="ClearTextPassword" value="your-password" />
    </OSA-Proxy>
  </packageSourceCredentials>
</configuration>
```