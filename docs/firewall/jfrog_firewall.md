---
hide:
  - footer
---
# CodeScoring JFrog Firewall (совместим только с коммерческой версией JFrog Pro)


## Установка плагина

Плагин **CodeScoring JFrog Firewall** поставляется в виде файла с расширением `.groovy`.
Для добавления плагина в **JFrog** необходимо:

1. Скопировать полученный от вендора файл в директорию `$JFROG_HOME/artifactory/var/etc/artifactory/plugins`.
```bash
cp jfrog-codescoring-plugin.groovy $JFROG_HOME/artifactory/var/etc/artifactory/plugins
```
2. Вызвать **API JFrog Pro** для загрузки плагина `POST /api/plugins/reload` например:
```curl
curl -X POST https://jfrog_installation.local/api/plugins/reload
```

## Настройка плагина

Файл с настройками *`codescoring.properties`* необходимо расположить в дректории `$JFROG_HOME/artifactory/var/etc/artifactory/plugins`.

Пример содержания:

```json
token="0d496e5e7153d98fd346d7498cdf2dc61a669086"
codeScoringUrl="https://on-premises.codescoring.ru/"
repoKeys=["pypi-remote", "maven-remote"]
responseStatus=403
```

### Значение параметров
- **token** – ключ для авторизации вызовов API (*Создается из CodeScoring раздела `Profile -> Home`*)
- **codeScoringUrl** – адрес **on-premise** инсталляции **CodeScoring**
- **repoKeys** – массив репозиториев при работе с которыми будет применяться плагин
- **responseStatus** – код ошибки, возвращаемый при срабатывания политик безопасности