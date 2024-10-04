---
hide:
  - footer
---
# Updating the system

To update, you must have current versions of the `docker-compose.yml`, `app.env` and `.env` files, which can be obtained from the vendor.

The `CODESCORING_VERSION` variable inside the `.env` file specifies the required system version. The current version can be found in the [Changelog](/changelog.en) section.

Then you need to follow these steps:

1. Go to the directory with the startup files:
   ```bash linenums="1"
   cd /path/to/docker-compose
   ```
2. Run the container image update command:
   ```bash linenums="2"
   docker-compose -p PROJECT_NAME pull
   ```
3. Restart the installation:
   ```bash linenums="3"
   docker-compose -p PROJECT_NAME down --remove-orphans
   docker-compose -p PROJECT_NAME up -d --renew-anon-volumes
   ```