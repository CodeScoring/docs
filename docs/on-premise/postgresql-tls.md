---
hide:
  - footer
---

<a href="/changelog/on-premise-changelog/#%version%" class="version-tag">%version%</a>

## Для подключения к PostgreSQL/PgBouncer с использованием TLS
1. Перед запуском системы разместить файлы сертификатов и ключей в каталоге `ssl` в установочных файлах системы;
2. Дать файлам говорящие названия, например `pgbouncer_server.crt`, `pgbouncer_server.key`;
3. Важно: расширение файлов сертификатов обязательно должно быть `crt`;
4. Сменить владельце файлов ключей следующим образом:
    ```bash
    chown 999:0 ./ssl/postgresql_server.key
    chown 1050:0 ./ssl/pgbouncer_server.key
    ```
5. Раскомментировать и отредактировать файлы конфигурации SSL/TLS;

## Пример включения PostgreSQL/PgBouncer в режим TLS с самоподписанными сертификатами
1. Генерируем сертификаты в каталоге `ssl` в установочных файлах системы, используя утилиту `mkcert`
    ```bash
    docker run -v ./ssl:/ssl -it --rm alpine/mkcert -cert-file /ssl/pgbouncer_server.crt -key-file /ssl/pgbouncer_server.key pgbouncer
    docker run -v ./ssl:/ssl -it --rm alpine/mkcert -cert-file /ssl/postgresql_server.crt -key-file /ssl/postgresql_server.key psql
    ```
2. Меняем владельцев файлов ключей
    ```bash
    chown 999:0 ./ssl/postgresql_server.key
    chown 1050:0 ./ssl/pgbouncer_server.key
    ```
3. Копируем шаблоны конфигурации SSL/TLS
    ```bash
    cp postgres/pgbouncer_tls_include.ini.template postgres/pgbouncer_tls_include.ini
    cp postgres/postgresql_ssl_include.conf.template postgres/postgresql_ssl_include.conf
    ```
4. Раскомментируем и отредактируем следующие строчки в файле конфигурации `postgres/pgbouncer_tls_include.ini`
    ```bash
    client_tls_sslmode = require
    client_tls_ca_file = /usr/local/share/ca-certificates/pgbouncer_server.crt
    client_tls_key_file = /usr/local/share/ca-certificates/pgbouncer_server.key
    client_tls_cert_file = /usr/local/share/ca-certificates/pgbouncer_server.crt
    server_tls_sslmode = require
    server_tls_ca_file = /usr/local/share/ca-certificates/postgresql_server.crt
    ```
5. Раскомментируем и отредактируем следующие строчки в файле конфигурации `postgres/postgresql_ssl_include.conf`
    ```bash
    ssl = on
    ssl_cert_file = '/usr/local/share/ca-certificates/postgresql_server.crt'
    ssl_key_file = '/usr/local/share/ca-certificates/postgresql_server.key'
    ```
