- [Русский](https://docs.codescoring.ru/osa-proxy/config-maven/index.md)

# Maven сonfiguration

## Repository URL migration

**Use case:** migrating a Maven repository from Artifactory to OSA Proxy.

The following table provides a summary of repository URL redirection for Maven. Authentication parameters and other configurations, such as username and password, remain unchanged.

| Source              | settings.xml URL before migration                | settings.xml URL after migration    | `application.yml` maven.repository.registry      |
| ------------------- | ------------------------------------------------ | ----------------------------------- | ------------------------------------------------ |
| Nexus               | `https://nexus.host.ru/repository/maven-remote`  | `https://{osa-proxy-url}/nexus-mvn` | `https://nexus.host.ru/repository/maven-remote`  |
| Artifactory         | `https://jfrog.host.ru/artifactory/maven-remote` | `https://{osa-proxy-url}/jfrog-mvn` | `https://jfrog.host.ru/artifactory/maven-remote` |
| Official Repository | `https://repo.maven.apache.org/maven2`           | `https://{osa-proxy-url}/inet-mvn`  | `https://repo.maven.apache.org/maven2`           |

## Maven registry migration

**Original `.m2/settings.xml` file:**

```
<settings>
  <mirrors>
    <mirror>
      <id>artifactory</id>
      <mirrorOf>*</mirrorOf>
      <url>https://jfrog.host.ru/artifactory/maven-remote</url>
    </mirror>
  </mirrors>
  <servers>
    <server>
      <id>artifactory</id>
      <username>your-username</username>
      <password>your-password</password>
    </server>
  </servers>
</settings>
```

The following repository definition needs to be added to the service's YAML configuration (the `application.yml` file) under the maven section. A service restart is required to apply the changes.

**Configuration in `application.yml` file**

```
maven:
  enabled: true
  repository:
    - name: jfrog-mvn
      scan-manifest: false
      scan-package: true
      registry: https://jfrog.host.ru/artifactory/maven-remote
```

**Updated `.m2/settings.xml` file:**

```
<settings>
  <mirrors>
    <mirror>
      <id>cs-proxy</id>
      <mirrorOf>*</mirrorOf>
      <url>https://{osa-proxy-url}/jfrog-mvn</url>
    </mirror>
  </mirrors>
  <servers>
    <server>
      <id>cs-proxy</id>
      <username>your-username</username>
      <password>your-password</password>
    </server>
  </servers>
</settings>
```
