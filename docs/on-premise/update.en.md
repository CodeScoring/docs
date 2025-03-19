---
hide:
  - footer
---
# Updating the system

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
