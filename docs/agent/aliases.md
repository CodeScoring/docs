---
hide:
  - footer
---

# Обработка подмены пакетов

В случае [подмены пакетов](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/) в файлах манифестов консольный агент умеет определять данные изменения и работать с ними.

## Примеры подмены пакетов в NPM

### Замена пакета (`имя@версия`)  

**Входные данные**

`package.json`
```json
"resolutions": {
  "@parcel/watcher": "npm:@favware/skip-dependency@latest"
}
```

`yarn.lock`
```yaml
dependencies:
  "@parcel/watcher": "npm:2.1.0"
```

**Итоговое разрешение зависимости**  

```yaml
"@parcel/watcher@npm:@favware/skip-dependency@latest":
  version: 1.2.2
  resolution: "@favware/skip-dependency@npm:1.2.2"
```

- Имя пакета остаётся прежним;
- В данных о пакете отсутствуют ссылки на constraint (constraint указан только в `resolutions` в `package.json`);
- Итоговая версия соответствует версии заменённого пакета;
- Полная информация о результирующем пакете содержится в записи `resolution`.

### Фиксация версии  

**Входные данные** 

`package.json`
```json
"resolutions": {
  "http-signature": "1.3.4"
}
```

`yarn.lock`
```yaml
dependencies:
  http-signature "~1.2.0"
```

**Итоговое разрешение зависимости**

```yaml
http-signature@1.3.4, http-signature@~1.2.0:
  version "1.3.4"
  resolved "https://registry.yarnpkg.com/http-signature/-/http-signature-1.3.4.tgz#a65b41193110b222364e776fd1ac848655a0e2f0"
```

- Имя пакета остаётся прежним;
- В итоговом описании пакета учитываются все constraint из зависимостей других пакетов, включая `1.3.4`, указанную в `package.json`;  
- Полная информация о результирующем пакете содержится в записи `resolved`.  

### Фиксация версии при множественных зависимостях  

**Входные данные** 

`package.json`
```json
"resolutions": {
  "yaml": "2.2.2"
}
```

`yarn.lock`
```yaml
dependencies:
  yaml: ^1.10.0
  yaml: ^2.2.1
  yaml: ^1.7.2
  yaml: ^1.10.2
  yaml: ^2.3.4
  yaml: 2.3.1
  yaml: ^2.1.1
```

**Итоговое разрешение зависимости**

```yaml
"yaml@npm:2.2.2":
  version: 2.2.2
  resolution: "yaml@npm:2.2.2"
```

- Имя пакета остаётся прежним; 
- В итоговом описании пакета отсутствуют constraint из зависимостей других пакетов – учитывается только `resolutions` из `package.json`;
- Полная информация о результирующем пакете содержится в записи `resolution`.  
