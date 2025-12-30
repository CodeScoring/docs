---
hide:
  - footer
---

# Плагин для Sfera

## Установка плагина

Плагин поставляется в виде jar файла.

Для установки плагина в **Sfera** необходимо:

1.  Поместить jar-файл плагина и файл конфигурации `codescoring.yaml` в папку `plugins`, находящуюся в рабочей директории PPDL приложения.
2.  (Опционально) Для управления включением/отключением плагинов можно создать в папке `plugins` файлы `enabled.txt` или `disabled.txt`.
    *   В файле должны быть перечислены имена включаемых/отключаемых плагинов.
    *   Логика включения/выключения:
        *   плагин в `disabled.txt` - отключен;
        *   `enabled.txt` не пуст и при этом не содержит плагин - отключен;
        *   в остальных случаях плагин включен.

## Настройка плагина

Для настройки плагина используется файл `codescoring.yaml`.

Пример содержания файла:

```yaml

codeScoringAPI:
  # Базовый URL для всех эндпоинтов CodeScoring API.
  # Обязательный параметр.
  # Пример: https://host:port или https://host
  url:

  # Ваш API токен CodeScoring для аутентификации.
  # Обязательный параметр.
  token:

  # Размер пула соединений HTTP-клиента к сервису CodeScoring BE.
  connectionPoolSize: 50

  # По умолчанию, если CodeScoring API не ответил в течение 60 секунд, запрос будет отменен.
  # Этот параметр позволяет настроить длительность таймаута в секундах.
  timeout: 60

  # Если вы используете прокси, необходимо указать Hostname/IP и порт.
  proxy:
    host:
    port:

# Если установлено значение 'false', разрешает загрузку артефактов независимо от ошибок CodeScoringAPI или плагина
blockOnErrors: true

# Если установлено значение 'true', плагин будет сканировать все поддерживаемые репозитории,
# за исключением указанных в разделе "excludeRepositories".
scanAllRepositories: false

# Настройки по умолчанию для всех репозиториев. Могут быть переопределены в настройках конкретных репозиториев (repositories.repo-name)
defaults:
  dockerRegistryUrl: registry.my.domain

  # warmup | Прогрев кэша сканирования без мониторинга запросов, без блокировки
  # spectator | Прогрев кэша сканирования с мониторингом запросов, без блокировки
  # moderate | Блокировка на основе политик с использованием результатов кэша, разрешена загрузка непросканированных компонентов
  # strict | Блокировка на основе политик с использованием результатов кэша, загрузка непросканированных компонентов заблокирована
  # strict_wait | Блокировка на основе политик, ожидание завершения сканирования компонента
  # значение по умолчанию — strict_wait, если оно не указано в настройках или в случае опечатки
  workMode: strict_wait

  # Позволяет этому пользователю пропускать сканирование
  skipScanUser: codescoring

  # URL менеджера репозиториев для применения политик CodeScoring.
  # Значение ДОЛЖНО быть равно Repository Manager URL в CodeScoring
  # Пример: https://sfera.my.domain
  repositoryManagerUrl:

# Настройки для конкретных репозиториев
# Пример:
# repositories:
#   docker-remote:
#   docker-local:
#     dockerRegistryUrl: another-registry.my.domain
#     skipScanUser: anotheruser
#     workMode: spectator
#   pypi-remote:
#     workMode: warmup
repositories:

# Список исключенных репозиториев. Используется, если scanAllRepositories=true
# Пример:
# excludeRepositories:
#   - npm-remote
#   - maven-local
excludeRepositories:

# Список типов репозиториев для сканирования. Используется, если scanAllRepositories=true
# Поддерживаемые значения: maven, npm, pypi, nuget, go, gems, debian, yum, alpine, docker 
# Пример:
# repositoryTypes:
#   - npm
#   - go
repositoryTypes:
```

### Описание параметров

- **codeScoringAPI** - настройки параметров взаимодействия плагина с платформой CodeScoring;
  - **url** – адрес платформе CodeScoring (обязательно указание протокола);
  - **token** – ключ для авторизации вызовов API (*Создается из CodeScoring раздела `Profile -> Home`*);
  - **connectionPoolSize** – размер пула соединений с платформой CodeScoring;
  - **timeout** - время ожидания ответа (в секундах). По умолчанию, если CodeScoring API не отвечает в течение 60 секунд, запрос будет отменен;
  - **proxy** - настройки прокси-сервера;
    - **host** - хост/IP;
    - **port** - порт;
- **blockOnErrors** - блокирование загрузки компонентов в случае ошибки при взаимодействии с платформой CodeScoring;
- **scanAllRepositories** - подключение всех поддерживаемых репозиториев за исключением указанных в параметре **excludeRepositories**;
- **defaults** – настройки сканирования по умолчанию для всех подключенных репозиториев;
  - **dockerRegistryUrl** – адрес docker registry;
  - **workMode** – режим работы плагина. Условия каждого режима работы описаны в секции ниже;
  - **skipScanUser** – пользователь, для которого пропускается сканирование компонентов. Необходимо для того, чтобы CodeScoring мог самостоятельно забрать компонент для сканирования;
  - **repositoryManagerUrl** - URL Sfera. Тот же URL должен быть указан в CodeScoring для применения политик по репозиториям.
- **repositories** – список репозиториев, для которых работает сканирование компонентов. Для каждого репозитория можно отдельно указать параметры, как в параметре **defaults**;
- **excludeRepositories** - список названий репозиториев, исключенных из обработки плагином.

### Настройка режимов работы {: #work-mode-configuration }

Режим работы плагина определяется переменной **workMode** в файле `codescoring.yaml`.

Плагин имеет 6 режимов работы, определяющих строгость проверки компонентов перед загрузкой.

- **warmup** – загрузка данных в кэш CodeScoring без блокировки компонентов;
- **spectator** – загрузка данных в кэш CodeScoring без блокировки компонентов, сохранение результатов запросов компонентов на платформе;
- **moderate** – блокировка компонентов, не прошедших проверку политик. Разрешена загрузка непросканированных компонентов;
- **strict** – блокировка компонентов, не прошедших проверку политик. Запрещена загрузка непросканированных компонентов;
- **strict_wait** – блокировка компонентов, не прошедших проверку политик. Ожидание проверки для непросканированных компонентов.

**Важно**: выбранный режим работы будет влиять на **все** репозитории, указанные в переменной `repositories`.

## Блокировка компонента

При блокировании загрузки компонента в консоли пользователя отображается одна из следующих причин блокировки:

- **"The download has been blocked in accordance with the policies configured in CodeScoring"** – блокировка компонента согласно настроенным на платформе политикам;
- **"The component has not yet been scanned by CodeScoring, it is scheduled to be scanned shortly. The download is blocked according to the plugin settings"** – блокировка непросканированного компонента с последующим запуском сканирования. Используется в режиме `strict`;
- **"The download has been blocked due to the failure of the scan of the component in CodeScoring"** – не удалось просканировать компонент;
- **"The download has been blocked due to the wrong mode of the plugin"** – используется некорректный [режим работы плагина](#work-mode-configuration);
- **"The download has been blocked due to the timeout of the scan of the component in CodeScoring"** – истекло время ожидания сканирования компонента. Используется в режиме `strict_wait`;
- **"The download has been blocked, because registry is not configured in CodeScoring"** – отсутствует соответствующий Registry в платформе.

Ответ также содержит ссылку на страницу компонента в CodeScoring с информацией о сработавших политиках безопасности и найденных уязвимостях:

![Component page](/assets/img/osa/component-page.png)
