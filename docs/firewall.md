# CodeScoring Firewall плагин для Nexus Repository Manager

**CodeScoring** реализует функцию Firewall через специализированный плагин, который позволяет добавить функциональность экранирования нежелательных компонентов в **Sonatype Nexus Repository Manager (NXRM)**.

*Информация об интеграции с **JFrog Artifactory** доступна по запросу: <hello@codescoring.ru>.*

Плагин встраивается в цепочку вызовов request|response продукта **NXRM**, которая используется в работе сборщиков пакетов maven, npm и других. За счет применения такого механизма возможно обеспечить блокирование нежелательных компонентов не только при попытке первой загрузки в **NXRM**, но и при любой попытке его скачивания: используя командный интерфейс выбранного пакетного менеджера или через веб-интерфейс **NXRM**.

**Внимание**:

- плагин обеспечивает обогащение метаданных компонентов информацией об уязвимостях;
- блокирование компонентов производится в зависимости от политик настроенных в **CodeScoring**;
- если в плагине активирована опция удаления при блокировании, то информация о компонентах полностью удаляется из прокси репозитория;
- если на момент обращения плагина к ядру, **CodeScoring** по каким то причинам будет недоступен, то по умолчанию, плагин будет блокировать все компоненты.

## Установка плагина

Плагин **CodeScoring Firewall** поставляется в виде JAR-файла, для его добавления в NXRM,  необходимо скопировать файл `nexus-codescoring-plugin.jar` в директорию `/opt/sonatype/nexus/deploy` и дать права для пользователя и группы `nexus`:
пример команды: 
```
chown nexus:nexus /opt/sonatype/nexus/deploy/nexus-codescoring-plugin.jar
```

Если **NXRM** используется в Docker, то команды будут выглядеть так:
```
docker cp nexus-codescoring-plugin.jar nexus:/opt/sonatype/nexus/deploy/nexus-codescoring-plugin.jar
docker exec -it -u 0 nexus chown nexus:nexus /opt/sonatype/nexus/deploy/nexus-codescoring-plugin.jar
```

После выполненных операций, необходимо произвести перезапуск **NXRM**.

## Настройка плагина

Для применения плагина **CodeScoring Firewall** в дальнейшей работе, необходимо использовать механизм **Capability** предоставляемый **NXRM**. 
**Capability** это набор API и компонентов UI для встраивания в **NXRM**, позволяющий расширять его функциональность.

Плагин **CodeScoring Firewall** предоставляет две новые **Capability**:

- **CodeScoring Configuration** — настройка взаимодействия с **on-premise** инсталляцией **CodeScoring**.
- **CodeScoring Scan** — настройка сканирования для отдельно выбранного прокси-репозитория.

После установки плагина **CodeScoring Firewall** в разделе `System -> Capabilities` появится возможность создания **Capability** через элемент (`+ Create capability`) интерфейса.

![CodeScoring capability creation example](/assets/img/firewall/capability_create_example.png)

## Настрока Capability CodeScoring Configuration

Расширение позволяет задать общие настройки плагина для работы с **on-premise** версией **CodeScoring**:

- **CodeScoring Token** – ключ для авторизации вызовов API (*Создается из CodeScoring раздела `Profile -> Home`*);
- **CodeScoring URL** – адрес **on-premise** инсталляции **CodeScoring**.

![CodeScoring capability config settings example](/assets/img/firewall/capability_config_settings_example.png)

**Внимание**: указанные настройки будут использовать все экземпляры осуществляющие проверку прокси репозиториев.

## Настрока Capability CodeScoring Scan

Расширение позволяет установить функцию фаерволинга (экранирования) на выбранный прокси репозиторий:

- **Repository** – выбор репозитория, для которого будет применена функция фаерволинга;
- **Security violation response status** – код ошибки, возвращаемый при срабатывания политик безопасности;
- **Run manual scan on save** – запускает принудительное сканирование компонентов относящихся к выбранному прокси репозиторию при нажатии кнопки save;
- **Delete blocked by policy component from repository** – принудительное удаление блокируемых компонентов из репозитория (*создание "стерильного" репозитория*)

![CodeScoring capability scan settings example](/assets/img/firewall/capability_scan_settings_example.png)

## Настройка политик для работы с плагином

В качестве источника информации для принятия решения о блокировании или разрешении загрузки компонентов плагин использует механизм политик **CodeScoring**.
Для того чтобы политика применялась при вызове от плагина необходимо произвести дополнительные настройки выбранной политики в разделе *Policies*:

 - **Stages** - необходимо дополнительно указать компонент *proxy*;
 - установить флаг *Blocks build*;
 - установить флаг *Is Active*

![Policy settings example](/assets/img/firewall/policy_settings_example.png)
