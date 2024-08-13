---
hide:
  - footer
---
# Installation guide

1. Install Docker Engine for the desired operating system in accordance with the documentation: <https://docs.docker.com/engine/install/>.
2. Install [Docker Compose](https://github.com/docker/compose/releases/tag/1.29.2) according to the documentation: <https://docs.docker.com/compose/install/>.
3. Log in to the private registry of Docker images of the CodeScoring system using the command `docker login registry-one.codescoring.ru`, with the login and password received from the vendor.
4. Download the archive with installation files received from the vendor and unpack it.
5. Go to the created directory in the console.
6. Copy the template file with settings:

   ```bash
   cp app.env.template app.env
   ```
Usually no changes are required for correct operation. If you need to configure **CodeScoring** to work via a proxy, please follow the [instruction](/on-premise/proxy.en).


7. Copy the template file with secrets:

   ```
   cp.env.template.env
   ```
 If necessary, configure settings in a new file.
 If you do not change the parameters in the file, then by default the system will be available at `http://localhost:8081`.

   - List of domains for proper operation of CSRF protection. It is recommended to list localhost on the internal and external ports, as well as the external domain (or ip:port combination). Specifying the protocol is mandatory, for example:
    - `DJANGO_CSRF_TRUSTED_ORIGINS=http://localhost:18000,https://localhost:8081,https://external ip:8081`
   - Connection parameters to the PostgreSQL database. The base is supplied with the installation. Specifying accesses separately is a precaution and control measure. If you are using your own database, you must ensure that it corresponds to PostgreSQL version 13.0 or higher.
     - `POSTGRES_DB` — database name
     - `POSTGRES_USER` — username. When using your own database, you must ensure that the user has the following rights: **Superuser**, **Create role**, **Create DB**, **Replication**, **Bypass RLS**.
     - `POSTGRES_PASSWORD` - password
     - `POSTGRES_HOST` - the host on which the database is available
     - `POSTGRES_PORT` - port on which the database is available
   - Installation secret
    - `SECRET_KEY` - random string of characters
   - System domain settings
     - `NGINX_HOST` - the host on which the system will be available
     - `NGINX_PORT` - port on which the system will be accessible
     - `SITE_SCHEME` - data transfer protocol, default https
   - Exception paths
    - `ANALYSIS_IGNORED_PATHS` - list of paths that will be ignored by the system during analysis. More details on adding exclusion paths can be found [here](/on-premise/analysis-ignore-paths/)
   - System version
    - `CODESCORING_VERSION` is a required variable. The current version can be found in the [Changelog](/changelog) section

 **Note**: do not use the `#` symbol in the parameters, it may be interpreted incorrectly by the system during installation.

8. Run the CodeScoring installation command (the command must be executed with system superuser rights):

   ```bash
   cd /path/to/docker-compose
   docker-compose -p PROJECT_NAME -f ./docker-compose.yml up -d --force-recreate --remove-orphans --renew-anon-volumes
   ```

 `PROJECT_NAME` - hereinafter the selected project name, by default it uses the name of the current directory

9. To view the logs you can use the command:

   ```bash
   docker-compose -p PROJECT_NAME logs -f
   ```

10. After starting, the service will be available at the configured domain or address `http://localhost:8081`. During the first launch, additional database migrations are performed; the operation may take longer than on subsequent runs.

 **Note**: for the installation to work via the https protocol, you need an external balancer that implements ssl termination.

11. To log in, you must first create a user with administrator rights using the following command (replacing `prefix` with the `PROJECT_NAME` value from step 8):

   ```bash
   docker exec -it prefix-backend-1 python ./manage.py createsuperuser
   ```