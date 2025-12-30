- [Русский](https://docs.codescoring.ru/osa-proxy/config-npm/index.md)

# NPM Configuration

## Repository URL migration

**Use Case:** Migrating an `npm` repository from Artifactory to OSA Proxy.

The following table provides a summary of repository URL redirection for NPM. Authentication parameters and other configurations, such as username and password, remain unchanged.

| Source              | .npmrc `registry:` Before migration                    | .npmrc `registry:` After migration  | `application.yml` npm.repository.registry              |
| ------------------- | ------------------------------------------------------ | ----------------------------------- | ------------------------------------------------------ |
| Nexus               | `https://nexus.host.ru/repository/npm-proxy`           | `https://{osa-proxy-url}/nexus-npm` | `https://nexus.host.ru/repository/npm-proxy`           |
| Artifactory         | `https://jfrog.host.ru/artifactory/api/npm/npm-remote` | `https://{osa-proxy-url}/jfrog-npm` | `https://jfrog.host.ru/artifactory/api/npm/npm-remote` |
| Official Repository | `https://registry.npmjs.org`                           | `https://{osa-proxy-url}/inet-npm`  | `https://registry.npmjs.org`                           |

## NPM registry migration

**Original `.npmrc` file:**

```
registry=https://artifactory.domain.ru/artifactory/api/npm/npm-remote/
//artifactory.domain.ru/artifactory/api/npm/npm-remote/:_password=1NHTGVrUnJQ
//artifactory.domain.ru/artifactory/api/npm/npm-remote/:username=asdf
//artifactory.domain.ru/artifactory/api/npm/npm-remote/:email=asdf@domain.ru
//artifactory.domain.ru/artifactory/api/npm/npm-remote/:always-auth=true
```

The following repository definition needs to be added to the service's YAML configuration (the application.yml file) under the npm section. A service restart is required to apply the changes.

**Configuration in `application.yml` file**

```
npm:
  enabled: true
  repository:
    - name: arti-npm
      scan-package: true
      scan-manifest: true
      registry: https://artifactory.domain.ru/artifactory/api/npm/npm-remote/
```

**Updated .npmrc file:**

```
registry=https://{osa-proxy-url}/arti-npm
//{osa-proxy-url}/arti-npm/:_password=1NHTGVrUnJQ
//{osa-proxy-url}/arti-npm/:username=asdf
//{osa-proxy-url}/arti-npm/:email=asdf@domain.ru
//{osa-proxy-url}/arti-npm/:always-auth=true
```
