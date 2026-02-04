---
hide:
- footer
---

# Metric collection

Metrics are available in **OSA Proxy** at `{osa-proxy-url}/actuator/metrics` in JSON format, as well as in the Prometheus format `{platform-url}/actuator/prometheus`.

These metrics are collected for each repository type (`maven`, `pypi`, `nuget`, `npm`) and allow detailed monitoring of incoming requests to proxy repositories.

## Available metrics

- `gateway_route_<package-type>_requests_seconds_count` – total number of requests processed;
- `gateway_route_<package-type>_requests_seconds_sum` – total request processing time, used to calculate average response time;
- `gateway_route_<package-type>_requests_seconds_max` – maximum request processing time;
- `gateway_route_<package-type>_requests_seconds_bucket` – SLO (Service Level Objective) response time metrics with buckets: 10ms, 25ms, 50ms, 100ms, 250ms, 500ms, 1s, 2s, 5s.

When collecting metrics, `<package-type>` is replaced with the corresponding repository type: `maven`, `pypi`, `nuget`, `npm`, `go`, `debian`, `alpine`, `rpm`, `docker`. For example, for a Maven repository, the metric will be called `gateway_route_maven_requests_total`.

These metrics can be filtered by the following labels:

- **`operation`** – the type of operation performed on the package;
  - `scan_package` – package scanning;
  - `scan_manifest` – manifest scanning;
  - `other` – other operations (e.g., transferring files not subject to analysis).
- **`method`** – HTTP request method (`GET`, `POST`, `PUT`, etc.);
- **`repository`** – the name of the repository to which the request was made;
- **`status`** – HTTP response status code (e.g., `200`, `403`, `500`);
- **`outcome`** – request processing result;
  - `success` – request successfully processed;
  - `error` – an error occurred during processing (status 400 or higher, excluding the blocking code);
  - `blocked_by_policies` – the request was blocked by security policies.

## CodeScoring API Metrics

To monitor interaction with the CodeScoring platform, the following metrics are available:

- `codescoring_api_requests_seconds_count` – total number of requests to the CodeScoring API;
- `codescoring_api_requests_seconds_sum` – total execution time of requests to the API;
- `codescoring_api_requests_seconds_max` – maximum execution time of a request to the API;
- `codescoring_api_requests_seconds_bucket` – SLO metrics for API response time with buckets: 10ms, 25ms, 50ms, 100ms, 250ms, 500ms, 1s, 2s, 5s.

These metrics allow tracking:

- Performance of interaction with the CodeScoring platform
- Number of component scan requests
- API response time to identify connection issues
- Load on the platform from OSA Proxy
