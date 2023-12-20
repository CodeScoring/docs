---
hide:
  - footer
---
# CodeScoring JFrog OSA

## Установка плагина

Плагин **CodeScoring JFrog OSA** совместим только с коммерческой версией JFrog Pro и поддерживает версии **7.4.3** и выше.

Плагин поставляется в виде архива со следующей структурой:

```
.
├── CHANGELOG.md
├── codescoring.groovy
├── codescoring.yaml.template
└── lib
    └── codescoring-plugin-jfrog.jar
```

Для добавления плагина в **JFrog** необходимо:

1. Распаковать полученный архив в директорию `$JFROG_HOME/artifactory/var/etc/artifactory/plugins`.
2. Создать в директории файл для настройки `codescoring.yaml`. Пример содержания находится в файле `codescoring.yaml.template`.
3. Вызвать **API JFrog Pro** для загрузки плагина `POST /api/plugins/reload`:
```curl
curl -X POST https://[JFROG_URL]/api/plugins/reload
```

## Проверка установки плагина

Для проверки установки плагина в системе необходимо проверить логи сервиса. При успешной загрузке и инициализации в логах появится сообщение следующего содержания:

```
2023-08-08T09:41:35.105Z [jfrt ] [INFO ] [70be801ff583b741] [r.c.p.codescoring:16          ] [art-init            ] - CodeScoring: Initialization of CodeScoringPlugin completed
```

## Настройка плагина

Для настройки плагина используется файл `codescoring.yaml`.

Пример содержания файла:

```
# true/false
disablePlugin: false

codeScoringAPI:
  # The base URL for all CodeScoring API endpoint.
  # Required field. https://host:port
  url: https://example.com:443

  # Your CodeScoring API Token for authentication.
  # Required.
  token: 0d496e5e7153d98fd346d7498cdf2dc61a669077

  # Http client connection pool size to CodeScoring BE service.
  # By default, value is 200 since it correlates with the default artifactory thread pool size for tomcat.
  # If you tuned yours instance of the artifactory https://jfrog.com/help/r/how-do-i-tune-artifactory-for-heavy-loads
  # you should scale this value for better performance maximum up to tomcat.connector.maxThreads value.
  connectionPoolSize: 200

  # By default, if CodeScoring API hasn't responded within a duration of 60 seconds, the request will be cancelled.
  # This property lets you customize the timeout duration in seconds.
  timeout: 60

  # If you are using a proxy, you must provide both Hostname/IP and port.
  proxy:
    host: 192.168.1.100
    port: 8080

# Artifactory's response status code for blocked packages.
blockedBuildResponseCode: 403

# If set to 'false' allows artifact downloads regardless of errors from CodeScoringAPI or plugin
blockOnErrors: true

# Default settings for all repositories. Can be overridden by repositories.repo-name: settings
defaults:
  dockerRegistryUrl: jfrog.my.domain

  # warmup |  Scan cache warmup without requests monitoring, no blocking
  # spectator | Scan cache warmup with requests monitoring, no blocking
  # moderate | Policy-based blocking using cache results, not scanned component downloads allowed
  # strict | Policy-based blocking using cache results, not scanned component downloads blocked
  # strict_wait | Policy-based blocking, wait until component is scanned
  # default value is strict_wait if not specified in default or repository settings or in case of a typo
  workMode: strict_wait

  # Allows this user to skip scan
  skipScanUser: codescoring

# Settings per repository, you must specify repository name for it to be scanned by plugin.
repositories:
  docker-remote:
  docker-local:
    dockerRegistryUrl: another-jfrog.my.domain
    skipScanUser: codescoring
    workMode: spectator
  pypi-remote:
    workMode: warmup
```

### Значение параметров

- **token** – ключ для авторизации вызовов API (*Создается из CodeScoring раздела `Profile -> Home`*);
- **codeScoringUrl** – адрес **on-premise** инсталляции **CodeScoring**;
- **repoKeys** – массив репозиториев при работе с которыми будет применяться плагин;
- **skipScan** – пропуск сканирования компонентов. По умолчанию значение `false`;
- **responseStatus** – код ошибки, возвращаемый при срабатывании политик безопасности;
- **http.proxyHost** - IP (в случае использования прокси-сервера);
- **http.proxyPort** - порт (в случае использования прокси-сервера);
- **api.timeout** - время ожидания ответа (в миллисекундах). По умолчанию, если CodeScoring API не отвечает в течение 60 секунд, запрос будет отменен.
- **blockDownloads** - блокирование загрузки компонентов. В случае выставления значения `false` компоненты будут загружаться в независимости от наличия ошибок CodeScoring API или плагина;
- **updateArtifactProperties** – обновление информации о компоненте, используя результаты анализа с инсталляции CodeScoring.
- **workMode** – режим работы плагина. Режимы работы описаны в секции ниже.

**Важно**: для generic и VCS репозиториев обязательно указать один из следующих типов репозитория в поле [Internal Description](https://www.jfrog.com/confluence/display/JFROG/Repository+Management):

- maven
- npm
- pypi 
- nuget
- cocoapods
- go
- gems

### Настройка режимов работы

Режим работы плагина определяется переменной **workMode** в файле `codescoring.properties`.

Плагин имеет 6 режимов работы, определяющих строгость проверки компонентов перед загрузкой.

- **off** – сканирование компонентов отключено;
- **warmup** – загрузка данных в кэш CodeScoring без блокировки компонентов;
- **spectator** – загрузка данных в кэш CodeScoring без блокировки компонентов, сохранение результатов запросов компонентов на инсталляции;
- **moderate** – блокировка компонентов, не прошедших проверку политик. Разрешена загрузка непросканированных компонентов;
- **strict** – блокировка компонентов, не прошедших проверку политик. Запрещена загрузка непросканированных компонентов;
- **strict_wait** – блокировка компонентов, не прошедших проверку политик. Ожидание проверки для непросканированных компонентов.

**Важно**: выбранный режим работы будет влиять на **все** репозитории, указанные в переменной `repoKeys`.

### Настройка логирования

Для настроек логирования событий плагина необходимо добавить в файл `logback.xml` следующее содержание:

```
<appender name="FILE_CODESCORING" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <File>${log.dir}/codescoring.log</File>
    <rollingPolicy class="org.jfrog.common.logging.logback.rolling.FixedWindowWithDateRollingPolicy">
        <FileNamePattern>${log.dir.archived}/codescoring.%i.log.gz</FileNamePattern>
    </rollingPolicy>
    <triggeringPolicy class="org.jfrog.common.logging.logback.triggering.SizeAndIntervalTriggeringPolicy">
        <MaxFileSize>25MB</MaxFileSize>
    </triggeringPolicy>
    <encoder>
        <pattern>%date{yyyy-MM-dd'T'HH:mm:ss.SSS, UTC+3}Z [%-5p]
            [%-16X{uber-trace-id}] [%-30.30(%c{3}:%L)] [%-20.20thread] - %m%n</pattern>
    </encoder>
</appender>
<logger name="ru.codescoring" additivity="false">
    <level value="debug" />
    <appender-ref ref="FILE_CODESCORING" />
</logger>
```

## Пример работы плагина

После проверки компонента информация о нем будет отображаться на вкладке **Properties**.

![Jfrog attributes example](/assets/img/osa/jfrog_attributes.png)

Параметры с префиксом **сodescoring** относятся к данным с инсталляции:

- **issue.licenses** - список найденных лицензий;
- **issue.vulnerabilities** - список найденных уязвимостей;
- **release.Date** - дата выхода компонента;
- **authors** - авторы компонента;
- **homepage** - ссылка на домашнюю страницу компонента;
- **indexUrl** - ссылка на страницу компонента в индексе пакетного менеджера.

Загрузка компонентов, не прошедших проверку, блокируется на этапе попадания в прокси-репозиторий. Ответ от плагина в таком случае имеет следующее содержание:

![Jfrog blocked download](/assets/img/osa/jfrog_blocked_download.gif)
