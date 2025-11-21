---
hide:
  - footer
---

# Параметры в URL в формате Base64

В некоторых случаях, запросы к `osa-proxy` требуют указания дополнительных параметров прямо в пути URL. Это достигается путем передачи строки, закодированной в формате Base64 (URL-safe).

## Правило

Закодированная строка параметров в формате Base64 должна быть размещена в пути URL сразу после имени репозитория.

Общая структура URL выглядит следующим образом:
`https://<osaproxy-host>/<repository-name>/<base64-parameters>/<rest-of-path>`

Где:
- `<osaproxy-host>`: Имя хоста экземпляра `osa-proxy`.
- `<repository-name>`: Имя репозитория, к которому осуществляется доступ.
- `<base64-parameters>`: Закодированная в URL-safe Base64 JSON-строка, содержащая параметры.
- `<rest-of-path>`: Оставшаяся часть пути исходного запроса к артефакту.

## Пример

Например, нужно передать следующие параметры в виде JSON-объекта.

```json
{"repoManagerHost":"https://nexus.test.ru","repoName":"npm-proxy"}
```

Для этого следует:

1.  **Преобразовать JSON-объект в строку.**
2.  **Закодировать строку с использованием URL-safe Base64.**

Результат кодирования JSON-объекта выше в Base64:
`eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6Im5wbS1wcm94eSJ9`

## Настройка менеджеров пакетов

Чтобы постоянно использовать URL с параметрами в формате Base64 для всех запросов, необходимо обновить конфигурационный файл вашего менеджера пакетов.

### NPM

Для NPM нужно отредактировать файл `.npmrc` и установить ключ `registry`.

URL должен включать имя репозитория и строку, закодированную в Base64.

```text
registry=https://osaproxy.example.com/npm-proxy/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6Im5wbS1wcm94eSJ9
```

### Maven

Для Maven нужно отредактировать файл `settings.xml`. Вы можете добавить новое `<mirror>` в секцию `<mirrors>`.

Тег `<url>` должен содержать полный URL, включая имя репозитория и строку, закодированную в Base64.

```xml
<settings>
  ...
  <mirrors>
    <mirror>
      <id>osa-proxy-mirror</id>
      <mirrorOf>*</mirrorOf>
      <url>https://osaproxy.example.com/my-maven-repo/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6Im5wbS1wcm94eSJ9/maven2</url>
    </mirror>
  </mirrors>
  ...
</settings>
```

Убедитесь, что значение `<mirrorOf>` соответствует репозиториям, которые вы хотите проксировать.

### Go

Для Go установите переменную окружения `GOPROXY`, чтобы она включала имя репозитория и строку, закодированную в Base64.

```bash
export GOPROXY="https://osaproxy.example.com/go-repo/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6ImdvLXJlcG8ifQ"
```

### Debian

Для Debian нужно отредактировать файл `/etc/apt/sources.list` или файл в `/etc/apt/sources.list.d/`. Обновите поле `URIs`.

```
Types: deb
URIs: https://osaproxy.example.com/debian-repo/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6ImRlYmlhbi1yZXBvIn0=
Suites: stable
Components: main
Signed-By: /path/to/key.gpg
```

### NuGet

Для NuGet отредактируйте файл `NuGet.config` и добавьте новый источник пакетов. Атрибут `value` тега `<add>` должен содержать полный URL.

```xml
<configuration>
  <packageSources>
    <add key="osa-proxy" value="https://osaproxy.example.com/nuget-repo/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6Im51Z2V0LXJlcG8ifQ/index.json" />
  </packageSources>
  ...
</configuration>
```

### PyPI

Для PyPI отредактируйте файл `pip.conf` (Linux/macOS) или `pip.ini` (Windows) и установите `index-url`.

```ini
[global]
index-url = https://osaproxy.example.com/pypi-repo/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6InB5cGktcmVwbyJ9/simple
```

## Передача контекста для корректной работы политик безопасности привязаных к репозиториям Nexus и Artifactory

`Клиент разработчика` -> `Nexus / Artifactory` -> `osa-proxy` -> `Интернет`

Для передачи контекстной информации, включающей хост и имя репозитория вашего менеджера репозиториев, эти данные следует интегрировать в Base64-кодированную строку параметров. Важно строго соблюдать правило, согласно которому данная Base64-строка должна располагаться непосредственно после имени репозитория в URL-адресе.

### Nexus

1.  Перейдите в **Server Administration** -> **Repositories**.
2.  Выберите желаемый тип (например, `maven2 (proxy)`).
3.  В поле **Remote storage** введите URL вашего экземпляра `osa-proxy`, включая имя репозитория и параметры, закодированные в Base64.

Пример для прокси-репозитория Maven:
`https://osaproxy.example.com/internet-maven/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL3JlcG8xLm1hdmVuLm9yZy9tYXZlbjIiLCJyZXBvTmFtZSI6ImludGVybmV0LW1hdmVuIn0`

### Artifactory

1.  Перейдите в **Administration** -> **Repositories** -> **Remote**.
2.  В конфигурации установите поле **URL** на URL `osa-proxy`. Этот URL должен включать имя репозитория и строку, закодированную в Base64.

Пример для удаленного репозитория PyPI:
`https://osaproxy.example.com/internet-pypi/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL3B5cGkub3JnL3NpbXBsZSIsInJlcG9OYW1lIjoiaW50ZXJuZXQtcHlwaSJ9`

