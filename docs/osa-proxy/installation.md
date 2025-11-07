---
hide:
  - footer
---

# Развертывание

После настройки файла `application.yml` приложение может быть либо развернуто и выполнено в среде контейнера Docker, либо оркестрировано с помощью Helm-чарта в Kubernetes.

## Развертывание в контейнере Docker

Чтобы запустить приложение как контейнер Docker, выполните следующую команду:

``` bash
docker run -d \
-p 8080:8080 \
-e SPRING_CONFIG_ADDITIONAL_LOCATION=file:/app/config/ \
-v /path/to/your/config/application.yml:/app/config/application.yml \
--name cs-proxy \
<registry-address>/cs-proxy:<tag>
```

## Развертывание в Kubernetes (Helm Chart)

Для сред Kubernetes приложение может быть развернуто с использованием предоставленного Helm-чарта, доступного по адресу `https://{REGISTRY_URL}/repository/helm`.

**Порядок установки:**

1. Создать namespace.

    ```
    kubectl create namespace cs-proxy
    ```

2. Создать secret для доступа к приватному реестру Docker-образов, используя адрес (`REGISTRY_URL`), логин (`USERNAME`) и пароль (`PASSWORD`), полученные от вендора.

    ```
    kubectl create secret docker-registry codescoring-regcred --docker-server=REGISTRY_URL --docker-username=USERNAME --docker-password=PASSWORD -n cs-proxy
    ```

3. Установить [Helm](https://helm.sh/docs/intro/install/) предпочтительным способом.
4. Выполнить следующие команды для добавления актуального Helm-репозитория на локальную машину:

    ```
    helm repo add codescoring-org https://{REGISTRY_URL}/repository/helm/ --username USERNAME --password PASSWORD
    helm repo update
    ```

5. Создать файл `values.yaml` со следующим содержимым:

    ```
    config: |
      # Данное поле необходимо заполнить текстом конфигурационного файла application.yml

    # Существует возможность создания ресурса Ingress
    ingress:
      enabled: true
      className: ""
      annotations: {}
      hosts:
        - host: cs-proxy.example.com
          paths:
            - path: /
              pathType: Prefix
              backend:
                service:
                  name: cs-proxy
                  port:
                    number: 8080
      tls:
        - secretName: cs-proxy-tls
          hosts:
            - cs-proxy.example.com
    ```

6. Выполнить команду для установки чарта
    ```
    helm install cs-proxy codescoring-org/cs-proxy -n cs-proxy -f values.yaml --create-namespace --atomic --version CHART_VERSION
    ```
