---
hide:
  - footer
---
# CodeScoring JFrog Firewall (совместим только с коммерческой версией JFrog Pro)


## Установка плагина

Плагин **CodeScoring JFrog Firewall** поставляется в виде файла с расширением `.groovy`. 
Плагин нужно поместить в директорию `$JFROG_HOME/artifactory/var/etc/artifactory/plugins`, дальнейшие действия зависят от значения параметра `artifactory.plugin.scripts.refreshIntervalSecs` конфигурации **JFrog** `$JFROG_HOME/artifactory/var/etc/artifactory/artifactory.system.properties`. 

В случае если `artifactory.plugin.scripts.refreshIntervalSecs=0`, то загрузка плагина произойдет автоматически, однако для **PROD** конфигруации рекомендуется отключать эту опцию. В таком случае загрузка плагина производится через вызов **API JFrog Pro** `POST /api/plugins/reload` например:

```curl
curl -X POST https://jfrog_installation.local/api/plugins/reload
```

## Настройка плагина

Файл с насторойками *`codescoring.properties`* необходимо расположить в дректории `$JFROG_HOME/artifactory/var/etc/artifactory/plugins`.

Пример содержания:

```json
token="0d496e5e7153d98fd346d7498cdf2dc61a669086"
codeScoringUrl="https://on-premises.codescoring.ru/"
repoKeys=["pypi-remote", "maven-remote"]
fileFormats=["nupkg", "zip", "tar", "tgz", "tar.gz", "tar.bz2", "egg", "whl", "rz", "jar", "war", "ear", "mod", "tar.gz"]
responseStatus=403
```

### Значение параметров
- **token** – ключ для авторизации вызовов API (*Создается из CodeScoring раздела `Profile -> Home`*)
- **codeScoringUrl** – адрес **on-premise** инсталляции **CodeScoring**
- **repoKeys** - массив репозиториев при работе с которыми будет применяться плагин
- **fileFormats** - массив расширений файлов при запросе которых будет применяться плагин
- **responseStatus** - код ошибки, возвращаемый при срабатывания политик безопасности