# Установка системы в Kubernetes


Создать namespace.

```
kubectl create namespace codescoring
```

Создать secret для доступа к приватному реестру Docker-образов системы «CodeScoring», используя адрес (`REGISTRY_URL`), логин (`USERNAME`) и пароль (`PASSWORD`), полученные от вендора.

```
kubectl create secret docker-registry cs-registry --docker-server=REGISTRY_URL --docker-username=USERNAME --docker-password=PASSWORD -n codescoring
```


Запустить Redis.

```
kubectl apply -f ./redis/redis.yaml -n codescoring
```


Задать пароль для базы в `postgres-secrets.yaml` и запустить PostgreSQL.

**Важно**: все секреты необходимо предварительно закодировать в base64.

```
kubectl apply -f ./postgres/postgres-secrets.yaml -n codescoring
kubectl apply -f ./postgres/postgres.yaml -n codescoring
```


Создать необходимые для системы тома.

```
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

```
kubectl apply -f ./ipcs/ipcs-secrets.yaml -n codescoring
kubectl apply -f ./ipcs/ipcs-env.yaml -n codescoring
```


Убедиться, что PostgreSQL запущен и выполнить миграции.

```
kubectl apply -f ./ipcs/ipcs-migration.yaml -n codescoring
```


Создать пользователя с правами администратора.

```
kubectl apply -f ./ipcs/ipcs-createsuperuser.yaml -n codescoring
```


Запустить бэкенд приложения.

```
kubectl apply -f ./ipcs/ipcs-backend.yaml -n codescoring
```


Запустить фронтенд приложения.

```
kubectl apply -f ./ipcs/ipcs-frontend.yaml -n codescoring
```


Задать в `ingress/nginx-ingress.yaml` используемое значение хоста (должно совпадать с `SITE_HOST` и `NGINX_HOST` из `ipcs-env.yaml`) и запустить NGINX Ingress.

```
kubectl apply -f ./ingress/nginx-ingress.yaml -n codescoring
```