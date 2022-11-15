---
hide:
  - footer
---
# Работа системы в Kubernetes

## Установка в Kubernetes

Для работы необходимо скачать и распаковать архив с установочными файлами от вендора.

Создать namespace.

```bash linenums="1"
kubectl create namespace codescoring
```

Создать secret для доступа к приватному реестру Docker-образов системы «CodeScoring», используя адрес (`REGISTRY_URL`), логин (`USERNAME`) и пароль (`PASSWORD`), полученные от вендора.

```bash linenums="2"
kubectl create secret docker-registry cs-registry --docker-server=REGISTRY_URL --docker-username=USERNAME --docker-password=PASSWORD -n codescoring
```


Запустить Redis.

```bash linenums="3"
kubectl apply -f ./redis/redis.yaml -n codescoring
```


Задать пароль для базы в `postgres-secrets.yaml` и запустить PostgreSQL.

**Важно**: все секреты необходимо предварительно закодировать в base64.

```bash linenums="4"
kubectl apply -f ./postgres/postgres-secrets.yaml -n codescoring
kubectl apply -f ./postgres/postgres.yaml -n codescoring
```


Создать необходимые для системы тома.

```bash linenums="6"
kubectl apply -f ./ipcs/ipcs-volumes-claim.yaml -n codescoring
kubectl apply -f ./ipcs/ipcs-volume.yaml -n codescoring
```

Задать в `ipcs-secrets.yaml` необходимые переменные:

- `SECRET_KEY` — секретный ключ для бэкенда приложения, случайная строка символов
- `DATABASE_URL` — строка подключения к PostgreSQL, пароль должен совпадать с заданным в `postgres-secrets.yaml`
- `DJANGO_SUPERUSER_USERNAME` — имя администратора в системе
- `DJANGO_SUPERUSER_PASSWORD` — пароль администратора в системе
- `SENTRY_DSN` — адрес для отправки ошибок в систему сбора логов Sentry, при согласии клиента. Для корректной работы также необходимо задать соответствующие переменные в `ipcs-env.yaml`:
    - `SENTRY_ENABLED=True` — включение механизма отправки ошибок
    - `SENTRY_ENVIRONMENT` — значение будет предоставлено вендором отдельно
    - `SENTRY_RELEASE=develop` — значение будет предоставлено вендором отдельно


**Важно**: все секреты необходимо предварительно закодировать в base64.


Задать в `ipcs-env.yaml` значения `SITE_HOST` и `NGINX_HOST` в соответствие с планируемым именем хоста.


Применить секреты и переменные окружения.

```bash linenums="8"
kubectl apply -f ./ipcs/ipcs-secrets.yaml -n codescoring
kubectl apply -f ./ipcs/ipcs-env.yaml -n codescoring
```


Убедиться, что PostgreSQL запущен и выполнить миграции.

```bash linenums="9"
kubectl apply -f ./ipcs/ipcs-migration.yaml -n codescoring
```


Создать пользователя с правами администратора.

```bash linenums="10"
kubectl apply -f ./ipcs/ipcs-createsuperuser.yaml -n codescoring
```


Запустить бэкенд приложения.

```bash linenums="10"
kubectl apply -f ./ipcs/ipcs-backend.yaml -n codescoring
```


Запустить фронтенд приложения.

```bash linenums="11"
kubectl apply -f ./ipcs/ipcs-frontend.yaml -n codescoring
```


Задать в `ingress/nginx-ingress.yaml` используемое значение хоста (должно совпадать с `SITE_HOST` и `NGINX_HOST` из `ipcs-env.yaml`) и запустить NGINX Ingress.

```bash linenums="12"
kubectl apply -f ./ingress/nginx-ingress.yaml -n codescoring
```

## Обновление в Kubernetes

Выполнить миграции.

```bash linenums="1"
kubectl apply -f ./ipcs/ipcs-migration.yaml -n codescoring
```

Обновить бэкенд приложения.

```bash linenums="2"
kubectl apply -f ./ipcs/ipcs-backend.yaml -n codescoring
```


Обновить фронтенд приложения.

```bash linenums="3"
kubectl apply -f ./ipcs/ipcs-frontend.yaml -n codescoring
```

## Резервное копирование

Задать `nodeSelector` в `ipcs/ipcs-createbackup.yml`, если необходимо задать узел кластера, на котором будет выполняться задание.


Выполнить задачу по резервному копированию.

```bash
kubectl apply -f ./ipcs/ipcs-createbackup.yml -n codescoring
```

Резервная копия будет сохранена на узле кластера в каталог `/cs-storage/ipcs-backup`
