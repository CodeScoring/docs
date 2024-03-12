---
hide:
  - footer
---
# Настройка метрик

CodeScoring хранит метрики в формате, поддерживаемом инструментом мониторинга **Prometheus**. На данный момент доступны метрики с инсталляции CodeScoring и плагинов в прокси-репозиториях.

## Cбор метрик с инсталляции

Метрики с инсталляции доступны в **CodeScoring API** по адресу `{installation-url}/api/metrics`. Для того, чтобы настроить отслеживание метрик в Prometheus, необходимо выполнить следующие шаги:

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

**Метрики очередей**

- `codescoring_tasks_queue_size_total` – общее количество задач, ожидающих выполнения;
- `codescoring_tasks_schedule_queue_size_total` – общее количество запланированных задач, ожидающих выполнения;
- `codescoring_tasks_running_tasks_total` – общее количество задач, выполняющихся в данный момент.

Данные метрики можно отфильтровать по лейблу `queue` со следующими возможными значениеми:

  - `ipcs` – задачи инсталляции;
  - `high-priority` – приоритетные задачи;
  - `osa-container-image-scan` – задачи анализа контейнерных образов;
  - `osa-package-scan` – задачи анализа OSA пакетов;
  - `policy` – задачи перерасчета политик;
  - `tqi` – задачи анализа авторов и клонов.
  
**Метрики анализа**

- `codescoring_running_analyses_total` – общее количество выполняющихся анализов. 

Данную метрику можно отфильтровать по лейблу `analysis_type` со следующими возможными значениями:

  - `sca` – анализ SCA;
  - `authors` – анализ авторов;
  - `clones` – анализ клонов.

**Метрики запросов от плагинов OSA**

- `codescoring_registration_packages_queue_size` – очередь регистрации пакетов из OSA;
- `codescoring_registration_container_images_queue_size` – очередь регистрации контейнерных образов из OSA.

Пример визуализации метрик:

![Prometheus metrics](/assets/img/prometheus_metrics.png)

## Сбор метрик OSA

Метрики OSA содержат количество и время запросов от плагинов, а также количество просканированных и заблокированных компонентов в менеджерах репозиториев. Метрики доступны в **CodeScoring API** по адресу `{installation-url}/api/osa/metrics`.

Доступны следующие метрики OSA:

**Метрики соединений**

- `codescoring_osa_api_db_connection_pool` – пул соединений к базе данных.

Данную метрику можно отфильтровать по лейблу `measure` со следующими возможными значениями:

  - `pool_min` – минимальное количество соединений;
  - `pool_max` – максимальное количество соединений;
  - `pool_size` – текущий размер пула соединений;
  - `pool_available` – доступное количество соединений;
  - `requests_waiting` – количество соединений, ожидающих ответа от базы данных.

- `codescoring_osa_api_redis_connection_pool` – пул соединений к Redis.

Данную метрику можно отфильтровать по лейблу `measure` со следующими возможными значениями:

  - `available connections` – количество доступных соединений;
  - `in_use_connections` – количество используемых соединений;
  - `total_connections` – общее количество соединений.

**Метрики запросов компонентов**

  - `codescoring_osa_api_http_request_duration_seconds_sum` – общее время запроса;
  - `codescoring_osa_api_http_request_duration_seconds_bucket` – время запроса по временным рядам;
  - `codescoring_osa_api_http_requests_total` – общее количество запросов.

Данные метрики можно отфильтровать по лейблам handler'a, статуса и метода запроса. Например:

```
codescoring_osa_api_http_request_duration_seconds_bucket{handler="/api/osa/packages/",le="0.01",method="POST",status="2xx"} 0.0
```

**Метрики статусов компонентов**

- `codescoring_osa_api_requested_component_block_status_total` – количество запрошенных компонентов в определенном статусе блокировки.

Данную метрику можно отфильтровать по лейблам `object_type` и `block_status`. Например:

```
codescoring_osa_api_requested_component_block_status_total{block_status="blocked_by_policies",object_type="package"}
```

- `codescoring_osa_api_requested_component_scan_status_total` – количество запрошенных компонентов в определенном статусе сканирования.

Данную метрику можно отфильтровать по лейблам `object_type` и `scan_status`. Например:

```
codescoring_osa_api_requested_component_scan_status_total{object_type="container_image",scan_status="not_scanned"}
```