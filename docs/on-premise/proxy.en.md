---
hide:
  - footer
---
# Proxy usage

If you need to use the system through a proxy, you need to uncomment and set the values of the corresponding variables in the `app.env` file:

  - `HTTP_PROXY` and `HTTPS_PROXY` - proxy server address

 **Important**: For both variables, the value must use the `http` scheme.

  - `NO_PROXY` — list of URLs of external systems, requests to which should not go through a proxy. Among the values, it is possible to specify IP addresses, for example:

  ```
  NO_PROXY=127.0.0.1,192.168.0.1/24,example.com,domain.example.com,.subdomain.example.com
  ```

If adding a list of VCS URLs to the `NO_PROXY` variable is not possible, then you need to [add the proxy certificate to the SSL directory](/on-premise/self-signed-ssl.en).

**Important**: with the HTTP Proxy settings specified, all requests to the URLs of external systems specified in the `NO_PROXY` variable will go past the proxy server. This applies to both version control systems and, for example, connected task managers.
