---
hide:
  - footer
---
# CodeScoring Nexus OSA

## Установка плагина

Плагин **CodeScoring Nexus OSA** поставляется в виде JAR-файла и поддерживает следующие версии Sonatype Nexus Repository (NXRM):

- `nexus-codescoring-plugin-{release}.jar` - для Nexus Repository OSS **3.71+** и Nexus Repository Pro версий с **3.33.1-01** по **3.71+** (поддерживает H2 и PostgreSQL);
- `nexus-codescoring-plugin-legacy-{release}.jar` - для Nexus Repository OSS версий с **3.33.1-01** по **3.70.Х** (поддерживает OrientDB).

Для добавления плагина в **NXRM** необходимо:

1. Скопировать полученный от вендора файл `nexus-codescoring-plugin.jar` в директорию `/opt/sonatype/nexus/deploy`:
```bash
cp nexus-codescoring-plugin.jar /opt/sonatype/nexus/deploy/nexus-codescoring-plugin.jar
```
Если **NXRM** запущен в Docker-контейнере:
```bash
docker cp nexus-codescoring-plugin.jar nexus:/opt/sonatype/nexus/deploy/nexus-codescoring-plugin.jar
```
2. Выдать права для пользователя и группы `nexus`:
```bash
chown nexus:nexus /opt/sonatype/nexus/deploy/nexus-codescoring-plugin.jar
```
Если **NXRM** запущен в Docker-контейнере:
```bash
docker exec -it -u 0 nexus chown nexus:nexus /opt/sonatype/nexus/deploy/nexus-codescoring-plugin.jar
```
3. Проверить, что у пользователя есть минимальный набор привилегий для корректной работы с плагином:
```
nx-repository-view-*-*-{read,browse}
```

После выполненных операций, необходимо произвести перезапуск **NXRM**.

## Настройка плагина

Для применения плагина **CodeScoring OSA** в дальнейшей работе, необходимо использовать механизм **Capability**, предоставляемый **NXRM**. **Capability** – это набор API и компонентов UI для встраивания в **NXRM**, позволяющий расширять его функциональность.

Плагин **CodeScoring OSA** предоставляет четыре новые **Capability**:

- **CodeScoring Configuration** — настройка взаимодействия с **on-premise** инсталляцией **CodeScoring**;
- **CodeScoring Scan** — настройка сканирования для отдельно выбранного прокси-репозитория;
- **CodeScoring Docker Repository Scan** – настройка сканирования для отдельно выбранного hosted или proxy docker репозитория;
- **CodeScoring All Repositories Scan** – настройка сканирования для всех репозиториев.

После установки плагина **CodeScoring OSA** в разделе `System -> Capabilities` появится возможность создания **Capability** через элемент (`+ Create capability`) интерфейса.

![CodeScoring capability creation example](/assets/img/osa/capability_create_example.png)

### CodeScoring Configuration

Расширение позволяет задать общие настройки плагина для работы с **on-premise** версией **CodeScoring**:

- **CodeScoring Token** – ключ для авторизации вызовов API (*Создается из CodeScoring раздела `Profile -> Home`*);
- **CodeScoring URL** – адрес **on-premise** инсталляции **CodeScoring**;
- **HttpClient Connection Pool Size** – количество доступных соединений. Параметр позволяет управлять количеством параллельных запросов, чтобы ускорить сканирование;
- **HTTP Proxy Host** – адрес прокси-сервера. Используется в случае, если нет возможности наладить прямое соединение между NXRM и CodeScoring;
- **HTTP Proxy Port** – порт прокси-сервера;
- **Store artifact analysis in the DB to retrieve them via REST** – сохранение результатов сканирования артефакта в базе NXRM с возможностью извлечения из Nexus API;
- **Block downloads in case of plugin or CodeScoring errors** – блокировка загрузки компонента при наличии ошибок от плагина или CodeScoring API.
- **Custom message for blocked packages** – сообщение для пользователя при блокировке компонентов;
- **Nexus URL for identification in CodeScoring** – адрес Nexus Repository Manager с протоколом для отображения результатов на инсталляции.

![CodeScoring capability config settings example](/assets/img/osa/capability_config_settings_example.png)

**Внимание**: указанные настройки будут использовать все экземпляры осуществляющие проверку прокси репозиториев.

### CodeScoring Proxy Repository Scan

Расширение позволяет включить проверку компонентов на выбранный прокси репозиторий со следующими параметрами:

- **Repository** – выбор репозитория, для которого будет применена функция экранирования;
- **Security violation response status** – код ошибки, возвращаемый при срабатывании политик безопасности;
- **Delete blocked by policy component from repository** – принудительное удаление блокируемых компонентов из репозитория (*создание "стерильного" репозитория*);
- **Select capability work mode** – режим работы плагина. 

![CodeScoring capability scan settings example](/assets/img/osa/capability_scan_settings_example.png)

### CodeScoring Docker Repository Scan

Расширение позволяет включить проверку компонентов на выбранный hosted или proxy docker репозиторий со следующими параметрами:

- **Repository** – выбор репозитория, для которого будет применена функция экранирования;
- **Security violation response status** – код ошибки, возвращаемый при срабатывании политик безопасности;
- **This user skips container image scan** – имя пользователя, для которого не применяется сканирование образов. Используется при загрузке и проверке компонентов консольным агентом;
- **Host and port used for CodeScoring to download container image to scan** – адрес (без указания протокола) и порт, через которые будут загружаться образы для сканирования. Используется для связи Nexus с репозиторием через Docker;
- **Block not scanned images** – блокировка загрузки образов, которые не были просканированы;
- **Select capability work mode** – режим работы плагина. Режимы работы описаны в секции ниже;
- **Append repository name to image name for Docker repositories** – добавление названия репозитория в PURL для корректной работы в режиме **RepoPath** (в случае обращения за компонентом через команду `docker pull registry/repository/image_name`).

![CodeScoring capability docker repository example](/assets/img/osa/capability_docker_settings_example.png)

### CodeScoring All Repositories Scan

Расширение позволяет включить проверку компонентов на все репозитории в рамках Sonatype Nexus Repository Manager со следующими параметрами:

- **List of comma separated repositories to ignore** – список репозиториев, которые не будут сканироваться;
- **Security violation response status** – код ошибки, возвращаемый при срабатывании политик безопасности;
- **This user skips container image scan** – имя пользователя, для которого не применяется сканирование образов. Используется при загрузке и проверке компонентов консольным агентом;
- **Host and port used for CodeScoring to download container image to scan** – адрес (без указания протокола) и порт, через которые будут загружаться образы для сканирования. Используется для связи Nexus с репозиторием через Docker;
- **Select capability work mode** – режим работы плагина. Режимы работы описаны в секции ниже;
- **Append repository name to image name for Docker repositories** – добавление названия репозитория в PURL для корректной работы в режиме **RepoPath** (в случае обращения за компонентом через команду `docker pull registry/repository/image_name`).

![CodeScoring capability all repositories scan](/assets/img/osa/capability_all_repositories_settings_example.png)

### Настройка режима работы плагина

Режим работы плагина необходимо определить текстовой строкой в соответствующем поле настроек Capability **CodeScoring Proxy Repository Scan** и Capability **CodeScoring Docker Repository Scan**.

Плагин имеет 5 режимов работы, определяющих строгость проверки компонентов перед загрузкой.

- **warmup** – загрузка данных в кэш CodeScoring без блокировки компонентов;
- **spectator** – загрузка данных в кэш CodeScoring без блокировки компонентов, сохранение результатов запросов компонентов на инсталляции;
- **moderate** – блокировка компонентов, не прошедших проверку политик. Разрешена загрузка непросканированных компонентов;
- **strict** – блокировка компонентов, не прошедших проверку политик. Запрещена загрузка непросканированных компонентов;
- **strict_wait** – блокировка компонентов, не прошедших проверку политик. Ожидание проверки для непросканированных компонентов.

### Настройка логирования

Для настройки логирования событий плагина необходимо зайти в раздел `Support -> Logging` и добавить логгер с названием **ru.codescoring** и уровнем логирования **DEBUG**.

![NXRM logs](/assets/img/osa/nxrm_logs.png)

Результаты логирования событий доступны в разделе `Support -> Logs`.

### Сохранение и извлечение результатов сканирования артефакта

При активации признака **Store artifact analysis in the DB to retrieve them via REST** в конфигурации плагина результаты сканирования артефактов будут сохраняться в базу данных Nexus. Это позволяет получить информацию о том, какие компоненты запрашивались пользователями и какой был статус загрузки данных компонентов.

Извлечь результаты сканирования через Nexus REST API можно с помощью эндпоинта `v1/analysis` с тремя опциональными параметрами:

- **userName** – имя пользователя в Nexus;
- **date** – дата сканирования в формате ГГГГ-ММ-ДД;
- **repositoryName** – название репозитория в Nexus.

Пример запроса с помощью `curl`:

``` bash
curl -X GET https://test.nexus.com/service/rest/v1/analysis?userName=example_user&date=2023-10-19&repositoryName=example_repository
```

Пример ответа с результатом сканирования:
``` bash
[
 {
    "userName": "bobbi",
    "artifactName": "specs",
    "artifactVersion": "4.8",
    "repositoryName": "gems",
    "downloadState": "LOADED",
    "scanDate": "2023-08-12",
    "scanTime": "10:17:59"
 },
 {
    "userName": "bobbi",
    "artifactName": "kmod",
    "artifactVersion": "27-1ubuntu2",
    "repositoryName": "ubuntu",
    "downloadState": "LOADED",
    "scanDate": "2023-08-12",
    "scanTime": "11:52:53"
  },
]
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


## Настройка SSL-соединения

Для настройки SSL-соединения между плагином и инсталляцией необходимо выполнить импорт сертификатов в Java Truststore.

### Определение местоположения установки Java

Чтобы импортировать сертификаты в Java Truststore, сначала необходимо найти установку Java. Это можно сделать одним из следующих способов:

1. **Использование переменной окружения `JAVA_HOME`**:
    ```bash
    echo $JAVA_HOME
    ```

2. **Использование команды `java` с параметром `-XshowSettings:properties`**:
    ```bash
    java -XshowSettings:properties 2>&1 > /dev/null | grep 'java.home'
    ```

3. **Использование команды `readlink` с путем к `java`**:
    ```bash
    readlink -f $(which java)
    ```

Дальнейшие действия подразумевают, что переменная `$JAVA_HOME` установлена.

### Загрузка сертификата

Скачать сертификат можно следующей командой:

```bash
openssl s_client -connect <codescoring.domain.ru>:443 2>/dev/null | openssl x509 > codescoring_ca.pem
```

Убедитесь, что вы заменили `<codescoring.domain.ru>` на соответствующий адрес вашей инсталляции.

### Импорт сертификата

После загрузки сертификата его можно импортировать в Java Truststore с помощью следующей команды:

```bash
keytool -import -alias <mycert> -keystore $JAVA_HOME/lib/security/cacerts -file <codescoring_ca.pem>
```

**Примечания**:
- Замените `<mycert>` на уникальное имя для вашего сертификата.
- Замените `<codescoring_ca.pem>` на фактическое имя вашего файла сертификата.
- Вас могут попросить ввести пароль для Truststore. Стандартный пароль: `changeit`.

### Проверка импорта

Чтобы убедиться, что сертификат был успешно импортирован, используйте команду `keytool` для отображения списка сертификатов в Truststore:

```bash
keytool -list -keystore $JAVA_HOME/lib/security/cacerts
```

**Примечание**:
- Для фильтрации результатов по вашему алиасу сертификата можно использовать команду `grep`:
    ```bash
    keytool -list -keystore $JAVA_HOME/lib/security/cacerts | grep mycert
    ```

## Работа с системными пакетами

## Настройка репозиториев

Для корректной работы Nexus OSA с системными пакетами некоторых экосистем необходимо произвести дополнительные действия.

#### Настройка репозитория Debian

Для корректной работы плагина необходимо указать название (codename) дистрибутива из удалённого репозитория, например "bullseye" для Debian. Это название используется в PURL (Package URL) для повышения точности анализа пакета.

Название должно быть в нижнем регистре и без лишних символов.

![Debian repository settings](/assets/img/osa/nexus_debian_setup.png)

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

Nexus OSA извлекает информацию о пакете из различных источников. В частности, он получает название пакета, версию и архитектуру из поля Summary asset'a. Если Summary отсутствует, данные для PURL парсятся из Path.

![Debian package browse](/assets/img/osa/nexus_debian_browse.png)

### Просмотр информации о пакете RPM

Для пакетов RPM Nexus OSA извлекает данные из атрибутов asset'a. Это включает название пакета, версию и архитектуру.

![RPM package browse](/assets/img/osa/nexus_rpm_browse.png)
