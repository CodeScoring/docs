---
hide:
  - footer
---

# Конфигурация NPM

## Миграция URL репозитория

**Сценарий использования:** миграция репозитория `npm` с Artifactory на OSA Proxy.

Следующая таблица содержит сводку по перенаправлению URL репозиториев для NPM. Параметры аутентификации и другие настройки, такие как имя пользователя и пароль, остаются без изменений.

| Источник                | .npmrc `registry:` до миграции                         | .npmrc `registry:` после миграции | `application.yml` npm.repository.registry              |
|-------------------------|--------------------------------------------------------|-----------------------------------|--------------------------------------------------------|
| Nexus                   | `https://nexus.host.ru/repository/npm-proxy`           | `https://{osa-proxy-url}/nexus-npm`   | `https://nexus.host.ru/repository/npm-proxy`           |
| Artifactory             | `https://jfrog.host.ru/artifactory/api/npm/npm-remote` | `https://{osa-proxy-url}/jfrog-npm`   | `https://jfrog.host.ru/artifactory/api/npm/npm-remote` |
| Официальный репозиторий | `https://registry.npmjs.org`                           | `https://{osa-proxy-url}/inet-npm`    | `https://registry.npmjs.org`                           |

## Миграция NPM репозитория

**Исходный файл `.npmrc`:**

```textmate
registry=https://artifactory.domain.ru/artifactory/api/npm/npm-remote/
//artifactory.domain.ru/artifactory/api/npm/npm-remote/:_password=1NHTGVrUnJQ
//artifactory.domain.ru/artifactory/api/npm/npm-remote/:username=asdf
//artifactory.domain.ru/artifactory/api/npm/npm-remote/:email=asdf@domain.ru
//artifactory.domain.ru/artifactory/api/npm/npm-remote/:always-auth=true
```

Следующее определение репозитория необходимо добавить в YAML-конфигурацию сервиса (файл `application.yml`) в секцию npm. Для применения изменений требуется перезапуск сервиса.

**Конфигурация в файле `application.yml`**

```yaml
npm:
  enabled: true
  repository:
    - name: arti-npm
      scan-package: true
      scan-manifest: true
      registry: https://artifactory.domain.ru/artifactory/api/npm/npm-remote/
```

**Обновлённый файл .npmrc:**

```textmate
registry=https://{osa-proxy-url}/arti-npm
//{osa-proxy-url}/arti-npm/:_password=1NHTGVrUnJQ
//{osa-proxy-url}/arti-npm/:username=asdf
//{osa-proxy-url}/arti-npm/:email=asdf@domain.ru
//{osa-proxy-url}/arti-npm/:always-auth=true
```
