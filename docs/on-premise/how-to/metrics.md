---
hide:
  - footer
---
# Настройка метрик

## Cбор метрик с инсталляции в Prometheus

CodeScoring хранит метрики в формате, поддерживаемом популярными инструментами мониторинга, например **Prometheus**. На данный момент доступны метрики по очередям запросов и количеству запущенных анализов.

Метрики доступны в **CodeScoring API** по адресу `{installation-url}/api/metrics`. Для того, чтобы настроить отслеживание метрик с инсталляции в Prometheus, необходимо выполнить следующие шаги:

1. Открыть файл конфигурации prometheus.yml и добавить параметры для мониторинга метрик. Ниже приведен пример:

    ```yaml
     global:
       scrape_interval: 15s
  
     scrape_configs:
       + job_name: 'codescoring'
         metrics_path: '/api/metrics'
         static_configs:
           + targets: ['{installation url}'] # Адрес хоста инсталляции
    ```

2. Перезапустить Prometheus, чтобы изменения вступили в силу.

3. Открыть интерфейс Prometheus и перейти на страницу **Graph**. В поле запроса введите название одной из метрик:

    - `ipcs_running_analyses_total` - количество запущенных анализов (SCA и TQI) по проектам в данный момент;
    - `ipcs_huey_running_tasks_total` – количество выполняющихся задач (анализов, клонирований VCS, уведомлений и т.д.) в данный момент;
    - `ipcs_huey_queue_size_total` – количество задач, ожидающих выполнения.

Пример визуализации метрик:

![Prometheus metrics](/assets/img/prometheus_metrics.png)