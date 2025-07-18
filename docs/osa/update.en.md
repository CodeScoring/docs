---
hide:
- footer
---

# Updating component data

CodeScoring OSA automatically updates component information to ensure that threat and licensing data is up-to-date.

## Update mechanism

Components (packages and container images) that have been requested at least once in the last 14 days are considered **actual**. The system updates data on them every 2 hours, including:

- vulnerability information;
- licenses;
- package or image description.

The update is performed in the background with load balancing in turn.

If a component has not been used for 14 days, it is automatically transferred to the **archived** status. Such components are no longer updated until the next request.

## Deleting data on archived components

By default, data on archived components is saved in the system, but it is possible to enable their automatic deletion. This behavior is controlled by parameters in the application configuration (file `app.env`):

- `OSA_ARCHIVE_THRESHOLD_DAYS` — after how many days without requests the component is considered archived (default: `14`);
- `OSA_ARCHIVE_AUTO_CLEANUP_ENABLED` — enable deletion of data about archived components (default: `False`);
- `OSA_ARCHIVE_RETENTION_PERIOD_DAYS` — retention period for data about archived components before deletion (default: `30`);
- `OSA_ARCHIVE_CHUNK_SIZE` — chunk size for batch processing of components during update (default: `1000`).

## Filtering by actuality

The `OSA → Packages`, `OSA → Container images` and Alerts sections have a filter **Is actual**, which allows you to control the display of components:

- **Yes** — only relevant (updated) components are displayed;
- **No** — only archived (not updated) components are displayed.

By default, only actual components are displayed.