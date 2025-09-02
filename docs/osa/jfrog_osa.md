---
hide:
  - footer
---
# Плагин для JFrog

## Установка плагина

Плагин **CodeScoring.OSA** поддерживает версии JFrog Artifactory Pro **7.43** и выше.

Плагин поставляется в виде архива со следующей структурой:

```
.
├── CHANGELOG.md
├── codescoring.groovy
├── codescoring.yaml
└── lib
    └── codescoring-plugin-jfrog.jar
```

Для добавления плагина в **JFrog** необходимо:

1. Распаковать полученный архив в директорию `$JFROG_HOME/artifactory/var/etc/artifactory/plugins`.
2. Создать в директории файл для настройки `codescoring.yaml`. Пример содержания находится в поставляемом архиве.
3. Вызвать **API JFrog Pro** для загрузки плагина `POST /api/plugins/reload`:
```curl
curl -X POST https://[JFROG_URL]/artifactory/api/plugins/reload
```

## Проверка установки плагина

Для проверки установки плагина в системе необходимо проверить логи сервиса. При успешной загрузке и инициализации в логах появится сообщение следующего содержания:

```
2023-08-08T09:41:35.105Z [jfrt ] [INFO ] [70be801ff583b741] [r.c.p.codescoring:16          ] [art-init            ] - CodeScoring: Initialization of CodeScoringPlugin completed
```

## Обновление плагина

В случае обновления архива с плагином, для вступления обновлений в силу необходимо использовать следующую команду API:

```curl
curl -X POST https://[JFROG_URL]/artifactory/api/plugins/reload
```

В случае обновления конфигурации плагина в файле `codescoring.yaml`, необходимо использовать следующую команду API:

```curl
curl -X POST https://[JFROG_URL]/api/plugins/execute/codeScoringReload
```

## Настройка плагина

Для настройки плагина используется файл `codescoring.yaml`.

Пример содержания файла:

```
# true/false
disablePlugin: false

codeScoringAPI:
  # The base URL for all CodeSсoring API endpoints.
  # Required.
  # Example: https://host:port or https://host
  url:

  # Your CodeScoring API Token for authentication.
  # Required.
  token:

  # Http client connection pool size to CodeScoring BE service.
  # By default, value is 200 since it correlates with the default artifactory thread pool size for tomcat.
  # If you tuned your instance of the artifactory https://jfrog.com/help/r/how-do-i-tune-artifactory-for-heavy-loads
  # you should scale this value for better performance maximum up to tomcat.connector.maxThreads value.
  connectionPoolSize: 200

  # By default, if CodeScoring API hasn't responded within a duration of 60 seconds, the request will be cancelled.
  # This property lets you customize the timeout duration in seconds.
  timeout: 60

  # If you are using a proxy, you must provide both Hostname/IP and port.
  proxy:
    host:
    port:

# Artifactory's response status code for blocked packages.
blockedBuildResponseCode: 403

# If set to 'false' allows artifact downloads regardless of errors from CodeScoringAPI or plugin
blockOnErrors: true

# If set to 'true', the plugin will scan all supported repositories
# except specified in the "excludeRepositories" section.
scanAllRepositories: false

# Store scan date and blocking reasons in the artifact properties.
storeScanProperties: false

# Default settings for all repositories. Can be overridden by repositories.repo-name settings
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

  # Set to 'true' if you use Docker Access Method 'Sub domain' (repo-name.jfrog.my.domain) or 'Port' (jfrog.my.domain:25000)
  stripRepoNameInDockerImageName: false

  # Artifactory url for CodeScoring to apply policies.
  # Value MUST BE equal to Repository Manager URL in CodeScoring
  # Example: https://jfrog.my.domain
  repositoryManagerUrl:

  # Delete artifact from the repository if it is blocked by the policies
  deleteBlocked: false

# Settings per repository
# Example:
# repositories:
#   docker-remote:
#   docker-local:
#     dockerRegistryUrl: another-jfrog.my.domain
#     skipScanUser: codescoring
#     workMode: spectator
#   pypi-remote:
#     workMode: warmup
repositories:

# List of the excluded repositories. Used, if scanAllRepositories=true
# Example:
# excludeRepositories:
#   - npm-remote
#   - maven-local
excludeRepositories:

# List of repository types to scan. Used, if scanAllRepositories=true
# Supported values are: maven, npm, pypi, nuget, cocoapods, go, gems, debian, yum, alpine, docker, composer, cargo
# Example:
# repositoryTypes:
#   - npm
#   - go
repositoryTypes:
```

### Описание параметров

- **disablePlugin** – отключение плагина;
- **codeScoringAPI** - настройки параметров взаимодействия плагина с инсталляцией CodeScoring;
  - **url** – адрес инсталляции CodeScoring (обязательно указание протокола);
  - **token** – ключ для авторизации вызовов API (*Создается из CodeScoring раздела `Profile -> Home`*);
  - **connectionPoolSize** – размер пула соединений с инсталляцией CodeScoring;
  - **timeout** - время ожидания ответа (в секундах). По умолчанию, если CodeScoring API не отвечает в течение 60 секунд, запрос будет отменен;
  - **proxy** - настройки прокси-сервера;
    - **host** - хост/IP;
    - **port** - порт;
- **blockedBuildResponseCode** – код ошибки, возвращаемый при срабатывании политик безопасности;
- **blockOnErrors** - блокирование загрузки компонентов в случае ошибки при взаимодействии с инсталляцией CodeScoring;
- **scanAllRepositories** - подключение всех поддерживаемых репозиториев за исключением указанных в параметре **excludeRepositories**;
- **storeScanProperties** - сохранение причины блокировки и отметки о времени сканирования в свойства артефакта;
- **defaults** – настройки сканирования по умолчанию для всех подключенных репозиториев;
  - **dockerRegistryUrl** – адрес docker registry;
  - **workMode** – режим работы плагина. Условия каждого режима работы описаны в секции ниже;
  - **skipScanUser** – пользователь, для которого пропускается сканирование компонентов. Необходимо для того, чтобы CodeScoring мог самостоятельно забрать компонент для сканирования;
  - **stripRepoNameInDockerImageName** – убирать название репозитория из имени образа. Используется в подходе Repository Path при работе с docker registry. По умолчанию название репозитория добавляется к имени образа;
  - **repositoryManagerUrl** - URL Artifactory. Тот же URL должен быть указан в CodeScoring для применения политик по репозиториям.
  - **deleteBlocked** - удалять заблокированный политиками артефакт;
- **repositories** – список репозиториев, для которых работает сканирование компонентов. Для каждого репозитория можно отдельно указать параметры, как в параметре **defaults**;
- **excludeRepositories** - список названий репозиториев, исключенных из обработки плагином.

**Важно**: для generic и VCS репозиториев обязательно указать один из следующих типов репозитория в поле [Internal Description](https://www.jfrog.com/confluence/display/JFROG/Repository+Management):

- maven
- npm
- pypi 
- nuget
- cocoapods
- go
- gems

### Настройка режимов работы

Режим работы плагина определяется переменной **workMode** в файле `codescoring.yaml`.

Плагин имеет 6 режимов работы, определяющих строгость проверки компонентов перед загрузкой.

- **off** – сканирование компонентов отключено;
- **warmup** – загрузка данных в кэш CodeScoring без блокировки компонентов;
- **spectator** – загрузка данных в кэш CodeScoring без блокировки компонентов, сохранение результатов запросов компонентов на инсталляции;
- **moderate** – блокировка компонентов, не прошедших проверку политик. Разрешена загрузка непросканированных компонентов;
- **strict** – блокировка компонентов, не прошедших проверку политик. Запрещена загрузка непросканированных компонентов;
- **strict_wait** – блокировка компонентов, не прошедших проверку политик. Ожидание проверки для непросканированных компонентов.

**Важно**: выбранный режим работы будет влиять на **все** репозитории, указанные в переменной `repositories`.

### Настройка логирования

Файл с настройками логирования находится по пути `$JFROG_HOME/artifactory/var/etc/artifactory/logback.xml`.

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
        <charset>UTF-8</charset>
        <pattern>%date{yyyy-MM-dd'T'HH:mm:ss.SSS, UTC+3}Z [%-5p] [%-16X{uber-trace-id}] [%-30.30(%c{3}:%L)] [%-20.20thread] - %m%n</pattern>
    </encoder>
</appender>
<logger name="ru.codescoring" additivity="false">
    <level value="debug" />
    <appender-ref ref="FILE_CODESCORING" />
</logger>
```

## Блокировка компонента

При блокировании загрузки компонента в консоли пользователя отображается одна из следующих причин блокировки:

- **"The download has been blocked in accordance with the policies configured in CodeScoring"** – блокировка компонента согласно настроенным на инсталляции политикам;
- **"The component has not yet been scanned by CodeScoring, it is scheduled to be scanned shortly. The download is blocked according to the plugin settings"** – блокировка непросканированного компонента с последующим запуском сканирования. Используется в режиме `strict`;
- **"The download has been blocked due to the failure of the scan of the component in CodeScoring"** – не удалось просканировать компонент;
- **"The download has been blocked due to the wrong mode of the plugin"** – используется некорректный [режим работы плагина](#_3);
- **"The download has been blocked due to the timeout of the scan of the component in CodeScoring"** – истекло время ожидания сканирования компонента. Используется в режиме `strict_wait`;
- **"The download has been blocked, because registry is not configured in CodeScoring"** – отсутствует соответствующий Registry на инсталляции.

Ответ также содержит ссылку на страницу компонента в CodeScoring с информацией о сработавших политиках безопасности и найденных уязвимостях:

![Component page](/assets/img/osa/component-page.png)

**Важно**: если компонент не содержит версию, то он не отправляется на анализ в CodeScoring и, соответственно, не блокируется плагином.

## Работа с системными пакетами  

### Настройка репозиториев 

Для корректной работы плагина с системными пакетами некоторых экосистем необходимо произвести дополнительные действия. 

#### Настройка репозитория Debian  

Для корректного анализа пакетов необходимо указать название (codename) дистрибутива из удалённого репозитория, например "bullseye" для Debian. Это название вписывается в поле **Internal Description**. Оно используется в PURL (Package URL) для повышения точности анализа пакета.  

Название должно быть в нижнем регистре и без лишних символов.

![Debian repository settings](/assets/img/osa/jfrog_debian_setup.png)  

Список поддерживаемых дистрибутивов Debian:

- **Debian 2.0** – *hamm*  
- **Debian 2.1** – *slink*  
- **Debian 2.2** – *potato*  
- **Debian 3.0** – *woody*  
- **Debian 3.1** – *sarge*  
- **Debian 4** – *etch*  
- **Debian 5** – *lenny*  
- **Debian 6** – *squeeze*  
- **Debian 7** – *wheezy*  
- **Debian 8** – *jessie*  
- **Debian 9** – *stretch*  
- **Debian 10** – *buster*  
- **Debian 11** – *bullseye*  
- **Debian 12** – *bookworm*  
- **Debian 13** – *trixie*  
- **Debian 14** – *forky* 

Список поддерживаемых дистрибутивов Ubuntu:

- **Ubuntu 4.10** – *warty*  
- **Ubuntu 5.04** – *hoary*  
- **Ubuntu 5.10** – *breezy*  
- **Ubuntu 6.06** – *dapper*  
- **Ubuntu 6.10** – *edgy*  
- **Ubuntu 7.04** – *feisty*  
- **Ubuntu 7.10** – *gutsy*  
- **Ubuntu 8.04** – *hardy*  
- **Ubuntu 8.10** – *intrepid*  
- **Ubuntu 9.04** – *jaunty*  
- **Ubuntu 9.10** – *karmic*  
- **Ubuntu 10.04** – *lucid*  
- **Ubuntu 10.10** – *maverick*  
- **Ubuntu 11.04** – *natty*  
- **Ubuntu 11.10** – *oneiric*  
- **Ubuntu 12.04** – *precise*  
- **Ubuntu 12.10** – *quantal*  
- **Ubuntu 13.04** – *raring*  
- **Ubuntu 13.10** – *saucy*  
- **Ubuntu 14.04** – *trusty*  
- **Ubuntu 14.10** – *utopic*  
- **Ubuntu 15.04** – *vivid*  
- **Ubuntu 15.10** – *wily*  
- **Ubuntu 16.04** – *xenial*  
- **Ubuntu 16.10** – *yakkety*  
- **Ubuntu 17.04** – *zesty*  
- **Ubuntu 17.10** – *artful*  
- **Ubuntu 18.04** – *bionic*  
- **Ubuntu 18.10** – *cosmic*  
- **Ubuntu 19.04** – *disco*  
- **Ubuntu 19.10** – *eoan*  
- **Ubuntu 20.04** – *focal*  
- **Ubuntu 20.10** – *groovy*  
- **Ubuntu 21.04** – *hirsute*  
- **Ubuntu 21.10** – *impish*  
- **Ubuntu 22.04** – *jammy*  
- **Ubuntu 22.10** – *kinetic*  
- **Ubuntu 23.04** – *lunar*  
- **Ubuntu 23.10** – *mantic*  
- **Ubuntu 24.04** – *noble*  
- **Ubuntu 24.10** – *oracular*  
- **Ubuntu 25.04** – *plucky* 

### Просмотр информации о пакете Debian  

Плагин извлекает информацию о пакете из нескольких источников. В первую очередь, он получает название пакета, версию и архитектуру из **Properties** артефакта. Если Properties отсутствуют, данные для PURL парсятся из **Repository Path**.  

![Debian package browse](/assets/img/osa/jfrog_debian_browse.png)  

### Просмотр информации о пакете RPM

Для пакетов RPM плагин получает название, версию и архитектуру, анализируя **Repository Path**.  

![RPM package browse](/assets/img/osa/jfrog_rpm_browse.png)
