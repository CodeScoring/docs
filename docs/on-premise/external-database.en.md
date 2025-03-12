---
hide:
  - footer
---

# Running CodeScoring in Docker Compose with an external DBMS
1. You must configure necessary variables in the `.env` file:
    - `POSTGRES_DB`
    - `POSTGRES_USER`
    - `POSTGRES_PASSWORD`
    - `POSTGRES_HOST`
    - `POSTGRES_PORT`
2. For managing the installation, you must apply the `external-db.override.yml` file, which is shipped with `docker-compose.yml` file:
    - Launch CodeScoring:
        ```bash
        docker compose -f ./docker-compose.yml -f `external-db.override.yml` up -d --force-recreate --remove-orphans --renew-anon-volumes
        ```
    - Read logs:
        ```bash
        docker compose -f ./docker-compose.yml -f `external-db.override.yml` logs -f
        ```
    - Stop CodeScoring:
        ```bash
          docker compose -f ./docker-compose.yml -f `external-db.override.yml` down --remove-orphans
        ```

