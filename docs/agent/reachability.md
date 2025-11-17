---
hide:
  - footer
---

# Анализ достижимости уязвимостей

!!! info "Что такое достижимость"
    Достижимость уязвимости — это проверка того, действительно ли потенциально уязвимый участок кода может быть выполнен при использовании приложения.
    Такой анализ позволяет отфильтровать «шум» и сосредоточиться на реально эксплуатируемых проблемах.

Консольный агент Johnny умеет анализировать уязвимости на достижимость из исходного кода. Для использования данной функции необходимо задать два параметра:

- `cg-path` — путь к графу вызовов формата Svace;
- `cg-lang` — язык программирования, для которого был построен граф вызовов. На данный момент поддерживаются значения `java`, `python` и `go`.

## Построение графа вызовов

### С использованием инструмента Svace

1. Скачать модуль Svace ```https://REGISTRY_USERNAME:REGISTRY_PASSWORD@REGISTRY_URL/#browse/browse:files:codescoring%2Fsvace-callgraph```
2. Получить токен пользователя в CodeScoring (по ссылке`{platform-url}/cabinet/profile`)
3. Запустить Svace на исходном коде проекта. Этот этап лучше делать в рамках или после шага сборки в конвейере.
   1. Инициализация
      ```shell
      svace init
      ```
   2. Контролируемая сборка
      ```shell
      svace build <build command>
      ```
      Пример для проектов на языке Java:
      ```shell
      svace build mvn clean package
      ```
      Пример на языке Go:
      ```shell
      svace build go build -a main.go
      ``` 
      Пример на языке Python:
      ```shell
      svace build --python .
      ```
   3. Анализ результатов и построение графа вызовов
      ```shell
      svace analyze --build-call-graph-only --license-server-url "http(s)://<codescoring_host>" --license-server-token "<токен из п.1>"
      ```
4. В случае успешного выполнения всех шагов в директории проекта появится файл `.svace-dir/analyze-res/call-graph/<project_name>-graph-order.json`, содержащий граф вызовов.
5. Запустить сканирования с помощью Johnny, например:
    ```shell
    johnny-linux-amd64 scan dir . --api_url "http(s)://<codescoring_host>" --api_token "<токен из п.1>"  --cg-path .svace-dir/analyze-res/call-graph/<project_name>-graph-order.json  --cg-lang java
    ```

## Получение результатов

В таблице уязвимостей с найденными достижимыми вызовами будет проставлена отметка в соответствующем столбце:

![Таблица уязвимостей с колонкой Reachable](/assets/img/reachability/json-bug-vulnerabilities-table.png)

В конце будет доступна ещё одна таблица с перечислением деревьев вызовов для уязвимостей:

![Таблица путей достижимости уязвимостей json-bug](/assets/img/reachability/json-bug-paths.png)

Пример для более крупного проекта:

![Таблица путей достижимости уязвимостей dep-track](/assets/img/reachability/dep-track-paths.png)

Если был указан флаг `--save-results`, то результаты достижимости будут в колонке "Достижимо" таблицы уязвимостей:

![Таблица уязвимостей json-bug](/assets/img/reachability/json-bug-ui-reachable-column.png)