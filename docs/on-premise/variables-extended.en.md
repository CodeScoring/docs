---
hide:
  - footer
---

# Variable Definitions
This section describes the variables used during platform installation that are not documented in the [Installation in Docker](/on-premise/installation.en) and [Installation in Kubernetes](/on-premise/installation-in-k8s.en) sections.

**Important!** Before modifying any of the default values for optional variables during installation, consult with technical support.

## **env.template**
By default, Sentry integration is disabled `SENTRY_ENABLE=False`. To enable Sentry for error reporting and system event tracking, set `SENTRY_ENABLED=True` and configure the following variables:

- **SENTRY_DNS** - project identifier within Sentry to which data will be sent;
- **SENTRY_ENVIRONMENT** - the environment to which the sent data will belong;
- **SENTRY_RELEASE** - release associated with the data sent to `app.env`.

## **app.env**

- The `PATH` variable defines the path to executable files, virtual environment (venv) files, and standard system paths;
     ```bash
     PATH=/venv/bin:${PATH}:/jscpd/node_modules/jscpd/bin:/sbin:/bin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:/root/bin
     ```

- Variables specifying the location of core installation files:
    - **HOME** =/ipcs-backend;
    - **BASE_DIR** =/ipcs-backend;
    - **AZURE_DEVOPS_CACHE_DIR** =/ipcs-backend.

- **JOHNNY_BIN** =/agents/johnny-linux-amd64 - Path to the JOHNNY executable scanning agent;

- **HASHER_BIN** =/agents/hasher-linux-amd64 - path to the `HASHER` executable agent, responsible for file hashing;

- **INDEX_API_URL** =https://index.codescoring.ru - URL for the index API required for knowledge base updates. This parameter does not require modification;
 
- **DJANGO_CACHES_REDIS_URL** =redis://redis:6379/1 - the address of the Redis server used for Django caching;

- **ANALYSIS_ROOT** =/analysis-root - root directory for cloning repositories for analysis. Files are copied as temporary files and deleted after analysis (used only for VCS projects);

- **MEDIA_ROOT** =/media-root - working directory for storing downloaded and uploaded files (reports, SBOMs, etc.);

- **NODE_PATH** =/jscpd/node_modules - directory containing `node_modules`;

- **ALLOWED_HOSTS** =`*` - allowed hosts for Django (all hosts are allowed by default).

**HUEY** - task queue service. The number of workers is recommended to be adjusted after consulting with technical support.

* **HUEY_REDIS_URL** =redis://redis:6379/0 - the address to connect to the Redis server used by the Huey library (task queue);
* **HUEY_WORKERS** =8 - count of Huey workers processing `Tasks-main` queues;
* **HUEY_HIGH_PRIORITY_WORKERS** =8 - count of Huey workers for high-priority tasks;
* **HUEY_OSA_PACKAGE_SCAN_WORKERS** =4 - count of Huey workers for the OSA package scanning module;
* **HUEY_OSA_CONTAINER_IMAGE_SCAN_WORKERS** =4 - count of Huey workers for the OSA container image scanning module;
* **HUEY_POLICY_WORKERS** =4 - count of Huey workers for security policy processing;
* **HUEY_TQI_WORKERS** =4 - count of Huey workers for the TQI module;
* **HUEY_SECRETS_WORKERS** =4 - count of Huey workers for the secret search module;
* **HUEY_MEDIA_WORKERS** =4 - count of Huey workers for media upload processing;
* **HUEY_SCA_EXTERNAL_SCAN_WORKERS** =4 - count of workers responsible for the analysis queue launched via Johnny agent`(tasks-sca-external-scan)`;
* **HUEY_WEBHOOKS_WORKERS** =2 - count of Huey workers responsible for webhook processing;
* **HUEY_WORKER_MAX_TASKS** =500 - maximum count of tasks that a single Huey worker can process.