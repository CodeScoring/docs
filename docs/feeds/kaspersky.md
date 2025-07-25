---
hide:
  - footer
---

# Использование Kaspersky Open Source Software Threats Data Feed

CodeScoring интегрирует фид [Kaspersky Open Source Software Threats Data Feed](https://www.kaspersky.ru/open-source-feed) (Kaspersky OSSTDF) в модули CodeScoring SCA и CodeScoring OSA, предоставляя доступ к информации об угрозах в обнаруженных open source компонентах. Фид полезен не только как источник данных о новых уязвимостях, но и как инструмент обогащения уже известных записей из других источников.

Фид интегрирован на уровне базы знаний CodeScoring Index, что обеспечивает дедупликацию обнаруженных уязвимостей и единое представление данных для пользователя.

## Проверка подключения

Ключ активации CodeScoring содержит в себе данные о доступности частных фидов.

При успешном подключении Kaspersky OSSTDF, в разделе `Настройки -> Активационный ключ` поле "Частные базы уязвимостей" имеет значение “Kaspersky open source software threats data feed”.

![Kaspersky activation](/assets/img/kaspersky-activation.png)

## Результаты анализа

CodeScoring не только интегрирует фид с точки зрения данных, но и предлагает контекстные расширения функциональности. В частности, с подключением фида в списке уязвимостей и на их страницах появляется поле **Импакт**, на которое можно настроить отдельную политику безопасности. Значение поля обозначает то влияние на систему, которое оказывает угроза.

Например, аббревиатура **RLF** означает Read Local Files – такая уязвимость позволяет получить доступ к чтению файлов на устройстве пользователя. Эта информация помогает понять контекст уязвимости и определить направление потенциальной атаки.

Список возможных значений переменной:

- Исполнение произвольного кода (ACE);
- Инъекция кода (CI);
- Отказ в обслуживании (DoS);
- Утрата целостности (LoI);
- Перезапись произвольных файлов (OAF);
- Получение чувствительной информации (OSI);
- Эскалация привилегий (PE);
- Чтение локальных файлов (RLF);
- Обход безопасности (SB);
- Подмена пользовательского интерфейса (SUI);
- Запись локальных файлов (WLF);
- Межсайтовый скриптинг (XSS/CSS).

В случае скомпрометированных пакетов это поле принимает значение `Other`.

Для пакетов с вредоносным кодом возможны в том числе следующие значения:

- Вредоносное ПО (Malware);
- Cредства взлома (Hacktool).

Более подробно о доступных полях можно прочитать в [документации OSSTDF](https://tip.kaspersky.com/Help/TIDF/ru-RU/FieldStructure.htm).

## Данные об уязвимости

На странице уязвимости, полученной из фида Kaspersky OSSTDF появляется дополнительная информация. В таблице с основными данными содержится поле Kaspersky, по которому можно определить идентификатор уязвимости, и поле **Импакт (Kaspersky)**.

## Настройка политик

Данные из фида можно использовать для создания политик безопасности как для анализа текущей кодовой базы, так и для проверки поступающих компонентов.

Поле Импакт позволяет точно указать те типы уязвимостей, которые требуют внимания. Например, для настройки политики, блокирующей использование компонентов с вредоносным кодом, необходимо составить условие `Импакт (Kaspersky) -> полностью соответствует -> Вредоносное ПО`.
