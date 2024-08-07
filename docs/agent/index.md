---
hide:
  - footer
---

# Работа с консольным агентом

Консольный агент **Johnny** предоставляется совместно с on-premise версией CodeScoring. 

Агент — это исполняемый бинарный файл, осуществляющий разбор манифестов известных пакетных менеджеров, сканирование Docker-образов и поиск прямых включений Open Source библиотек по хэшам. Агент может работать как независимо от инсталляции, так и в паре с ней, получая данные о настроенных политиках и сохраняя результаты сканирования в существующие проекты.

По умолчанию предоставляется сборка агента для Linux-совместимых систем. По запросу доступны сборки под Windows и MacOS.

## Принцип работы

При работе в режиме сканирования директорий с исходным кодом, агент рекурсивно `обходит` директорию, указанную в параметрах запуска, и осуществляет поиск и разбор манифестов [известных пакетных менеджеров](/supported-package-managers).

В режиме [сканирования образов](/agent/scan-docker) агент исследует файловую систему указанного образа, производя инвентаризацию компонентного состава.

По окончанию работы формируется **SBOM** файл, и в консоль выводится информация о найденных уязвимостях и сработавших политиках.

Пример вывода найденных уязвимостей:

![Johnny example with vulnerabilities](/assets/img/johnny_output_vulnerabilities.png)

Пример вывода сработавших политик:

![Johnny example with policy alerts](/assets/img/johnny_output_alerts.png)