---
hide:
- footer
---

# Metric collection

Metrics are available in **OSA Proxy** at `{osa-proxy-url}/actuator/metrics` in JSON format, as well as in the Prometheus format `{platform-url}/actuator/prometheus`.

These metrics are collected for each repository type (`maven`, `pypi`, `nuget`, `npm`) and allow detailed monitoring of incoming requests to proxy repositories.

## Available metrics

- `gateway_route_<package-type>_requests_seconds_count` / `gateway_route_<package-type>_requests_total` – total number of requests processed;
- `gateway_route_<package-type>_requests_seconds_sum` – total request processing time, used to calculate average response time;
- `gateway_route_<package-type>_requests_seconds_max` – maximum request processing time;
- `gateway_route_<package-type>_requests_seconds_bucket` – response time histogram, allows you to calculate percentiles (e.g., 95th, 99th) of response time.

When collecting metrics, `<package-type>` is replaced with the corresponding repository type: `maven`, `pypi`, `nuget`, or `npm`. For example, for a Maven repository, the metric will be called `gateway_route_maven_requests_total`.

These metrics can be filtered by the following labels:

- **`operation`** – the type of operation performed on the package;
    - `scan_package` – package scanning;
    - `scan_manifest` – manifest scanning;
    - `other` – other operations (e.g., transferring files not subject to analysis).
- **`method`** – HTTP request method (`GET`, `POST`, `PUT`, etc.);
- **`repository`** – the name of the repository to which the request was made;
- **`status`** – HTTP response status code (e.g., `200`, `403`, `500`);
- **`outcome`** – request processing result;
    - `SUCCESS` – request successfully processed;
    - `ERROR` – an error occurred during processing (status 400 or higher, excluding the blocking code);
    - `BLOCKED_BY_POLICIES` – the request was blocked by security policies.
```
