- [Русский](https://docs.codescoring.ru/osa-proxy/config-caching/index.md)

# Redis and сaching сonfiguration

To improve performance and reduce load on the CodeScoring platform, caching of policy checking results ([Judge service](/on-premise/containers-description.en/)) is supported. Caching requires a Redis connection.

Redis and Caching Settings

```
spring:
  data:
    redis:
      host: localhost
      port: 6379
      database: 0         # Database number (optional)
      password: password  # Optional
      timeout: 2000ms

cache:
  judge:
    enabled: true  # Enable caching (default is false)
    ttl: 24h       # Time-to-live for cache entries
    refresh-after: 30m  # Time after which an entry is considered stale and needs refresh (but can still be served from cache)
    proactive-refresh-enabled: true # Enable proactive (background) cache refresh
    proactive-refresh-interval: 2h  # Interval for background refresh task
    key-prefix: "cs:judge:" # Prefix for Redis keys
```

Cache TTL prolongation specifics

Proactive refresh does not prolong the TTL (time-to-live) of a cache entry. The TTL is only extended when data is read from the cache by actual user requests. This ensures that only frequently requested components remain in the cache, while rarely used ones are automatically removed from Redis.

## Swagger UI

OSA Proxy provides Swagger UI for API documentation and cache management.

- **URL:** `http://<osa-proxy-host>:<port>/api/swagger`
- **Available operations:**
  - Clear cache by PURL
  - Clear cache by package type
