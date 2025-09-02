---
hide:
- footer
---

# Updating component data

CodeScoring.OSA automatically updates information about previously requested components in the background to ensure that the data is up-to-date and that performance is maintained.

## Update mechanism

Packages and images that have been requested at least once in the last 14 days are considered up-to-date, the period can be changed in the settings. The system updates data on such packages every 2 hours, including information on vulnerabilities, licenses, and meta-information on packages.

If a component has not been requested for 14 days, it is automatically transferred to the **archived** status. Such components are no longer updated until the next request.

## Archiving and deletion of components

By default, data on archived components is saved in the system, but it is possible to enable their automatic deletion. This behavior is controlled by parameters in the application configuration (file `app.env`):

- `OSA_ARCHIVE_THRESHOLD_DAYS` — after how many days without requests the component is considered archived (default: `14`);
- `OSA_ARCHIVE_AUTO_CLEANUP_ENABLED` — enable deletion of data about archived components (default: `False`);
- `OSA_ARCHIVE_RETENTION_PERIOD_DAYS` — retention period of data about archived components before deletion (default: `30`);
- `OSA_ARCHIVE_CHUNK_SIZE` — chunk size for batch processing of components during archiving and deletion (default: `1000`).

## Filtering by actuality

The `OSA → Packages`, `OSA → Images` and Alerts sections have a filter **Is actual**, which allows you to control the display of components:

- **Yes** — only actual (updated) components are displayed;
- **No** — only archived (not updated) components are displayed.

By default, only actual components are displayed.