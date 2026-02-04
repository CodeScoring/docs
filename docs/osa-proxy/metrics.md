---
hide:
- footer
---

# Cбор метрик

Метрики доступны в **OSA Proxy** по адресу `{osa-proxy-url}/actuator/metrics` в формате JSON, а также в формате для prometheus `{platform-url}/actuator/prometheus`.

Эти метрики собираются для каждого типа репозитория (`maven`, `pypi`, `nuget`, `npm`, `go`, `debian`, `alpine`, `rpm`, `docker`) и позволяют детально отслеживать входящие запросы к прокси-репозиториям.

## Доступные метрики

- `gateway_route_<package-type>_requests_seconds_count` – общее количество обработанных запросов;
- `gateway_route_<package-type>_requests_seconds_sum` – суммарное время обработки запросов, используется для расчета среднего времени ответа;
- `gateway_route_<package-type>_requests_seconds_max` – максимальное время обработки запроса;
- `gateway_route_<package-type>_requests_seconds_bucket` – SLO (Service Level Objective) метрики времени ответа с бакетами: 10ms, 25ms, 50ms, 100ms, 250ms, 500ms, 1s, 2s, 5s.

В рамках сбора метрик `<package-type>` заменяется на соответствующий тип репозитория: `maven`, `pypi`, `nuget`, `npm`, `debian`, `alpine`, `rpm`, `docker`. Например, для Maven-репозитория метрика будет называться `gateway_route_maven_requests_total`.

Данные метрики можно отфильтровать по следующим лейблам:

- **`operation`** – тип операции, выполняемой с пакетом;
  - `scan_package` – сканирование пакета;
  - `scan_manifest` – сканирование манифеста;
  - `other` – другие операции (например передача файлов не подпадающих под анализ).
- **`method`** – HTTP-метод запроса (`GET`, `POST`, `PUT`, и т.д.);
- **`repository`** – имя репозитория, к которому был выполнен запрос;
- **`status`** – код статуса HTTP-ответа (например, `200`, `403`, `500`);
- **`outcome`** – результат обработки запроса;
  - `success` – запрос успешно обработан;
  - `error` – произошла ошибка при обработке (статус 400 и выше, кроме кода блокировки);
  - `blocked_by_policies` – запрос был заблокирован политиками безопасности.

## Метрики обращений в CodeScoring

Для мониторинга взаимодействия с платформой CodeScoring доступны следующие метрики:

- `codescoring_api_requests_seconds_count` – общее количество запросов к API CodeScoring;
- `codescoring_api_requests_seconds_sum` – суммарное время выполнения запросов к API;
- `codescoring_api_requests_seconds_max` – максимальное время выполнения запроса к API;
- `codescoring_api_requests_seconds_bucket` – SLO метрики времени ответа API с бакетами: 10ms, 25ms, 50ms, 100ms, 250ms, 500ms, 1s, 2s, 5s.

Данные метрики позволяют отслеживать:

- Производительность взаимодействия с платформой CodeScoring
- Количество запросов на сканирование компонентов
- Время отклика API для выявления проблем связи
- Нагрузку на платформу со стороны OSA Proxy