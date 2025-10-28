---
hide:
  - footer
---

# Конфигурация Maven

## Миграция URL репозитория
**Сценарий использования:** Миграция репозитория Maven с Artifactory на OSA Proxy.

Следующая таблица содержит сводку по перенаправлению URL репозиториев для Maven. Параметры аутентификации и другие настройки, такие как имя пользователя и пароль, остаются без изменений.

| Источник                | URL в settings.xml До миграции                   | URL в settings.xml После миграции | `application.yml` maven.repository.registry      |
|-------------------------|--------------------------------------------------|-----------------------------------|--------------------------------------------------|
| Nexus                   | `https://nexus.host.ru/repository/maven-remote`  | `https://cs-proxy.ru/nexus-mvn`   | `https://nexus.host.ru/repository/maven-remote`  |
| Artifactory             | `https://jfrog.host.ru/artifactory/maven-remote` | `https://cs-proxy.ru/jfrog-mvn`   | `https://jfrog.host.ru/artifactory/maven-remote` |
| Официальный репозиторий | `https://repo.maven.apache.org/maven2`           | `https://cs-proxy.ru/inet-mvn`    | `https://repo.maven.apache.org/maven2`           |

## Миграция Maven репозитория

**Исходный файл `.m2/settings.xml`:**

```xml
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

Следующее определение репозитория необходимо добавить в YAML-конфигурацию сервиса (файл application.yml) в секцию maven. Для применения изменений требуется перезапуск сервиса.

**Конфигурация в файле `application.yml`**

```yaml
maven:
  enabled: true
  repository:
    - name: jfrog-mvn
      scan-manifest: true
      scan-package: true
      registry: https://jfrog.host.ru/artifactory/maven-remote
```

**Обновлённый файл `.m2/settings.xml`:**

```xml
<settings>
  <mirrors>
    <mirror>
      <id>cs-proxy</id>
      <mirrorOf>*</mirrorOf>
      <url>https://cs-proxy.ru/jfrog-mvn</url>
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
