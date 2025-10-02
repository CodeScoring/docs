---
hide:
  - footer
---

# Настройка метрик

CodeScoring хранит метрики в формате, поддерживаемом инструментом мониторинга **Prometheus**. На данный момент доступны метрики с платформе CodeScoring и плагинов в прокси-репозиториях.

## Cбор метрик платформы

Метрики платформы доступны в **CodeScoring API** по адресу `{platform-url}/api/metrics`. Для того, чтобы настроить отслеживание метрик в Prometheus, необходимо выполнить следующие шаги:

1. Открыть файл конфигурации `prometheus.yml` и добавить параметры для мониторинга метрик. Ниже приведен пример:

    ```yaml
    global:
      scrape_interval: 15s

      scrape_configs:
      - job_name: 'demo-codescoring'
        metrics_path: '/api/metrics'
        static_configs:
          - targets: ['{platform-url}'] # Адрес хоста платформе
      - job_name: 'osa'
        metrics_path: '/api/osa/metrics'
        static_configs:
          - targets: ['{platform-url}'] # Адрес хоста платформы
    ```

2. Перезапустить Prometheus, чтобы изменения вступили в силу.

3. Открыть интерфейс Prometheus и перейти на страницу **Graph**. В поле запроса ввеcти название одной из метрик:

### Метрики очередей

- **codescoring_tasks_queue_size_total** – общее количество задач, ожидающих выполнения;
- **codescoring_tasks_schedule_queue_size_total** – общее количество запланированных задач, ожидающих выполнения;
- **codescoring_tasks_running_tasks_total** – общее количество задач, выполняющихся в данный момент;
- **codescoring_celery_queue_size_total** – общее количество задач в Celery-очередях;
- **codescoring_celery_running_tasks_total** – общее количество выполняющихся задач в Celery-очередях.

Данные метрики можно отфильтровать по лейблу `queue` со следующими возможными значениями:

- Основные очереди: `ipcs`, `high-priority`, `osa-container-image-scan`, `osa-package-scan`, `policy`, `tqi`, `media`, `sca-external-scan`, `secrets`;
- Celery-очереди: `default`, `webhooks`, `rescan-main`, `rescan-packages`.

### Метрики анализа

**codescoring_running_analyses_total** – общее количество выполняющихся анализов.

Данную метрику можно отфильтровать по лейблу `analysis_type` со следующими возможными значениями:

- `sca` – анализ зависимостей;
- `authors` – анализ авторов кода;
- `clones` – поиск клонов кода.

### Метрики запросов от плагинов OSA

- **codescoring_registration_packages_queue_size** – очередь регистрации пакетов из OSA;
- **codescoring_registration_container_images_queue_size** – очередь регистрации контейнерных образов из OSA.

Пример визуализации метрик:

![Prometheus metrics](/assets/img/prometheus_metrics.png)

## Сбор метрик OSA

Метрики OSA содержат информацию о состоянии соединений, количестве и времени запросов, а также о статусах сканирования и блокировки компонентов в менеджерах репозиториев. Метрики доступны в **CodeScoring API** по адресу `{platform-url}/api/osa/metrics`.

### Метрики соединений

**codescoring_osa_api_db_connection_pool** – состояние пула соединений к базе данных.  

Метрику можно отфильтровать по лейблу `measure` со следующими возможными значениями:

- `pool_min` – минимальный размер пула;
- `pool_max` – максимальный размер пула;
- `pool_size` – текущий размер пула;
- `pool_available` – доступные соединения;
- `requests_waiting` – количество ожидающих запросов;
- `pool_used` – используемые соединения.

**codescoring_osa_api_redis_connection_pool** – состояние пула соединений к Redis.  

Метрику можно отфильтровать по лейблу `measure` со следующими возможными значениями:

- `available_connections` – доступные соединения;
- `in_use_connections` – используемые соединения;
- `total_connections` – общее количество соединений.

### Метрики запросов компонентов

**codescoring_osa_api_http_request_duration_seconds** – продолжительность HTTP-запросов в секундах.  

Метрика представлена в виде гистограммы и включает:

- `codescoring_osa_api_http_request_duration_seconds_sum` – общее время запросов;
- `codescoring_osa_api_http_request_duration_seconds_bucket` – распределение времени запросов по временным интервалам;
- `codescoring_osa_api_http_request_duration_seconds_count` – общее количество запросов.

Метрику можно отфильтровать по лейблам:

- `handler` – обработчик запроса (например, `/api/osa/packages/`);
- `method` – метод запроса (например, `POST`);
- `status` – HTTP-статус ответа (например, `2xx`, `4xx`, `5xx`).

Пример:
```
codescoring_osa_api_http_request_duration_seconds_bucket{handler="/api/osa/packages/",le="0.01",method="POST",status="2xx"} 0.0
```

**codescoring_osa_api_http_requests_total** – общее количество HTTP-запросов.  

Метрику можно отфильтровать по тем же лейблам, что и `codescoring_osa_api_http_request_duration_seconds`.

### Метрики статусов компонентов

**codescoring_osa_api_requested_component_block_status_total** – количество компонентов в различных статусах блокировки.  

Метрику можно отфильтровать по лейблам:

- `block_status` – статус блокировки (например, `not_blocked`, `blocked_by_policies`, `blocked_scan_failed`);
- `object_type` – тип объекта (например, `package`, `container_image`).

Пример:
```
codescoring_osa_api_requested_component_block_status_total{block_status="blocked_by_policies",object_type="package"} 1.0
```

**codescoring_osa_api_requested_component_scan_status_total** – количество компонентов в различных статусах сканирования.  

Метрику можно отфильтровать по лейблам:

- `scan_status` – статус сканирования (например, `not_scanned`, `scanned`);
- `object_type` – тип объекта (например, `package`, `container_image`).

Пример:
```
codescoring_osa_api_requested_component_scan_status_total{object_type="container_image",scan_status="not_scanned"} 0.0
```