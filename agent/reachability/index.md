- [English](https://docs.codescoring.ru/agent/reachability.en/index.md)

# Анализ достижимости уязвимостей

Что такое достижимость

Достижимость уязвимости — это проверка того, действительно ли потенциально уязвимый участок кода может быть выполнен при использовании приложения. Такой анализ позволяет отфильтровать «шум» и сосредоточиться на реально эксплуатируемых проблемах.

Консольный агент Johnny умеет анализировать уязвимости на достижимость из исходного кода. Для использования данной функции необходимо задать два параметра:

- `cg-path` — путь к графу вызовов формата Svace;
- `cg-lang` — язык программирования, для которого был построен граф вызовов. На данный момент поддерживаются значения `java`, `python`, `go` и `kotlin`.

## Построение графа вызовов

### С использованием инструмента Svace

1. Скачать модуль Svace `https://REGISTRY_USERNAME:REGISTRY_PASSWORD@REGISTRY_URL/#browse/browse:files:codescoring%2Fsvace-callgraph`

1. Получить токен пользователя в CodeScoring (по ссылке`{platform-url}/cabinet/profile`)

1. Запустить Svace на исходном коде проекта. Этот этап лучше делать в рамках или после шага сборки в конвейере.

1. Инициализация

   ```
   svace init
   ```

1. Контролируемая сборка

   ```
   svace build <build command>
   ```

   Пример для проектов на языке Java:

   ```
   svace build mvn clean package
   ```

   Пример на языке Go:

   ```
   svace build go build -a main.go
   ```

   Пример на языке Python:

   ```
   svace build --python .
   ```

   Пример на языке Kotlin:

   ```
   svace build ./gradlew clean build
   ```

1. Анализ результатов и построение графа вызовов

   ```
   svace analyze --build-call-graph-only --license-server-url "http(s)://<codescoring_host>" --license-server-token "<токен из п.1>"
   ```

1. В случае успешного выполнения всех шагов в директории проекта появится файл `.svace-dir/analyze-res/call-graph/<project_name>-graph-order.json`, содержащий граф вызовов.

1. Запустить сканирования с помощью Johnny, например:

   ```
   johnny-linux-amd64 scan dir . --api_url "http(s)://<codescoring_host>" --api_token "<токен из п.1>"  --cg-path .svace-dir/analyze-res/call-graph/<project_name>-graph-order.json  --cg-lang java
   ```

## Получение результатов

В таблице уязвимостей с найденными достижимыми вызовами будет проставлена отметка в соответствующем столбце:

В конце будет доступна ещё одна таблица с перечислением деревьев вызовов для уязвимостей:

Пример для более крупного проекта:

Если был указан флаг `--save-results`, то результаты достижимости будут в колонке "Достижимо" таблицы уязвимостей:
