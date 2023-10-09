---
hide:
  - footer
---
# CodeScoring NXRM Firewall

## Установка плагина

Плагин **CodeScoring NXRM Firewall** поставляется в виде JAR-файла и поддерживает версии Nexus Repository Manager **3.39.0-01** и выше.

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

После выполненных операций, необходимо произвести перезапуск **NXRM**.

## Настройка плагина

Для применения плагина **CodeScoring Firewall** в дальнейшей работе, необходимо использовать механизм **Capability**, предоставляемый **NXRM**. **Capability** – это набор API и компонентов UI для встраивания в **NXRM**, позволяющий расширять его функциональность.

Плагин **CodeScoring Firewall** предоставляет три новые **Capability**:

- **CodeScoring Configuration** — настройка взаимодействия с **on-premise** инсталляцией **CodeScoring**.
- **CodeScoring Scan** — настройка сканирования для отдельно выбранного прокси-репозитория.

После установки плагина **CodeScoring Firewall** в разделе `System -> Capabilities` появится возможность создания **Capability** через элемент (`+ Create capability`) интерфейса.

![CodeScoring capability creation example](/assets/img/firewall/capability_create_example.png)

### Capability CodeScoring Configuration

Расширение позволяет задать общие настройки плагина для работы с **on-premise** версией **CodeScoring**:

- **CodeScoring Token** – ключ для авторизации вызовов API (*Создается из CodeScoring раздела `Profile -> Home`*);
- **CodeScoring URL** – адрес **on-premise** инсталляции **CodeScoring**;
- **HttpClient Connection Pool Size** – количество доступных соединений;
- **HTTP Proxy Host** – адрес прокси-сервера;
- **HTTP Proxy Port** – порт прокси-сервера;
- **Store artifact analysis in the DB to retrieve them via REST** – сохранение результатов загрузки пакета с возможностью извлечения из API;
- **If unset doesn't block builds on plugin or codescoring errors** – блокировка сборки при наличии ошибок от плагина или CodeScoring API.

![CodeScoring capability config settings example](/assets/img/firewall/capability_config_settings_example.png)

**Внимание**: указанные настройки будут использовать все экземпляры осуществляющие проверку прокси репозиториев.

### Capability CodeScoring Scan

Расширение позволяет установить функцию фаерволинга (экранирования) на выбранный прокси репозиторий:

- **Repository** – выбор репозитория, для которого будет применена функция фаерволинга;
- **Security violation response status** – код ошибки, возвращаемый при срабатывания политик безопасности;
- **Run manual scan on save** – запускает принудительное сканирование компонентов относящихся к выбранному прокси репозиторию при нажатии кнопки save;
- **Delete blocked by policy component from repository** – принудительное удаление блокируемых компонентов из репозитория (*создание "стерильного" репозитория*)

![CodeScoring capability scan settings example](/assets/img/firewall/capability_scan_settings_example.png)

### Настройка логирования

Для настройки логирования событий плагина необходимо зайти в раздел `Support -> Logging` и добавить логгер с названием **ru.codescoring** и уровнем логирования **DEBUG**.

![NXRM logs](/assets/img/firewall/nxrm_logs.png)

## Пример работы плагина

После проверки компонента информация о нем будет отображаться в разделе **Attributes**:

![NXRM attributes example](/assets/img/firewall/nxrm_attributes.png)

- **vulnerabilities** - список найденных уязвимостей;
- **licenses** - список найденных лицензий;
- **release date** - дата выхода компонента;
- **index URL** - ссылка на страницу компонента в индексе пакетного менеджера;
- **authors** - авторы компонента;
- **homepage** - ссылка на домашнюю страницу компонента.

Загрузка компонентов, не прошедших проверку, блокируется на этапе попадания в прокси-репозиторий. Ответ от плагина в таком случае имеет следующее содержание:

![Nexus blocked download](/assets/img/firewall/nexus_blocked_download.gif)
