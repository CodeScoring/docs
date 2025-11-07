---
hide:
  - footer
---

# Variable Definitions
This section provides a description of the environment variables necessary for platform installation and configuration, including those detailed in sections [Installing the System in Docker](/on-premise/installation) and [System Operation in Kubernetes](/on-prem-in-k8s).

!!! warning "Modifying values"
    Consult with technical support before modifying any of the optional, non-required variables during installation. Altering default values may impact system performance and operational efficiency.

!!! warning "Avoid using the `#` symbol in parameters. It may be misinterpreted by the system during installation."

## **env.template**

The `env.template` file contains environment variables required to launch a CodeScoring installation using Docker Compose. It defines parameters necessary for the correct execution of the application within a containerized environment.

- **COMPOSE_PROJECT_NAME** - Docker Compose project name, used to prefix the names of resources created by Docker Compose;

- **CODESCORING_VERSION** - specifies the CodeScoring version for installation. The latest version can be found in the [Changelog](/changelog/on-premise-changelog) section;

- **SECRET_KEY** - CodeScoring utilizes a randomly generated string as its installation secret;

- **DJANGO_CSRF_TRUSTED_ORIGINS** - list of domains required for proper CSRF protection. Specifying the protocol is required; for example:
  ```bash
     DJANGO_CSRF_TRUSTED_ORIGINS=http://localhost:18000,https://localhost:8081,https://external_ip:8081
  ```

### Nginx

CodeScoring uses [Nginx](https://nginx.org/en/docs/) for system domain configuration.

- **NGINX_HOST** - specifies the hostname for system accessibility;
- **NGINX_PORT** - specifies the port for system accessibility;
- **SITE_SCHEME** - specifies the data transmission protocol. Default value: `https`.

### PostgreSQL

CodeScoring leverages `PostgreSQL` for data management, processing and storage.

- **POSTGRES_DB** - specifies the database name;
- **POSTGRES_USER** - specifies the database username. When using a custom database, ensure the user has the following privileges: `Superuser, Create role, Create DB, Replication, Bypass RLS`;
- **POSTGRES_PASSWORD** - specifies the database password;
- **POSTGRES_HOST** - specifies the hostname for database accessibility;
- **POSTGRES_PORT** - specifies the port for database accessibility.

### Sentry

Integration with Sentry is disabled by default, `SENTRY_ENABLE = False`. To enable Sentry for error reporting and system event tracking, set `SENTRY_ENABLED = True` and provide the following variables:

- **SENTRY_DNS** - project identifier within Sentry, to which еру data will be sent;
- **SENTRY_ENVIRONMENT** - the environment to which sent data will belong;
- **SENTRY_RELEASE** - release associated with the sent data.

## **app.env**

The `app.env.template` file contains environment variables required to configure the CodeScoring installation. It defines settings for the database, web server, and queues, as well as other critical system parameters.

- **PATH** - specifies the path to executable files, virtual environment (venv) files, and standard system paths;
  ```bash
     PATH=/venv/bin:${PATH}:/jscpd/node_modules/jscpd/bin:/sbin:/bin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:/root/bin
  ```

- **ANALYSIS_IGNORED_PATHS** - specifies exception paths for which manifests and files are not searched and quality analysis is not performed. The following paths are excluded by default:
  ```bash
     **/.git*,**/.git/**,**/fixtures/**,**/tests/**,**/doc/**,**/docs/**,**/samples/**
  ```

- Variables specifying the location of core installation files:
    * **HOME** - value by default: `/ipcs-backend`;
    * **BASE_DIR** - value by default: `/ipcs-backend`;
    * **AZURE_DEVOPS_CACHE_DIR** - value by default: `/ipcs-backend`.

- **INDEX_API_URL** - the URL for the index API, used for knowledge base updates, is `https://index.codescoring.ru`. This parameter should not be modified;

- **INDEX_PROXY_URL** - specifies the URL address of the Index Proxy container within the Docker network. No modification required. Default value: `http://index-proxy:8000`;

- **ALLOWED_HOSTS** - specifies the allowed hosts for Django. Defines the permissible addresses from which Django can accept requests. If a host is not included in the list, Django rejects incoming requests. By default, all hosts are permitted `*`;

- **DJANGO_CACHES_REDIS_URL** - the URL of the Redis server used as the Django caching system. Value by default: `redis://redis:6379/1`;

- **JOHNNY_BIN** - specifies the directory path to the `JOHNNY` executable scanning agent. Value by default: `/agents/johnny-linux-amd64`;

- **HASHER_BIN** - specifies the directory path to the `HASHER` executable agent, responsible for file hashing. Value by default: `/agents/hasher-linux-amd64`;

- **ANALYSIS_ROOT** - specifies the root directory for cloning repositories intended for analysis. Files are copied as temporary files and removed after analysis. Value by default: `/analysis-root`;

- **MEDIA_ROOT** - specifies the directory used for temporary storage of downloaded and uploaded files (including reports, SBOMs, etc.). Value by default: `/analysis-root`;

- **NODE_PATH** - specifies the directory used for containing `node_modules`. Value by default: `/jscpd/node_modules `;

- **REQUESTS_CA_BUNDLE** and **SSL_CERT_FILE** - specifies the location of SSL-certificates used by the installation for secure communication:
  ```bash
  REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
  ```
  ```bash
  SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt
  ```

- **USE_SMART_FILTERS** - enables the use of "smart filters" in Celery. These filters allow for more flexible control over task execution order. Available values: `True` or `False`. Default value: `True`;

- To enable proxy access for the installation to reach the internet or a version control system, uncomment and configure the necessary variables. Provide the proxy URL including the protocol, along with the username and password if necessary. For example:
    - **HTTP_PROXY**
      ```bash
      HTTP_PROXY=http://proxy_user:password@proxy_host:proxy_port
      ```
    - **HTTPS_PROXY**
      ```bash
      HTTPS_PROXY=http://proxy_user:password@proxy_host:proxy_port
      ```
    - **NO_PROXY**
      ```bash
      NO_PROXY=localhost,gitlab.domain.local
      ```

### HUEY

**HUEY** - provides queue and task management functionality. Modifications to the worker count should be performed only in consultation with technical support.

- **HUEY_REDIS_URL** - the URL for connecting to the Redis server used by the Huey. Default value: `redis://redis:6379/0`;
- **HUEY_WORKERS** - the number of `Huey` workers processing the tasks-main queue. Default value: `8`;
- **HUEY_HIGH_PRIORITY_WORKERS** - the number of Huey workers for high-priority tasks. Default value: `8`;
- **HUEY_OSA_PACKAGE_SCAN_WORKERS** - the number of Huey workers for the OSA package scanning module. Default value: `4`;
- **HUEY_OSA_CONTAINER_IMAGE_SCAN_WORKERS** - the number of Huey workers for the OSA package scanning module. Default value: `4`;
- **HUEY_POLICY_WORKERS** - the number of Huey workers for security policy execution. Default value: `4`;
- **HUEY_TQI_WORKERS** - the number of Huey workers for the TQI module. Default value: `4`;
- **HUEY_SECRETS_WORKERS** - the number of Huey workers for the Secret scanning module. Default value: `4`;
- **HUEY_MEDIA_WORKERS** - the number of Huey workers for media upload processing. Default value: `4`;
- **HUEY_SCA_EXTERNAL_SCAN_WORKERS** - the number of Huey workers responsible for the analysis queue, launched via the Johnny agent (`tasks-sca-external-scan`). Default value: `4`;
- **HUEY_WEBHOOKS_WORKERS** - the number of Huey workers responsible for handling webhooks. Default value: `2`;
- **HUEY_WORKER_MAX_TASKS** - the maximum number of tasks that a single Huey worker can process. Default value: `500`.

### Redis

**Redis** is an in-memory data store designed for caching and real-time data management. The following configuration variables define the parameters for interacting with the [Redis](/on-premise/containers-description) server:

- **REDIS_BACKOFF_CAP** - specifies the maximum number of connection retry attempts in case of failure. If a connection cannot be established after this limit, an error will be returned. Default value: `5`;
- **REDIS_BACKOFF_BASE** - base delay (in seconds) between retry attempts upon failure. Default value: `0.08`;
- **REDIS_RETRIES** - specifies the total number of connection attempts to the `Redis` server. Default value: `5`;
- **REDIS_SOCKET_CONNECT_TIMEOUT** - specifies the timeout (in seconds) for `Redis` server operations. If an operation does not complete within this duration, an error will be raised. Default value: `5.0`;
- **REDIS_SOCKET_TIMEOUT** - specifies the timeout (in seconds) for `Redis` server operations. If a connection is not established within this duration, a retry attempt will be made or an error will be raised. Default value: `5.0`;
- **REDIS_SOCKET_KEEPALIVE** - enables a keep-alive functionality to maintain an active connection with the Redis server, preventing premature closure due to inactivity. Available values: `True` or `False`. Default value: `True`;
- **TASK_RESULT_EXPIRATION_PERIOD** - specifies the duration (in seconds) for which task results will be stored in Redis. After this time, they will be deleted. Default value: `14400`.

### Celery

**Celery** is a task queue management system designed to offload core application processes and enhance responsiveness. Variables for configuring [Celery](/on-premise/containers-description) worker settings:

- **CELERY_WORKER_CONCURRENCY** - specifies the number of tasks a single Celery worker can process concurrently. Default value: `6`;
- **CELERY_WORKER_MAX_CONCURRENCY** - specifies the maximum number of tasks a single Celery worker can process. This parameter is used to prevent system overload when a large number of tasks are present. Default value: `12`;
- **CELERY_MEDIA_WORKER_CONCURRENCY** - specifies the number of tasks a Celery worker responsible for processing media tasks (e.g., report generation) can process concurrently. Default value: `2`;
- **CELERY_MEDIA_WORKER_MAX_CONCURRENCY** - specifies the maximum number of tasks a Celery worker responsible for processing media tasks can process. This parameter is used to prevent system overload when a large number of media tasks are present. Default value: `4`;

### Archiving of CodeScoring OSA Data

The following variables configure data archiving for the CodeScoring system service - OSA. By default, the variables `OSA_ARCHIVE_THRESHOLD_DAYS, OSA_ARCHIVE_AUTO_CLEANUP_ENABLED, OSA_ARCHIVE_RETENTION_PERIOD_DAYS,` and `OSA_ARCHIVE_CHUNK_SIZE` are commented out. Uncomment them as needed to enable their use.

- **OSA_ARCHIVE_THRESHOLD_DAYS** - specifies the number of days after which a package or container image that has not received requests will be archived. Default value: `14`;
- **OSA_ARCHIVE_RETENTION_PERIOD_DAYS** - specifies the number of days that archive packages or container images will be stored before being deleted (when `OSA_ARCHIVE_AUTO_CLEANUP_ENABLED` is enabled). Default value: `30`;
- **OSA_ARCHIVE_AUTO_CLEANUP_ENABLED** - Enables or disables automatic cleanup of OSA archive components. If set to `True`, the system automatically removes archived packages after the retention period specified in `OSA_ARCHIVE_RETENTION_PERIOD_DAYS`. If `False`, cleanup is performed manually. Default value: `False`.
- **OSA_ARCHIVE_CHUNK_SIZE** - defines the size of "chunks" for processing archive components. This parameter can affect the performance and efficiency of the archiving/cleanup process. Default value: `1000`.

### Judge

The following variables are used to configure the [Judge](/on-premise/containers-description) component, which is responsible for policy execution within the OSA Proxy service. These variables should only be uncommented and configured if the OSA Proxy is in use:

- **WEB_CONCURRENCY** - defines the number of workers for parallel validation of components or containers against security policies. Default value: `5`;
- **MIN_DATABASE_CONNECTION_POOL_SIZE** - defines the minimum pool of active database connections. The variable is commented out by default and has a value of `0`;
- **MAX_DATABASE_CONNECTION_POOL_SIZE** - defines the maximum pool of active database connections. The variable is commented out by default and has a value of `10`.