---
hide:
  - footer
---

# Добавление в Gitflic CI

С помощью консольного агента johnny можно настроить сканирование компонентов в GitFlic CI. Поддерживаются типы раннера GitFlic shell и GitFlic docker.

## Использование агента c типом раннера GitFlic shell

Для использования консольного агента с типом раннера GitFlic Shell необходимо предварительно выполнить следующие действия:

1. Скачать файл командой

    ```bash
    wget -O /usr/local/bin/johnny https://REGISTRY_USERNAME:REGISTRY_PASSWORD@registry-one.codescoring.ru/repository/files/codescoring/johnny-depp/JOHNNY_VERSION/johnny-linux-amd64-JOHNNY_VERSION
    ```
    или
    ```bash
    curl -o /usr/local/bin/johnny https://REGISTRY_USERNAME:REGISTRY_PASSWORD@registry-one.codescoring.ru/repository/files/codescoring/johnny-depp/JOHNNY_VERSION/johnny-linux-amd64-JOHNNY_VERSION
    ```

    `JOHNNY_VERSION` необходимо заменить на версию агента. Список актуальных версий с описанием доступен в разделе [Changelog](/changelog/johnny-changelog). `REGISTRY_USERNAME` и `REGISTRY_PASSWORD` необходимо заменить на логин и пароль, полученные от вендора.

2. Разрешить исполнение файла

  ```bash
  chmod +x /usr/local/bin/johnny
  ```

  Пример вызова бинарного файла агента в `gitflic-ci.yaml`:

  ```yaml
    stages:
      - test

    sca:
      stage: test

    script:
        - >
          johnny
          scan dir
          --api_token $JOHNNY_API_TOKEN
          --api_url $JOHNNY_API_URL
          --ignore .git
          --ignore fixtures
          --ignore parsers
          .

  artifacts:  
    reports:  
    paths:  
    dependency_scanning:  "bom.json"
  ```

  Результатами выполненного сканирования можно управлять на вкладке **Безопасность** в интерфейсе проекта.

## Использование агента с типом раннера GitFlic docker

Для использования консольного агента с типом раннера GitFlic docker необходимо предварительно выполнить следующие действия на машине с агентом:

1. Скачать файл командой

    ```bash
    wget -O /usr/local/bin/johnny https://REGISTRY_USERNAME:REGISTRY_PASSWORD@registry-one.codescoring.ru/repository/files/codescoring/johnny-depp/JOHNNY_VERSION/johnny-linux-amd64-JOHNNY_VERSION
    ```
    или
    ```bash
    curl -o /usr/local/bin/johnny https://REGISTRY_USERNAME:REGISTRY_PASSWORD@registry-one.codescoring.ru/repository/files/codescoring/johnny-depp/JOHNNY_VERSION/johnny-linux-amd64-JOHNNY_VERSION
    ```

    `JOHNNY_VERSION` необходимо заменить на версию агента. Список актуальных версий с описанием доступен в разделе [Changelog](/changelog/johnny-changelog). `REGISTRY_USERNAME` и `REGISTRY_PASSWORD` необходимо заменить на логин и пароль, полученные от вендора.

2. Скопировать агента в контейнер, который планируется использовать в задаче

    ```bash
    docker cp ./johnny CONTAINER:/usr/bin
    ```

3. Разрешить исполнение файла

    ```bash
    docker exec CONTAINER chmod +x /usr/bin/johnny
    ```

4. Сохранить изменения в контейнере

```bash
docker commit <container name><repository>:<tag>
```

**Важно**: при необходимости сохраните контейнер в удаленном репозитории.

Пример вызова бинарного файла агента в `gitflic-ci.yaml`:

```yaml
    stages:
      - test

    sca:
      stage: test 
    image: <repository><tag>  

    script:
        - >
          johnny
          scan dir
          --api_token $JOHNNY_API_TOKEN
          --api_url $JOHNNY_API_URL
          --ignore .git
          --ignore fixtures
          --ignore parsers
          .

  artifacts:  
    reports:  
    paths:  
    dependency_scanning:  "bom.json"
```

Результатами выполненного сканирования можно управлять на вкладке **Безопасность** в интерфейсе проекта.

## Подключение к реестру и проверка образов

Пример выборочной проверки образа с помощью агента в `gitflic-ci.yaml`:

```
image: angelikade/mvn-npm-jdk:codescoring
stage: test-codescoring-image
when: manual
scripts:
  - ls -la
  - |
    /usr/bin/johnny scan image <registry>/<repository>/<imagename>:<tag> \
    --api_token "${CS_TOKEN}" \
    --api_url "${CS_URL}"
```

**Важно**: доступ к файлу `/v2/\_catalog` в GitFlic выключен из соображений безопасности. На текущий момент, рекуррентный проход по всем образам в реестре невозможен.

## Использование политик безопасности при сканировании

1. Настройте [политики](/on-premise/how-to/policies) на инсталляции CodeScoring

2. Запустите конвейер, используя стандартные настройки сканирования

    ```yaml
    stages:
      - test

    sca:
      stage: test

    script:
        - >
          johnny
          scan dir
          --api_token $JOHNNY_API_TOKEN
          --api_url $JOHNNY_API_URL
          --ignore .git
          --ignore fixtures
          --ignore parsers
          .

  artifacts:  
    reports:  
    paths:  
    dependency_scanning:  "bom.json"
    ```

3. При срабатывании политик агент завершит работу с возвратом кода ошибки и раннер GitFlic автоматически остановит конвейер.

**Важно**: на текущий момент в GitFlic не реализован механизм получения артефактов при завершении задачи с ошибкой. Ввиду этого, просмотр отчета по артефакту, вызвавшему остановку конвейера, в веб-интерфейсе GitFlic невозможен.
