---
hide:
  - footer
---

# NuGet Configuration

## Repository URL migration

**Use case:** migrating a NuGet repository from Artifactory to OSA Proxy.

The following table provides a summary of repository URL redirection for NuGet. Authentication parameters and other configurations, such as username and password, remain unchanged.

| Source              | NuGet.config URL before migration                             | NuGet.config URL after migration                         | `application.yml` nuget.repository.registry                 |
|---------------------|---------------------------------------------------------------|----------------------------------------------------------|-------------------------------------------------------------|
| Nexus               | `https://nexus.host.ru/repository/nuget.org-proxy/index.json` | `https://{osa-proxy-url}/nexus-nuget/nuget-api/index.json`   | `https://nexus.host.ru/repository/nuget.org-proxy`          |
| Artifactory         | `https://jfrog.host.ru/artifactory/api/nuget/v3/nuget-safe`   | `https://{osa-proxy-url}/arti-nuget/nuget-api`               | `https://jfrog.host.ru/artifactory/api/nuget/v3/nuget-safe` |
| Official Repository | `https://api.nuget.org/v3/index.json`                         | `https://{osa-proxy-url}/inet-nuget/nuget-api/v3/index.json` | `https://api.nuget.org`                                     |

## NuGet registry migration

**Original `NuGet.config` file:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="Artifactory" value="https://jfrog.host.ru/artifactory/api/nuget/v3/nuget-safe" protocolVersion="3"/>
  </packageSources>
  <packageSourceCredentials>
    <Artifactory>
      <add key="Username" value="your-username" />
      <add key="ClearTextPassword" value="your-password" />
    </Artifactory>
  </packageSourceCredentials>
</configuration>
```

The following repository definition needs to be added to the service's YAML configuration (the `application.yml` file) under the nuget section. A service restart is required to apply the changes.

**Configuration in `application.yml` file**

```yaml
nuget:
  enabled: true
  repository:
    - name: arti-nuget
      scan-package: true
      scan-manifest: true
      registry: https://jfrog.host.ru/artifactory/api/nuget/v3/nuget-safe
```

**Updated `NuGet.config` file:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="OSA-Proxy" value="https://{osa-proxy-url}/arti-nuget/nuget-api" protocolVersion="3"/>
  </packageSources>
  <packageSourceCredentials>
    <OSA-Proxy>
      <add key="Username" value="your-username" />
      <add key="ClearTextPassword" value="your-password" />
    </OSA-Proxy>
  </packageSourceCredentials>
</configuration>
```