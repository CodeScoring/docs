---
hide:
  - footer
---
# Работа через прокси

При необходимости работы системы через прокси необходимо раскомментировать и задать значения соответствующих переменных в файле `app.env`:

- `HTTP_PROXY` и `HTTPS_PROXY` — адрес прокси-сервера

    **Важно**: для обеих переменных в значении должна использоваться схема `http`.

- `NO_PROXY` — список URL внешних систем, запросы к которым не должны идти через прокси. Среди значений возможно указание IP адресов, например:

```
NO_PROXY=127.0.0.1,192.168.0.1/24,example.com,domain.example.com,.subdomain.example.com
```

Если добавить список URL VCS в переменную `NO_PROXY` невозможно, то необходимо [добавить сертификат прокси в каталог SSL](/on-premise/self-signed-ssl).

**Важно**: при заданных настройках НTTP Proxy мимо прокси-сервера будут идти все запросы к URL внешних систем, указанных в переменной `NO_PROXY`. Это относится как к системам контроля версий, так и, например, к подключенным таск-менеджерам.