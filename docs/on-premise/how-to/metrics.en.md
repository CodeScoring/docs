---
hide:
  - footer
---
# Configuring metrics

CodeScoring stores metrics in a format supported by the **Prometheus** monitoring tool. Currently there are metrics available from CodeScoring installation and plugins in proxy repositories.

## Collect metrics from installation

Metrics from installation are available via **CodeScoring API** at `{installation-url}/api/metrics`. In order to configure metrics tracking in Prometheus, the following steps are required:

1. open the `prometheus.yml` configuration file and add parameters to monitor metrics. The following is an example:

    ```yaml
    global:
      scrape_interval: 15s

      scrape_configs:
      - job_name: 'demo-codescoring'
        metrics_path: '/api/metrics'
        static_configs:
          - targets: ['{installation-url}'] # Installation host address
      - job_name: 'osa'
        metrics_path: '/api/osa/metrics'
        static_configs:
          - targets: ['{installation-url}'] # Installation host address
    ```

2. Restart Prometheus for the changes to take effect.

3. Open the Prometheus interface and go to the **Graph** page. In the query field, enter one of the metrics:

**Queue Metrics**

- `codescoring_tasks_queue_size_total` - total number of tasks pending;
- `codescoring_tasks_schedule_tasks_schedule_queue_size_total` - total number of scheduled tasks pending;
- `codescoring_tasks_running_tasks_total` - total number of tasks currently running.

These metrics can be filtered by the `queue` label with the following possible values: `ipcs`, `high-priority`, `osa-container-image-scan` , `osa-package-scan`, `policy` and `tqi`.

**Analysis Metrics**

- `codescoring_running_analyses_total` is the total number of running analyses. This metric can be filtered by the `analysis_type` label with the following possible values: `sca`, `authors` and `clones`.

**Query metrics from OSA plugins**

- `codescoring_registration_packages_queue_size` - the queue for registering packets from OSA;
- `codescoring_registration_registration_container_images_queue_size` - queue for registering container images from OSA.

Example of metrics visualization:

![Prometheus metrics](/assets/img/prometheus_metrics.png)

## Collecting OSA metrics

OSA metrics contain the number and time of requests from plugins, as well as the number of scanned and blocked components in repository managers. The metrics are available via **CodeScoring API** at `{installation-url}/api/osa/metrics`.

The following OSA metrics are available:

**Connection Metrics**.

- `codescoring_osa_api_db_connection_pool` - database connection pool. This metric can be filtered by the `measure` label with the following possible values: `pool_min`, `pool_max`, `pool_size`, `pool_available` and `requests_waiting`.

- `codescoring_osa_api_redis_connection_pool` - the pool of connections to Redis. This metric can be filtered by the `measure` label with the following possible values: `available connections`, `in_use_connections`, `total_connections`.

**Component Query Metrics**

  - `codescoring_osa_api_http_request_duration_seconds_sum` - total request time;
  - `codescoring_osa_api_http_request_duration_seconds_bucket` - request time by time series;
  - `codescoring_osa_api_http_requests_total` - total number of requests.

These metrics can be filtered by handler, status and request method labels. For example:

```
codescoring_osa_api_api_http_request_duration_seconds_bucket{handler="/api/osa/packages/",le="0.01",method="POST",status="2xx"} 0.0
```

**Component Status Metrics**

- `codescoring_osa_api_requested_component_block_status_total` is the number of requested components in a particular block status.

This metric can be filtered by the `object_type` and `block_status` labels. For example:

```
codescoring_osa_api_requested_component_block_status_total{block_status="blocked_by_policies",object_type="package"}
```

- `codescoring_osa_api_requested_component_scan_status_total` - the number of requested components in a particular scan status.

This metric can be filtered by the `object_type` and `scan_status` labels. For example:

```
codescoring_osa_api_requested_component_scan_status_total{object_type="container_image",scan_status="not_scanned"}
```
