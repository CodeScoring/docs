---
hide:
  - footer
---

# Variable Definitions
This section provides a description of the variables used during platform setup, including those detailed in the 
[Installation in Docker](/on-premise/installation.en) and [Installation in Kubernetes](/on-premise/installation-in-k8s.en) sections.

!!! warning "Modifying values"
Consult with technical support before modifying any of the optional, non-required variables during installation. Altering default values may impact system performance and operational efficiency.

!!! warning "Avoid using the `#` symbol in parameters. It may be misinterpreted by the system during installation."

## **env.template**

* **COMPOSE_PROJECT_NAME** - docker compose project name, used to prefix the names of resources created by docker compose;

* **CODESCROING_VERSION** - is a required variable. The current version can be found in the [Changelog](/changelog/on-premise-changelog) section;

* **SECRET_KEY** - CodeScoring utilizes a randomly generated string as it's installation secret;

* **DJANGO_CSRF_TRUSTED_ORIGINS** - list of domains required for proper CSRF protection. It is recommended to include localhost on both internal and external ports, as well as the external domain (or IP:port combination). Specifying the protocol is mandatory; for example:

  ```bash
     DJANGO_CSRF_TRUSTED_ORIGINS=http://localhost:18000,https://localhost:8081,https://external_ip:8081
  ```

CodeScoring uses `Nginx` for system domain configuration.

* **NGINX_HOST** - specifies the hostname for system accessibility;
* **NGINX_PORT** - specifies the port for system accessibility;
* **SITE_SCHEME** - defines the data transmission protocol; defaults to `https`.

CodeScoring leverages `PostgreSQL` for data management, processing, and storage.

* **POSTGRES_DB** - specifies the database name;
* **POSTGRES_USER** - specifies the database username. When using a custom database, ensure the user has the following privileges: `Superuser, Create role, Create DB, Replication, Bypass RLS`;
* **POSTGRES_PASSWORD** - specifies the database password;
* **POSTGRES_HOST** - specifies the hostname for database accessibility;
* **POSTGRES_PORT** - specifies the port for database accessibility.

Integration with Sentry is disabled by default. `SENTRY_ENABLE = False`. To enable Sentry for error reporting and system event tracking, set `SENTRY_ENABLED = True` and provide the following variables:

* **SENTRY_DNS** - project identifier within Sentry, to which data will be sent;
* **SENTRY_ENVIRONMENT** - the environment to which the sent data will belong;
* **SENTRY_RELEASE** - release associated with the sent data.

## **app.env**

* The **PATH** variable defines the path to executable files, virtual environment (venv) files, and standard system paths;

  ```bash
     PATH=/venv/bin:${PATH}:/jscpd/node_modules/jscpd/bin:/sbin:/bin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:/root/bin
  ```

* **ANALYSIS_IGNORED_PATHS** - defines paths to be excluded from analysis. The following paths are excluded by default:

  ```bash
     **/.git*,**/.git/**,**/fixtures/**,**/tests/**,**/doc/**,**/docs/**,**/samples/**
  ```

* Variables specifying the location of core installation files:
    * **HOME** - value by default: `/ipcs-backend`;
    * **BASE_DIR** - value by default: `/ipcs-backend`;
    * **AZURE_DEVOPS_CACHE_DIR** - value by default: `/ipcs-backend`.

* **INDEX_API_URL** - the URL for the index API, used for knowledge base updates, is `https://index.codescoring.ru`. This parameter should not be modified;

* **ALLOWED_HOSTS** - allowed hosts for Django. Value by default: all hosts `*` are permitted;

* **JOHNNY_BIN** - defines the directory path to the `JOHNNY` executable scanning agent. Value by default: `/agents/johnny-linux-amd64`;

* **HASHER_BIN** - defines the directory path to the `HASHER` executable agent, responsible for file hashing. Value by default: `/agents/hasher-linux-amd64`;

* **DJANGO_CACHES_REDIS_URL** - the URL of the Redis server used as the Django caching system. Value by default: `redis://redis:6379/1`;

* **ANALYSIS_ROOT** - defines the root directory for cloning repositories intended for analysis. Files are copied as temporary files and removed after analysis (used by VCS projects). Value by default: `/analysis-root`;

* **MEDIA_ROOT** - defines the directory used for temporary storage of downloaded and uploaded files (including reports, SBOMs, etc.). Value by default: `/analysis-root`;

* **NODE_PATH** - defines the directory used for containing `node_modules`. Value by default: `/jscpd/node_modules `.

**HUEY** - provides queue and task management functionality. Modifications to the worker count should be performed only in consultation with technical support.

* **HUEY_REDIS_URL** - the URL for connecting to the Redis server used by the Huey. Default value: `redis://redis:6379/0`;
* **HUEY_WORKERS** - the number of `Huey` workers processing the tasks-main queue. Default value: `8`;
* **HUEY_HIGH_PRIORITY_WORKERS** - the number of Huey workers for high-priority tasks. Default value: `8`;
* **HUEY_OSA_PACKAGE_SCAN_WORKERS** - the number of Huey workers for the OSA package scanning module. Default value: `4`;
* **HUEY_OSA_CONTAINER_IMAGE_SCAN_WORKERS** - the number of Huey workers for the OSA package scanning module. Default value: `4`;
* **HUEY_POLICY_WORKERS** - the number of Huey workers for security policy execution. Default value: `4`;
* **HUEY_TQI_WORKERS** - the number of Huey workers for the TQI module. Default value: `4`;
* **HUEY_SECRETS_WORKERS** - the number of Huey workers for the secrets scanning module. Default value: `4`;
* **HUEY_MEDIA_WORKERS** - default count of Huey workers for media upload processing. Default value: `4`;
* **HUEY_SCA_EXTERNAL_SCAN_WORKERS** - the number of Huey workers responsible for the analysis queue, launched via the Johnny agent (`tasks-sca-external-scan`). Default value: `4`;
* **HUEY_WEBHOOKS_WORKERS** - the default number of Huey workers responsible for handling webhooks. Default value: `2`;
* **HUEY_WORKER_MAX_TASKS** - the maximum number of tasks that a single Huey worker can process. Default value: `500`.

* The **REQUESTS_CA_BUNDLE** and **SSL_CERT_FILE** variables define the location of SSL certificates used by the installation for secure communication: 
  ```bash
  REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
  ```
  ```bash
  SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt
  ```

* To enable proxy access for the installation to reach the internet or a version control system, uncomment and configure the necessary variables. Provide the proxy URL including the protocol, along with the username and password if necessary. For example:
    * **HTTP_PROXY**
      ```bash
      HTTP_PROXY=http://proxy_user:password@proxy_host:proxy_port
      ```
    * **HTTPS_PROXY**
      ```bash
      HTTPS_PROXY=http://proxy_user:password@proxy_host:proxy_port
      ```
    * **NO_PROXY**
      ```bash
      NO_PROXY=localhost,gitlab.domain.local
      ```

!!! warning "Variables related to Redis and Celery define configuration parameters for interacting with the Redis server and configuring Celery workers. These variables impact system performance, reliability, and resilience."

Variables for [Redis](/on-premise/containers-description) connection configuration (Application Redis connection settings):

* **REDIS_BACKOFF_CAP** - specifies the maximum number of connection retry attempts in case of failure. If a connection cannot be established after this limit, an error will be returned. Default value: `5`;
* **REDIS_BACKOFF_BASE** - base delay (in seconds) between retry attempts upon failure. Default value: `0.08`;
* **REDIS_RETRIES** - specifies the total number of connection attempts to the `Redis` server. Default value: `5`;
* **REDIS_SOCKET_CONNECT_TIMEOUT** - specifies the timeout (in seconds) for `Redis` server operations. If an operation does not complete within this duration, an error will be raised. Default value: `5.0`;
* **REDIS_SOCKET_TIMEOUT** - specifies the timeout (in seconds) for `Redis` server operations. If a connection is not established within this duration, a retry attempt will be made or an error will be raised. Default value: `5.0`;
* **REDIS_SOCKET_KEEPALIVE** - enables a keep-alive functionality to maintain an active connection with the Redis server, preventing premature closure due to inactivity. Available values: `True` or `False`. Default value: `True`.

[Celery](/on-premise/containers-description) configuration variables:

* **CELERY_WORKER_CONCURRENCY** - specifies the number of tasks a single Celery worker can process concurrently. Default value: `6`;
* **CELERY_WORKER_MAX_CONCURRENCY** - specifies the maximum number of tasks a single Celery worker can process. This parameter is used to prevent system overload when a large number of tasks are present. Default value: `12`;
* **CELERY_MEDIA_WORKER_CONCURRENCY** - specifies the number of tasks a Celery worker responsible for processing media tasks (e.g., report generation) can process concurrently. Default value: `2`;
* **CELERY_MEDIA_WORKER_MAX_CONCURRENCY** - specifies the maximum number of tasks a Celery worker responsible for processing media tasks can process. This parameter is used to prevent system overload when a large number of media tasks are present. Default value: `4`;
* **USE_SMART_FILTERS** - enables the use of "smart filters" in Celery. These filters allow for more flexible control over task execution order. Available values: `True` or `False`. Default value: `True`.

The following variables configure data archiving for the CodeScoring system module - OSA Proxy. By default, the variables `OSA_ARCHIVE_THRESHOLD_DAYS, OSA_ARCHIVE_AUTO_CLEANUP_ENABLED, OSA_ARCHIVE_RETENTION_PERIOD_DAYS,` and `OSA_ARCHIVE_CHUNK_SIZE` are commented out. Uncomment them as needed to enable their use.

* **OSA_ARCHIVE_THRESHOLD_DAYS** - specifies the number of days after which a package or container image that has not received requests will be archived. Default value: `14`; 
* **OSA_ARCHIVE_AUTO_CLEANUP_ENABLED** - enables or disables automatic cleanup of OSA archive components. If `True`, the system will automatically delete old archives; if `False`, cleanup is performed manually. Default value: `False`;
* **OSA_ARCHIVE_RETENTION_PERIOD_DAYS** - specifies the number of days that archive packages or container images will be stored before being deleted (when `OSA_ARCHIVE_AUTO_CLEANUP_ENABLED` is enabled). Default value: `30`;
* **OSA_ARCHIVE_CHUNK_SIZE** - defines the size of "chunks" for processing archive components. This parameter can affect the performance and efficiency of the archiving/cleanup process. Default value: `1000`;
* **TASK_RESULT_EXPIRATION_PERIOD** - specifies the duration (in seconds) for which task results will be stored in Redis. After this time, they will be deleted. Default value: `14400`.

The following variables configure the [Judge](/on-premise/containers-description) component, responsible for making decisions regarding blocking components (validation against configured policies within CodeScoring) or container images during operation of the CodeScoring system module - OSA Proxy. These variables should only be uncommented and configured if the OSA Proxy is in use:

* **WEB_CONCURRENCY** - defines the number of workers for parallel validation of components or containers against security policies. Default value: `5`;
* **INDEX_PROXY_URL** - specifies the URL address of the Index Proxy container within the Docker network. No modification required. Default value: `http://index-proxy:8000`;
* **MIN_DATABASE_CONNECTION_POOL_SIZE** - defines the minimum pool of active database connections. Variable is commented out by default and has a value of `0`;
* **MAX_DATABASE_CONNECTION_POOL_SIZE** - defines the maximum pool of active database connections..  Variable is commented out by default and has a value of `10`.