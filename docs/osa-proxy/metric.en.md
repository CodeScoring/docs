---
hide:
- footer
---

# Metrics

Metrics are available in **OSA Proxy** at `{osa-proxy-url}/actuator/metrics` in JSON format, and also in Prometheus format at `{platform-url}/actuator/prometheus`.

These metrics are collected for each repository type (`maven`, `pypi`, `nuget`, `npm`) and allow for detailed tracking of incoming requests to proxy repositories.

-   `gateway_route_<package-type>_requests_seconds_count` / `gateway_route_<package-type>_requests_total` – the total number of processed requests.
-   `gateway_route_<package-type>_requests_seconds_sum` – the total time spent processing requests, used to calculate the average response time.
-   `gateway_route_<package-type>_requests_seconds_max` – the maximum request processing time.
-   `gateway_route_<package-type>_requests_seconds_bucket` – a histogram of response times, which allows for calculating percentiles (e.g., 95th, 99th) of response times.

Here, `<package-type>` is replaced with the corresponding repository type: `maven`, `pypi`, `nuget`, `npm`. For example, for a Maven repository, the metric will be named `gateway_route_maven_requests_total`.

These metrics can be filtered by the following labels:

-   **`operation`**: The type of operation performed on the package.
    -   `scan_package` – scanning a package.
    -   `scan_manifest` – scanning a manifest.
    -   `other` – other operations (e.g., transferring files not subject to analysis).
-   **`method`**: The HTTP request method (`GET`, `POST`, `PUT`, etc.).
-   **`repository`**: The name of the repository to which the request was made.
-   **`status`**: The HTTP response status code (e.g., `200`, `403`, `500`).
-   **`outcome`**: The result of the request processing.
    -   `SUCCESS` – the request was processed successfully.
    -   `ERROR` – an error occurred during processing (status 400 or higher, excluding the block code).
    -   `BLOCKED_BY_POLICIES` – the request was blocked by security policies.
```
