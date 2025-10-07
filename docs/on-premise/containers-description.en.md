---
hide:
  - footer
---

# Installation Service Overview

This article provides an overview of the core services forming the system's infrastructure. It details their functionalities and roles in ensuring platform operation.

## Core Components

-   **Frontend:**  the user interface, responsible for system interaction. Displays analysis results, configuration settings, and policy parameters.
-   **Backend:** handles requests from the Frontend and orchestrates the operation of other system components;
-   **Celery-beat:**  scheduler responsible for initiating tasks within the Celery-worker according to a defined schedule;
-   **Celery-worker:** executes tasks received from various services (e.g., Celery-beat and Backend);
-   **Collectstatic:**  responsible for building static files required for system operation;
-   **Fluentd:**  logging agent that aggregates logs from all system components;
-   **Index-proxy:** enhances queries to the index (https://index.codescoring.ru) by adding supplementary data and headers;
-   **Migrate:**  performs system configuration upon startup and updates the database schema;
-   **Osa-api:** facilitates interaction between the core system and the OSA plugin (installed in Sonartype Nexus Repository or JFrog Artifactory) via API;
-   **Osa-registation:**  responsible for scanning and validating packages and container images for policy compliance;
-   **Pgbouncer:**  manages and optimizes database connection requests;
-   **Psql:** a PostgreSQL client used for managing the database;
-   **Redis:**  a caching and message broker, providing data storage and component coordination;
-   **Tasks-high-priority:**  a queue for executing high-priority tasks;
-   **Tasks-main:** a queue for executing standard tasks, such as project scanning, VCS upload, policy deployment, etc.;
-   **Tasks-main-scheduler:** a scheduler for periodic tasks (e.g., scheduled scanning);
-   **Tasks-media:** a queue for uploading and downloading media files;
-   **Tasks-osa-container-image-scan:** responsible for scanning container images conforming to OCI and Docker standards for vulnerability detection;
-   **Tasks-osa-package-scan:** responsible for scanning packages for vulnerabilities;
-   **Tasks-policy:** executes tasks to verify policy compliance;
-   **Tasks-sca-external-scan:** a queue for scans initiated via the Johny console agent;
-   **Tasks-tqi:** the CodeScoring TQI (Technical Quality Index) module agent, analyzing source code quality;
-   **Tasks-secrets:** the CodeScoring Secrets module agent, responsible for identifying sensitive information within code.