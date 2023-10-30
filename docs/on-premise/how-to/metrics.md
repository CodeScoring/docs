---
hide:
  - footer
---
# Настройка метрик

## Cбор метрик с инсталляции в Prometheus

CodeScoring хранит метрики в формате, поддерживаемом популярными инструментами мониторинга, например **Prometheus**. На данный момент доступны метрики по очередям запросов и количеству запущенных анализов.

Метрики доступны в **CodeScoring API** по адресу `{installation-url}/api/metrics`. Для того, чтобы настроить отслеживание метрик с инсталляции в Prometheus, необходимо выполнить следующие шаги:

1. Открыть файл конфигурации `prometheus.yml` и добавить параметры для мониторинга метрик. Ниже приведен пример:

    ```yaml
    global:
      scrape_interval: 15s

      scrape_configs:
      - job_name: 'demo-codescoring'
        metrics_path: '/api/metrics'
        static_configs:
          - targets: ['{installation-url}'] # Адрес хоста инсталляции
      - job_name: 'osa'
        metrics_path: '/api/osa/metrics'
        static_configs:
          - targets: ['{installation-url}'] # Адрес хоста инсталляции
    ```

2. Перезапустить Prometheus, чтобы изменения вступили в силу.

3. Открыть интерфейс Prometheus и перейти на страницу **Graph**. В поле запроса ввеcти название одной из метрик:

    - `codescoring_tasks_running_tasks_total{queue="ipcs"}`  - общее количество выполняющихся задач (анализов, клонирований VCS, уведомлений и т.д.) инсталляции в данный момент;
    - `codescoring_tasks_running_tasks_total{queue="high-priority"}` – количество приоритетных (не запускающих цепочку действий) задач инсталляции, выполняющихся в данный момент;
    - `codescoring_tasks_running_tasks_total{queue="osa"}` – количество задач OSA, выполняющихся в данный момент;
    - `codescoring_tasks_queue_size_total{queue="ipcs"}` – общее количество задач инсталляции, ожидающих выполнения;
    - `codescoring_tasks_queue_size_total{queue="high-priority"}` – количество приоритетных задач инсталляции, ожидающих выполнения;
    - `codescoring_tasks_queue_size_total{queue="osa"}` – количество задач OSA, ожидающих выполнения;
    - `codescoring_running_analyses_total{analysis_type="sca"}` - количество запущенных SCA анализов по проектам в данный момент;
    - `codescoring_running_analyses_total{analysis_type="authors"}` - количество запущенных анализов авторов в данный момент;
    - `codescoring_running_analyses_total{analysis_type="clones"}` - количество запущенных анализов клонов в данный момент.

Пример визуализации метрик:

![Prometheus metrics](/assets/img/prometheus_metrics.png)

## Сбор метрик OSA

Метрики OSA содержат количество и время запросов данных по компонентам от плагинов в прокси-репозиториях. Метрики доступны в **CodeScoring API** по адресу `{installation-url}/api/osa/metrics`.

Доступны следующие метрики OSA:

- `codescoring_osa_api_http_requests_total` – общее количество запросов;
- `codescoring_osa_api_http_request_duration_seconds_sum` – сумма продолжительности всех запросов;
- `codescoring_osa_api_http_request_duration_seconds_bucket` – распределение запросов по категориям продолжительности (bucket) в секундах.

