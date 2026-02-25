- [Русский](https://docs.codescoring.ru/on-premise/update/index.md)

# Updating the system

## Standard update guide

Backup

Before performing an update, make sure to create a full backup of the platform.

To update the system, you need the latest versions of the following files: `docker-compose.yml`, `external-db.override.yml`, `app.env`, and `.env`, which can be obtained from the vendor.

In the `.env` file, the variable `CODESCORING_VERSION` specifies the target platform version. The latest available version can be found in the [Changelog](/changelog/on-premise-changelog.en).

Then follow these steps:

1. Navigate to the directory containing the deployment files:

   ```
   cd /path/to/docker/compose
   ```

1. Pull the latest images:

   ```
   docker compose pull
   ```

1. Restart the platform:

   ```
   docker compose down --remove-orphans
   docker compose up -d --renew-anon-volumes
   ```

## Restoring a previous version

If errors occur after the update or the system becomes unstable, you can restore the previous platform version from a backup:

1. Stop the current installation:

   ```
   docker compose down
   ```

1. Clear the database using any preferred method:

   - via Docker:

     ```
     docker volume rm <db_volume_name>
     ```

   - by manually dropping the database (`DROP DATABASE`);

   - or, if using Kubernetes:

     ```
     kubectl delete pvc <db_pvc_name>
     ```

1. Restore the database from the previously created backup.

1. In the `.env` file, set the `CODESCORING_VERSION` variable to the previous version value.

1. Restart the platform:

   ```
   docker compose up -d
   ```

Detailed instructions for creating and restoring backups are available in the [Backup guide](/on-premise/backup.en).

## Update guides for versions with changes in configuration

### [2025.21.0] – 2025-05-21

Starting with this version, the value of the environment variable `$SECRET_KEY` will be used to encrypt sensitive data in the database and changing the value of this variable will require additional operations.

Before upgrading, you must ensure that the `.env` file specifies the correct (**unique, unpredictable**) value of `$SECRET_KEY`, and not the default value.

### [2025.13.0] - 2025-03-28

- You must ensure that the version of `Docker Engine` is greater than or equal to 25. To do this, run the `docker version` command on the machine with the platform. If the Docker Engine version is lower than 25, you need to update Docker.
- **IMPORTANT!** Before updating Docker, you must stop the platform normally.
- You must add the name of the docker compose project to the configuration:
- Before shutting down the system for updating, you must note the name of the docker compose project in which the platform is currently running.
- This is either the value passed with the `-p` parameter to `docker compose`, or the name of the directory where the `docker-compose.yml` file was located, by default -- `on-premise` or `on-premise-split-db`
- This value is used as a prefix in the name of resources created by compose: volumes, containers, networks
- You must enter this value in the `.env` file with the key `COMPOSE_PROJECT_NAME=`
- **IMPORTANT!** If you do not do this, the platform will not start. If you enter an incorrect value, volumes with a new prefix will be created, and the platform on the new version will start "from scratch"
- After the value is added to the `.env` file, requests to `docker compose` can be made without the `-p PROJECT_NAME` option
- You need to download the updated `docker-compose.yml` and `external-db.override.yml` files from the CodeScoring registry and place them in the directory with the compose file.
