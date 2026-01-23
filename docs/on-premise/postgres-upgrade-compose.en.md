---
hide:
  - footer
---

# PostgreSQL Upgrade in Docker

Upgrading PostgreSQL to a new major version requires initializing the database using the new PostgreSQL version,
creating a dump,
and restoring it. Below is the procedure for CodeScoring installations deployed with Docker Compose.

## Prerequisites

### Disk Space

You must have free disk space of at least **the size of the `db-data` volume**.

Example of disk space usage during an upgrade:

* PostgreSQL versions:
    * source: 13.21
    * target: 15.15
* CodeScoring installation data:
    * ~500,000 packages
    * ~1,200 projects
    * ~22,000 images
* `db-data` volume size: ~50 GiB
* disk space consumption during the upgrade:
    * compressed backup: ~9 GiB
    * compressed dump: ~3 GiB
    * `db-data` size after restore: ~32 GiB

### Planned Maintenance Window

The procedure requires a complete shutdown of CodeScoring.
The actual execution time of upgrade depends on the data volume.

For the example above:

* compressed backup creation: ~11 minutes 45 seconds
* backup restoration : ~2 minutes 30 seconds
* `pg_dump` + `pg_restore`: ~3 minutes 30 seconds
* data transfer between volumes: ~1 minute
* query planner statistics collection: ~1 second

## Docker Compose Override Configuration

The upgrade requires a Docker Compose override file. This file (`postgres-upgrade.override.yml`) is shipped starting
from CodeScoring version 2026.3.1 and is located in the same directory as `docker-compose.yml`.

### Components of the Override File

#### Volumes

* `upgrade-new-db-data` - temporary PostgreSQL `pgdata` for the new version
* `upgrade-dump` - compressed database dump
* `upgrade-backup` - compressed backup

#### Services

* `psql-new` - PostgreSQL of the new version with configuration identical to the `psql` service
* `upgrade-dump` - creates a compressed database dump
* `upgrade-dump-restore` - restores the dump into the new PostgreSQL version
* `upgrade-cleanup-transfer` - performs cleanup and transfers the data into the main `db-data` volume
* `upgrade-analyze-in-stages` - iteratively collects statistics for PostgreSQL Query Planner
* `upgrade-backup` - backup creation
* `upgrade-backup-restore` - backup restoration

## Backup

### Backing Up

Stop CodeScoring:

```bash
docker compose \
  -f docker-compose.yml \
  -f postgres-upgrade.override.yml \
  down
```

Create a backup:

```bash
docker compose \
    -f docker-compose.yml \
    -f postgres-upgrade.override.yml \
    run --rm upgrade-backup
```

### Restoring the Backup

Stop CodeScoring:

```bash
docker compose \
  -f docker-compose.yml \
  -f postgres-upgrade.override.yml \
  down
```

Restore the Backup:

```bash
docker compose \
    -f docker-compose.yml \
    -f postgres-upgrade.override.yml \
    run --rm upgrade-backup-restore
```

Ensure that the `POSTGRES_IMAGE` value in the `.env` file matches the PostgreSQL version **prior** to upgrade:

```dotenv
POSTGRES_IMAGE=postgres:13.23-rev1 # previous PostgreSQL version
```

## Upgrade Procedure

Set in the `.env` file:

```dotenv
POSTGRES_IMAGE=postgres:13.23-rev1 # previous PostgreSQL version
POSTGRES_UPGRADE_IMAGE=postgres:15.15-rev1 # new PostgreSQL version
```

Pull the images required for the upgrade:

```bash
docker compose \
  -f docker-compose.yml \
  -f postgres-upgrade.override.yml \
  pull
```

Stop all services:

```bash
docker compose \
  -f docker-compose.yml \
  -f postgres-upgrade.override.yml \
  down
```

Initialize the new PostgreSQL instance, perform the dump and restore:

```bash
docker compose \
  -f docker-compose.yml \
  -f postgres-upgrade.override.yml \
  run --rm upgrade-dump-restore
```

Stop the services again:

```bash
docker compose \
  -f docker-compose.yml \
  -f postgres-upgrade.override.yml \
  down
```

Transfer the data into the main `db-data` volume:

```bash
docker compose \
  -f docker-compose.yml \
  -f postgres-upgrade.override.yml \
  run --rm upgrade-cleanup-transfer
```

Set the PostgreSQL version for the image used by the `psql` service in the `.env` file:

```dotenv
POSTGRES_IMAGE=postgres:15.15-rev1 # new PostgreSQL version
```

Start statistics collection (no need to wait for completion):

```bash
docker compose \
  -f docker-compose.yml \
  -f postgres-upgrade.override.yml \
  run --rm upgrade-analyze-in-stages
```

Start CodeScoring:

```bash
docker compose -f docker-compose.yml up \
  --detach \
  --force-recreate \
  --remove-orphans \
  --renew-anon-volumes
```

Check the logs and verify that CodeScoring is operating correctly:

```bash
docker compose logs -f
```

Remove the temporary volumes:

* `${COMPOSE_PROJECT_NAME}_upgrade-new-db-data`
* `${COMPOSE_PROJECT_NAME}_upgrade-dump`
* `${COMPOSE_PROJECT_NAME}_upgrade-backup`
