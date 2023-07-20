---
hide:
  - footer
---
# Работа системы в Kubernetes

## Установка с помощью Helm-чарта c параметрами по умолчанию

!!! warning

    Данный вариант установки не предоставляет возможность горизонтального масштабирования CodeScoring. 
    Для установки CodeScoring с поддержкой горизонтального масштабирования обратитесь к соответствующему разделу документации ниже.

!!! warning

    Необходимо наличие настроенного default `StorageClass` в кластере. По умолчанию создаются тома **объемом 20 GiB**

Создать namespace.

```
kubectl create namespace codescoring
```

Создать secret для доступа к приватному реестру Docker-образов системы "CodeScoring", используя адрес (`REGISTRY_URL`), логин (`USERNAME`) и пароль (`PASSWORD`), полученные от вендора.

```
kubectl create secret docker-registry cs-registry --docker-server=REGISTRY_URL --docker-username=USERNAME --docker-password=PASSWORD -n codescoring
```

Установить утилиту [Helm](https://helm.sh/docs/intro/install/) предпочтительным способом. 

Выполнить следующие команды:
```
helm repo add codescoring-org https://registry.codescoring.ru/repository/helm/ --username [USERNAME] --password [PASSWORD]
helm repo update
```

Создать файл `values.yaml` со следующим содержимым:
```
ipcs:
  backend:
    config:
      ## ipcs-backend configuration parameters
      siteScheme: http # схема сайта http или https
      siteHost: "codescoring.k8s.local" # домен, по которому будет доступен CodeScoring
      djangoCSRFTrustedOptions: "http://codescoring.k8s.local" # Домен, по которому будет доступен CodeScoring, включая схему
      sentryDSN: "" # адрес для отправки ошибок в систему сбора логов Sentry, при согласии клиента
      sentryEnabled: "False" # включение механизма отправки ошибок
      sentryEnvironment: "" # значение будет предоставлено вендором отдельно
      sentryRelease: "develop" # значение будет предоставлено вендором отдельно
      secretKey: "secret_key2382838183" # секретный ключ для бэкенда приложения, случайная строка символов
      defaultSuperuserUsername: "admin" # имя администратора в системе 
      defaultSuperuserPassword: "changeme" # пароль администратора в системе
      defaultSuperuserEmail: "admin@onprem" # e-mail администратора в системе

  frontend:
    ingress:
      enabled: true
      className: "nginx"
      hosts:
        - host: codescoring.k8s.local # домен, по которому будет доступен CodeScoring
          paths:
            - path: /
              pathType: ImplementationSpecific
```

Выполнить команду
```
helm install codescoring codescoring-org/codescoring -n codescoring -f values.yaml --create-namespace --atomic --version [ВЕРСИЯ_ЧАРТА]
```

## Тонкая настройка параметров Helm-чарта

!!! warning 

    Настоятельно рекомендуется вносить необходимые изменения **до установки CodeScoring**, в противном случае может потребоваться полная переустановка системы. 
    Данные инструкции предполагают, что **специалист имеет опыт работы с кластером Kubernetes и утилитой Helm**.

Для тонкой настройки параметров установки CodeScoring необходимо скачать и распаковать исходный код Helm-чарта командой:
```
helm pull codescoring codescoring-org/codescoring --version [ВЕРСИЯ_ЧАРТА] --untar --untar-dir codescoring-src
```

В файле `values.yaml` можно отредактировать нужные переменные, и после этого, находясь в каталоге с исходным кодом Helm-чарта, выполнить команду `helm install codescoring . -f values.yaml -n codescoring --atomic --version [ВЕРСИЯ_ЧАРТА]`. 

Основные параметры, доступные для изменения, перечислены ниже.

### Подключение к внешним PostgreSQL и Redis
По умолчанию PostgreSQL и Redis запускаются в отдельных `StatefulSet`. Данный вариант может не подходить для использования в **production среде** , т.к. не предоставляет отказоустойчивость. Для подключения к внешним инстансам (кластерам) PostgreSQL и Redis необходимо выполнить следующие действия:

1. Отключить развертывание Redis, присвоив переменной `redis.enabled` значение `false`
2. Отключить развертывание PostgreSQL, присвоив переменной `postgresql.enabled` значение `false`
3. В YAML-секции `ipcs.backend.config.postgresql` задать параметры подключения к PostgreSQL
4. В переменной `ipcs.backend.config.djangoCachesRedisUrls` указать строку подключения для внешнего Redis

### Настройка томов (PV)

По умолчанию чарт создает необходимые тома через [Dynamic Volume Provisioning](https://kubernetes.io/docs/concepts/storage/dynamic-provisioning/) с использованем `StorageClass` по умолчанию (default). В случае, если данный вариант развертывания томов не подходит, присутствует возможность гибко настроить создание томов несколькими способами. 

!!! warning

    Описанные ниже опции являются **взаимоисключающими**. Необходимо выбрать **ТОЛЬКО ОДИН** вариант развертывания для каждого тома. 
    Допускается выбор разных вариантов развертывания для разных томов.

!!! note

    Для изменения размера создаваемых томов (за исключением локальных) измените параметр `size` в соответствующих секциях
 
#### Dynamic Volume Provisiong с использование требуемоего StorageClass

Задать требуемый `StorageClass` можно в следующих переменных:

- `ipcs.persistentVolumes.analysisRoot.storageClass`
- `ipcs.persistentVolumes.djangoStatic.storageClass`
- `ipcs.backup.persistentVolume.storageClass`
- `redis.persistentVolume.storageClass` (если используется встроенный Redis)
- `postgresql.persistentVolume.storageClass` (если используется встроенный PostgreSQL)

В этом случае, будут созданы тома с использованием заданного `StorageClass`

#### PersistentVolumeClam для заранее созданных PersistentVolume

Название предварительно созданных томов можно задать в следующих переменных:

- `ipcs.persistentVolumes.analysisRoot.volumeName`
- `ipcs.persistentVolumes.djangoStatic.volumeName`
- `ipcs.backup.persistentVolume.volumeName`
- `redis.persistentVolume.volumeName` (если используется встроенный Redis)
- `postgresql.persistentVolume.volumeName` (если используется встроенный PostgreSQL)

В этом случае будут созданы только `PersistentVolumeClaim` для томов, заданных в этих переменных

#### Использование предварительно созданных PersistentVolumeClaim

Название предварительно созданных PVC можно задать в следующих переменных:

- `ipcs.persistentVolumes.analysisRoot.existingClaim`
- `ipcs.persistentVolumes.djangoStatic.existingClaim`
- `ipcs.backup.persistentVolume.existingClaim`
- `redis.persistentVolume.existingClaim` (если используется встроенный Redis)
- `postgresql.persistentVolume.exsistingClaim` (если используется встроенный PostgreSQL)

В этом случае указанное название PVC будет подставлено в секцию `volumes` для `Pod` напрямую.

#### Использование локальных томов 

При отсутствии в кластере Kubernetes внешнего хранилища данных возможен запуск CodeScoring с использованием локальных томов. В этом случае данные будут хранится на одной из нод кластера. 

Для создания локальных томов необходимо выполнить следующие действия:

1. Присвоить значение `true` следующим переменным:

- `ipcs.persistentVolumes.analysisRoot.localVolume.enabled`
- `ipcs.persistentVolumes.djangoStatic.localVolume.enabled`
- `ipcs.backup.persistentVolume.localVolume.enabled`
- `redis.persistentVolume.localVolume.enabled` (если используется встроенный Redis)
- `postgresql.persistentVolume.localVolume.enabled` (если используется встроенный PostgreSQL)

2. Задать путь до **каталога на ноде кластера**, в котором будут размещены данные в следующих переменных:

- `ipcs.persistentVolumes.analysisRoot.localVolume.path`
- `ipcs.persistentVolumes.djangoStatic.localVolume.path`
- `ipcs.backup.persistentVolume.localVolume.path`
- `redis.persistentVolume.localVolume.path` (если используется встроенный Redis)
- `postgresql.persistentVolume.localVolume.path` (если используется встроенный PostgreSQL)

3. Указать название ноды, на которой будет создан локальный том в следующих переменных:

- `ipcs.persistentVolumes.analysisRoot.localVolume.nodeHostname`
- `ipcs.persistentVolumes.djangoStatic.localVolume.nodeHostname`
- `ipcs.backup.persistentVolume.localVolume.nodeHostname`
- `redis.persistentVolume.localVolume.nodeHostname` (если используется встроенный Redis)
- `postgresql.persistentVolume.localVolume.nodeHostname` (если используется встроенный PostgreSQL)

Допускается испльзование разных нод для разных томов.

### Горизонтальное масштабирование CodeScoring

!!! warning

    Для горизонтального масштабирования системы CodeScoring необходимо наличие в кластере Kubernetes
    возможности создания томов с типом доступа **ReadWriteMany (RWX)**

Для горизонтальнго масштабирования CodeScoring необходимо создать тома `analysis-root` и `django-static` с типом доступа `ReadWriteMany`. 

Для этого необходимо заменить значение `ReadWriteOnce` на `ReadWriteMany` в переменных:

- `ipcs.persistentVolumes.analysisRoot.accessModes`
- `ipcs.persistentVolumes.djangoStatic.accessModes`

### Использования HorizontalPodAutoscaler

Для использования `HorizontalPodAutoscaler` необходимо настроить параметры в YAML-секциях:

- `ipcs.huey.ipcsQueue.autoscaling`
- `ipcs.huey.highPriorityQueue.autoscaling`

Поробнее о работе `HorizontalPodAutoscaler` можно прочитать в [официальной документации](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)


## Настройка ограничения ресурсов (resource limits)

По умолчанию `requests` и `limits` не заданы. Это сделано для обеспечения возможности запуска системы CodeScoring в кластерах с малым количеством ресурсов (например, minikube) c целью тестирования.
При запуске **production среде** может потребоваться настроить ограничение ресурсов. Это можно сделать, задав следующие переменные:

- `postgresql.resources` (при использовании встроенного PostgreSQL)
- `redis.resources` (при использовании встроенного Redis)
- `ipcs.backend.resources`
- `ipcs.frontend.resources`
- `ipcs.huey.highPriorityQueue.resources`
- `ipcs.huey.ipcsQueue.resources`

Возможно указание как `resources` и `limits` вместе, так и по отдельности, например:

```
ipcs:
  backend:
    resources:
      limits:
        cpu: 1000m
        memory: 2000Mi
  huey:
    ipcsQueue:
      resources:
        limits:
          cpu: 2000m
          memory: 3000Mi
        requests:
          cpu: 1000m
          memory: 1000Mi
```

Ниже приведены примерные значения `limits` в для инсталяций CodeScoring с 8-10 проектами:
```
ipcs:
  backend:
    resources:
      limits:
        cpu: 250m
        memory: 2500Mi
  huey:
    ipcsQueue:
      scheduler:
        resources:
          limits:
            cpu: 500m
            memory: 500Mi
      resources:
        limits:
          cpu: 2250m
          memory: 4000Mi
    highPriorityQueue:
      scheduler:
        resources:
          limits:
            cpu: 500m
            memory: 500Mi
      resources:
        limits:
          cpu: 2250m
          memory: 4000Mi
  frontend:
    resources:
      limits:
        cpu: 250m
        memory: 500Mi
  redis:
    resources:
      limits:
        cpu: 1000m
        memory: 2000Mi
  postgresql:
    resources:
      limits:
        cpu: 1000m
        memory: 2000Mi
```

## Добавление сертификата удостоверяющего центра (CA)

Для доступа CodeScoring к ресурсам с TLS-сертификатами, подписанными корпоративным удостоверяющим центром (CA) необходимо:

1. Присвоить переменной `ipcs.trustedCA.enabled` значение `true`
2. Добавить корневной сертификат удостоверяющего центра (RootCA) в формате PEM в переменную `ipcs.trustedCA.certificates` в формате `ключ: значение`, 
где ключ - имя файла сертификата, включая расширение `.crt`, значение - сертификат в формате PEM.

Например:
```
ipcs:
  trustedCA:
    enabled: true
    certificates:
        ## THIS IS AN EXAMPLE ONE! DO NOT USE IN PRODUCTION!
        my-root-ca.crt: |-
          -----BEGIN CERTIFICATE-----
          MIIDTDCCAjSgAwIBAgIBATANBgkqhkiG9w0BAQUFADA3MQswCQYDVQQGEwJERTEP
          MA0GA1UEChMGZWR1UEtJMRcwFQYDVQQDEw5lZHVQS0kgVGVzdCBDQTAeFw0xMDAz
          MzExMjIwMjRaFw0zMDAzMjYxMjIwMjRaMDcxCzAJBgNVBAYTAkRFMQ8wDQYDVQQK
          EwZlZHVQS0kxFzAVBgNVBAMTDmVkdVBLSSBUZXN0IENBMIIBIjANBgkqhkiG9w0B
          AQEFAAOCAQ8AMIIBCgKCAQEAt5IxCk/NQPOLqeA1lGuB3pvqHGQPxRQ1udYGcXQY
          t7EuSMFymUR9m5TsifG1ktktJTtOWyaWFC4ac0vai49wGVeuDYptfZBoHLIUvCwN
          DOofLYHxk04WzfrtSiUTptn1o6QPOw8YR0XH30MEi1zgD8fLMZmVTJ+XwA5Eus6c
          XtTmI4XhNrHUtvWt4UsNgLmp5/djUgRMpNqxIdrpFQzl+XycRJRAaoAwUzHFl14t
          49qwBhGChxQ8AdDMQGA7kv6VR8o0ktCPv3a4GQbs8+z0cX0w5dC+XhJ1xpqW6TOg
          qAY9XBFIDe5j21hjKmNZ39rsODVGUS2wUtNEhSz+3YqxLwIDAQABo2MwYTAdBgNV
          HQ4EFgQUqHe3saMjZZLan8RlFJs+Xuz4yiAwHwYDVR0jBBgwFoAUqHe3saMjZZLa
          n8RlFJs+Xuz4yiAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMCAQYwDQYJ
          KoZIhvcNAQEFBQADggEBAEjQGyHZQis47c2kf+zXJJoDDlRgFzr9xfcnrHFaJvYx
          nuqNE0T+xmujnwGm3VrgddeAQJuW3sD6y0Ox8NgL4z886VFeaDQ0GmFPI6HEVtg6
          mixMhi+YzdkC+PFrEdYUeVNNwVO+bvJb1Rc08BYU4v7VtTkssHjru76E2/ahn/Ct
          kaVTEojEWeRaxsw5/0VLkgyf8SwDaukM2aamqgEzfsw5GTdSAh7ERZKc+zF7Sr5s
          DY8c5lOmyCwuNh9ODuw4cAThICrn7G8bh8ZyxLyj4Znxh0X45SwMZKTmYLfy9ab8
          b/j7FK8uBNRL+pXl9HGBWAFA01uJw4HkYK+Uo+RcAzo=
          -----END CERTIFICATE-----
``` 
В случае наличия нескольких корневых CA необходимо добавить их в отдельные ключи, например:
```
ipcs:
  trustedCA:
    enabled: true
    certificates:
        my-root-ca.crt: |-
          ...
        my-root-ca-2.crt: |-
          ...
```
