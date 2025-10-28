---
hide:
  - footer
---

# Конфигурация NPM

## Миграция URL репозитория
**Сценарий использования:** Миграция репозитория `npm` с Artifactory на OSA Proxy.

Следующая таблица содержит сводку по перенаправлению URL репозиториев для NPM. Параметры аутентификации и другие настройки, такие как имя пользователя и пароль, остаются без изменений.

| Источник                | .npmrc `registry:` До миграции                         | .npmrc `registry:` После миграции | `application.yml` npm.repository.registry              |
|-------------------------|--------------------------------------------------------|-----------------------------------|--------------------------------------------------------|
| Nexus                   | `https://nexus.host.ru/repository/npm-proxy`           | `https://cs-proxy.ru/nexus-npm`   | `https://nexus.host.ru/repository/npm-proxy`           |
| Artifactory             | `https://jfrog.host.ru/artifactory/api/npm/npm-remote` | `https://cs-proxy.ru/jfrog-npm`   | `https://jfrog.host.ru/artifactory/api/npm/npm-remote` |
| Официальный репозиторий | `https://registry.npmjs.org`                           | `https://cs-proxy.ru/inet-npm`    | `https://registry.npmjs.org`                           |

## Миграция NPM репозитория

**Исходный файл `.npmrc`:**

```textmate
registry=https://artifactory.domain.ru/artifactory/api/npm/npm-remote/
//artifactory.domain.ru/artifactory/api/npm/npm-remote/:_password=1NHTGVrUnJQ
//artifactory.domain.ru/artifactory/api/npm/npm-remote/:username=asdf
//artifactory.domain.ru/artifactory/api/npm/npm-remote/:email=asdf@domain.ru
//artifactory.domain.ru/artifactory/api/npm/npm-remote/:always-auth=true
```

Следующее определение репозитория необходимо добавить в YAML-конфигурацию сервиса (файл application.yml) в секцию npm. Для применения изменений требуется перезапуск сервиса.

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
registry=https://cs-proxy.domain.ru/arti-npm
//cs-proxy.domain.ru/arti-npm/:_password=1NHTGVrUnJQ
//cs-proxy.domain.ru/arti-npm/:username=asdf
//cs-proxy.domain.ru/arti-npm/:email=asdf@domain.ru
//cs-proxy.domain.ru/arti-npm/:always-auth=true
```
