---
hide:
  - footer
---

# CodeScoring OSA

## Общее описание

**CodeScoring** реализует модуль OSA через специализированные плагины, которые осуществляют блокировку загрузки нежелательных компонентов в **Sonatype Nexus Repository** и **JFrog Artifactory**.

Плагин встраивается в цепочку обработки *request|response* **Sonatype Nexus Repository** и **JFrog Artifactory**, что обеспечивает блокирование нежелательных компонентов при любой попытке их скачивания, используя командный интерфейс выбранного пакетного менеджера или веб-интерфейс.

**Способы интеграции:**

- [Sonatype Nexus Repository](/osa/nexus_osa) - через плагин для Nexus
- [JFrog Artifactory](/osa/jfrog_osa) - через плагин для Artifactory
- [CodeScoring Proxy](/cs_proxy) - прокси-сервис для прямой работы с репозиториями