---
hide:
  - footer
---
# CodeScoring JFrog Firewall

## Установка плагина

Плагин **CodeScoring JFrog Firewall** совместим только с коммерческой версией JFrog Pro и поддерживает версии **7.4.3** и выше.

Плагин поставляется в виде архива со следующей структурой:

```
.
├── CHANGELOG.md
├── codescoring.groovy
├── codescoring.properties.template
└── lib
    └── codescoring-plugin-jfrog.jar
```

Для добавления плагина в **JFrog** необходимо:

1. Распаковать полученный архив в директорию `$JFROG_HOME/artifactory/var/etc/artifactory/plugins`.
2. Создать в директории файл для настройки `codescoring.properties`. Пример содержания находится в файле `codescoring.properties.template`.
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

Для настройки плагина используется файл `codescoring.properties`.

Пример содержания:

```
token=0d496e5e7153d98fd346d7498cdf2dc61a669086
codeScoringUrl=https://on-premises.codescoring.ru/
repoKeys=pypi-remote,maven-remote
skipScan=false
responseStatus=403
http.proxyHost=192.168.1.100
http.proxyPort=8080
api.timeout=60000
blockDownloads=true
updateArtifactProperties=true
workMode=moderate
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
- **updateArtifactProperties** – обновление информации о компоненте, используя результаты анализа с инсталляции CodeScoring. Необходимо выставить значение `false` при наличии ошибки "Could not acquire lock".
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

Плагин имеет 5 режимов работы, определяющих строгость проверки компонентов перед загрузкой.

- **off** – сканирование компонентов отключено;
- **warmup** – загрузка данных в кэш CodeScoring без блокировки компонентов;
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

![Jfrog attributes example](/assets/img/firewall/jfrog_attributes.png)

Параметры с префиксом **сodescoring** относятся к данным с инсталляции:

- **issue.licenses** - список найденных лицензий;
- **issue.vulnerabilities** - список найденных уязвимостей;
- **release.Date** - дата выхода компонента;
- **authors** - авторы компонента;
- **homepage** - ссылка на домашнюю страницу компонента;
- **indexUrl** - ссылка на страницу компонента в индексе пакетного менеджера.

Загрузка компонентов, не прошедших проверку, блокируется на этапе попадания в прокси-репозиторий. Ответ от плагина в таком случае имеет следующее содержание:

![Jfrog blocked download](/assets/img/firewall/jfrog_blocked_download.gif)
