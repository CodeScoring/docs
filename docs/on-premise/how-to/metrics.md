---
hide:
  - footer
---
# Настройка отслеживания метрик

CodeScoring поддерживает отслеживание метрик с инсталляции для популярных инструментов мониторинга, например **Prometheus**. На данный момент доступны метрики по очередям запросов.

Данные по метрикам доступны в **CodeScoring API** по адресу `{installation-url}/api/metrics`. Для того, чтобы настроить отслеживание метрик с инсталляции в Prometheus, необходимо выполнить следующие шаги:

1. Открыть файл конфигурации prometheus.yml и добавить параметры для мониторинга метрик Huey. Ниже приведен пример:

  ```yaml
   global:
     scrape_interval: 15s

   scrape_configs:
     - job_name: 'codescoring'
       metrics_path: '/api/metrics'
       static_configs:
         - targets: ['{installation url}'] # Адрес хоста инсталляции
  ```
2. Перезапустить Prometheus, чтобы изменения вступили в силу.

3. Открыть интерфейс Prometheus и перейти на страницу **Graph**. В поле запроса введите название одной из метрик Huey:

    - `ipcs_huey_queue_size_total` – общее количество запросов в очереди;
    - `ipcs_huey_running_tasks_total` – количество выполняющихся запросов.

Пример визуализации метрик:

![Prometheus metrics](/assets/img/prometheus_metrics.png)