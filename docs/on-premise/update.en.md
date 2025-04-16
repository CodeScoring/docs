---
hide:
  - footer
---
# Updating the system

## Standard update guide

To update, you must have current versions of the `docker-compose.yml`, `external-db.override.yml`, `app.env` and `.env` files, which can be obtained from the vendor.

The `CODESCORING_VERSION` variable inside the `.env` file specifies the required system version. The current version can be found in the [Changelog](/changelog/on-premise-changelog.en) section.

Then you need to follow these steps:

1. Go to the directory with the startup files:
   ```bash linenums="1"
   cd /path/to/docker/compose
   ```
2. Run the container image update command:
   ```bash linenums="2"
   docker compose pull
   ```
3. Restart the installation:
   ```bash linenums="3"
   docker compose down --remove-orphans
   docker compose up -d --renew-anon-volumes
   ```

## Update guides for versions with changes in configuration

### [2025.13.0] - 2025-03-28

- You must ensure that the version of `Docker Engine` is greater than or equal to 25. To do this, run the `docker version` command on the machine with the installation. If the Docker Engine version is lower than 25, you need to update Docker.
   - **IMPORTANT!** Before updating Docker, you must stop the installation normally.
- You must add the name of the docker compose project to the configuration:
   - Before shutting down the system for updating, you must note the name of the docker compose project in which the installation is currently running.
   - This is either the value passed with the `-p` parameter to `docker compose`, or the name of the directory where the `docker-compose.yml` file was located, by default -- `on-premise` or `on-premise-split-db`
   - This value is used as a prefix in the name of resources created by compose: volumes, containers, networks
   - You must enter this value in the `.env` file with the key `COMPOSE_PROJECT_NAME=`
   - **IMPORTANT!** If you do not do this, the installation will not start. If you enter an incorrect value, volumes with a new prefix will be created, and the installation on the new version will start "from scratch"
   - After the value is added to the `.env` file, requests to `docker compose` can be made without the `-p PROJECT_NAME` option
- You need to download the updated `docker-compose.yml` and `external-db.override.yml` files from the CodeScoring registry and place them in the directory with the compose file.
