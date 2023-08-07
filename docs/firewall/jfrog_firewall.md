---
hide:
  - footer
---
# CodeScoring JFrog Firewall (совместим только с коммерческой версией JFrog Pro)


## Установка плагина

Плагин **CodeScoring JFrog Firewall** поставляется в виде архива со следующей структурой:


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

## Настройка плагина

Для настройки плагина используется файл `codescoring.properties`.

Пример содержания:

```
token=0d496e5e7153d98fd346d7498cdf2dc61a669086
codeScoringUrl=https://on-premises.codescoring.ru/
repoKeys=["pypi-remote", "maven-remote"]
responseStatus=403
http.proxyHost=192.168.1.100
http.proxyPort=8080
api.timeout=60000
blockDownloads=true
```

### Значение параметров
- **token** – ключ для авторизации вызовов API (*Создается из CodeScoring раздела `Profile -> Home`*);
- **codeScoringUrl** – адрес **on-premise** инсталляции **CodeScoring**;
- **repoKeys** – массив репозиториев при работе с которыми будет применяться плагин;
- **responseStatus** – код ошибки, возвращаемый при срабатывании политик безопасности;
- **http.proxyHost** - IP (в случае использования прокси-сервера);
- **http.proxyPort** - порт (в случае использования прокси-сервера);
- **api.timeout** - время ожидания ответа (в миллисекундах). По умолчанию, если CodeScoring API не отвечает в течение 60 секунд, запрос будет отменен.
- **blockDownloads** - признак блокирования загрузки компонентов. В случае выставления значения `false` компоненты будут загружаться в независимости от наличия ошибок CodeScoring API или плагина.


**Важно**: для generic и VCS репозиториев обязательно указать один из следующих типов репозитория в поле [Internal Description](https://www.jfrog.com/confluence/display/JFROG/Repository+Management):

- maven
- npm
- pypi 
- nuget
- cocoapods
- go
- gems

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