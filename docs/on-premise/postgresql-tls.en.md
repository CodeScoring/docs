---
hide:
  - footer
---

Connecting to PostgreSQL/PgBouncer using TLS provides secure and encrypted data transfer between client and server. This option is available starting from CodeScoring <a href="/changelog/on-premise-changelog.en/#%version%" class="version-tag">%version%</a> version.

## To connect to PostgreSQL/PgBouncer using TLS
1. Before starting the system, place certificate and key files in the `ssl` directory in the system installation files;
2. Give the files talking names, e.g. `pgbouncer_server.crt`, `pgbouncer_server.key`;
3. Important: the extension of the certificate files must be `crt`;
4. Change the owner of the key files as follows:
    ```bash
    chown 999:0 ./ssl/postgresql_server.key
    chown 1050:0 ./ssl/pgbouncer_server.key
    ```
5. Uncomment and edit your SSL/TLS configuration files;

## Example of how to enable PostgreSQL/PgBouncer in TLS mode with self-signed certificates
1. Generate certificates in the `ssl` directory in the system installation files using the `mkcert` utility
    ```bash
    docker run -v ./ssl:/ssl -it --rm alpine/mkcert -cert-file /ssl/pgbouncer_server.crt -key-file /ssl/pgbouncer_server.key pgbouncer
    docker run -v ./ssl:/ssl -it --rm alpine/mkcert -cert-file /ssl/postgresql_server.crt -key-file /ssl/postgresql_server.key psql
    ```
2. Change key file owners
    ```bash
    chown 999:0 ./ssl/postgresql_server.key
    chown 1050:0 ./ssl/pgbouncer_server.key
    ```
3. Copy the SSL/TLS configuration templates
    ```bash
    cp postgres/pgbouncer_tls_include.ini.template postgres/pgbouncer_tls_include.ini
    cp postgres/postgresql_ssl_include.conf.template postgres/postgresql_ssl_include.conf
    ```
4. Uncomment and edit the following lines in the configuration file `postgres/pgbouncer_tls_include.ini`
    ```bash
    client_tls_sslmode = require
    client_tls_ca_file = /usr/local/share/ca-certificates/pgbouncer_server.crt
    client_tls_key_file = /usr/local/share/ca-certificates/pgbouncer_server.key
    client_tls_cert_file = /usr/local/share/ca-certificates/pgbouncer_server.crt
    server_tls_sslmode = require
    server_tls_ca_file = /usr/local/share/ca-certificates/postgresql_server.crt
    ```
5. Uncomment and edit the following lines in the configuration file `postgres/postgresql_ssl_include.conf`
    ```bash
    ssl = on
    ssl_cert_file = '/usr/local/share/ca-certificates/postgresql_server.crt'
    ssl_key_file = '/usr/local/share/ca-certificates/postgresql_server.key'
    ```
