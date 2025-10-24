---
hide:
  - footer
---

# Поддерживаемые протоколы

Данный раздел содержит форматы данных и правила модификации ответов для каждого поддерживаемого пакетного менеджера в OSA Proxy.

## Maven

### Обрабатываемые файлы

- `maven-metadata.xml` - манифест с информацией о версиях
- `.jar`, `.war`, `.ear` - файлы пакетов

### Модификация полей в maven-metadata.xml

```xml
<metadata>
  <groupId>...</groupId>
  <artifactId>...</artifactId>
  <versioning>
    <latest>обновляется на последнюю незаблокированную</latest>
    <release>обновляется на последнюю незаблокированную</release>
    <versions>
      <version>удаляются заблокированные версии</version>
    </versions>
  </versioning>
</metadata>
```


## NPM

### Обрабатываемые файлы

- JSON манифест пакета (путь `/{repository}/*`)
- `.tgz` - архивы пакетов

### Модификация полей в NPM манифесте

```json
{
  "name": "package-name",
  "dist-tags": {
    "latest": "обновляется на последнюю незаблокированную версию"
  },
  "versions": {
    "1.0.0": "удаляются заблокированные версии"
  },
  "time": {
    "1.0.0": "удаляются записи для заблокированных версий"
  }
}
```

## PyPI

### Обрабатываемые файлы

- HTML страницы Simple API (путь `/{repository}/simple/*`)
- `.zip`, `.tar`, `.tgz`, `.tar.gz`, `.tar.bz2`, `.egg`, `.whl` - файлы пакетов

### Модификация HTML страниц

- Удаляются ссылки для заблокированных версий
- Перезаписываются URL для скачивания через прокси

```html
<!DOCTYPE html>
<html>
  <body>
    <a href="https://files.pythonhosted.org/packages/example-1.0.0.tar.gz">example-1.0.0.tar.gz</a>
    <a href="https://files.pythonhosted.org/packages/example-2.0.0.tar.gz">example-2.0.0.tar.gz</a>
  </body>
</html>
```

## NuGet

### Обрабатываемые файлы

- `index.json` - сервисный индекс
- Registration index JSON
- `.nupkg` - файлы пакетов

### Модификация registration индекса

```json
{
  "version": "3.0.0",
  "items": [
    {
      "@id": "https://api.nuget.org/v3/registration5-gz-semver2/package/index.json",
      "items": [
        {
          "catalogEntry": {
            "id": "Package",
            "version": "1.0.0"
          }
        },
        {
          "catalogEntry": {
            "id": "Package",
            "version": "2.0.0"
          }
        }
      ]
    }
  ]
}
```
## Поведение при полной блокировке пакета

В случае, когда все доступные версии запрашиваемого пакета заблокированы политиками безопасности, OSA Proxy возвращает сообщение о блокировке всех версий.

Поскольку некоторые клиенты пакетных менеджеров могут не отображать это специфическое сообщение о блокировке в пользовательском интерфейсе, рекомендуется использовать утилиту `curl` для прямой диагностики статуса пакета. Ниже представлены примеры запросов с использованием `curl` для проверки статуса блокировки для различных типов пакетов:

### Pip

```bash
curl http://localhost:8080/codescoring-pypi/simple/имя_пакета
```

### Maven
```bash
curl http://localhost:8080/codescoring-maven/groupid/artifactid/maven-metadata.xml
```

npm
```bash
curl http://localhost:8080/codescoring-npm/имя_пакета
```

NuGet
Хотя NuGet-клиент может выводить причину блокировки всех пакетов в консоли, прямой запрос через curl также позволяет получить подтверждение статуса:
```bash
curl http://localhost:8080/codescoring-nuget/nuget-api/v3/registration5-gz-semver2/newtonsoft.json/index.json
```
