---
hide:
  - footer
---

# Codescoring On-premise Changelog

### [2025.45.0] - 2025-11-07

#### Added

- <span class="module-tag sca">SCA</span> Added new section `SCA → Project Groups` with aggregated metrics and bulk analysis
- <span class="module-tag sca">SCA</span> Added CSV export of aggregated SCA project data within a group
- <span class="module-tag sca">SCA</span> <span class="module-tag osa">OSA</span> Added component analysis for the RedOS ecosystem
- Added new filtering options for the dependency graph: filtering by parents/children and by technology
- <span class="module-tag tqi">TQI</span> Added display of merge commits count and changed lines in project and author tables, on project/author pages and in charts
- <span class="module-tag tqi">TQI</span> Added option to run author analysis from the first commit
- <span class="module-tag tqi">TQI</span> Added metrics “Code Rate”, “Newness Impact” and “Churn Impact”
- <span class="module-tag tqi">TQI</span> Added “Code Rate” chart on the project page
- Added autofocus for forms: authentication, policy settings, policy ignores, repository managers, registries, projects
- Added indicator showing applied filters
- <span class="module-tag sca">SCA</span> Added API set for aggregated SCA project data (see `/api/swagger` for details)
- <span class="module-tag osa">OSA</span> Added column and filter “Request initiator” in `OSA → Requests`
- Added sample queries with real filters for `/bulk_actions/` endpoints in Swagger
- <span class="module-tag sca">SCA</span> Added “Requirement” column in dependency and scan lists
- <span class="module-tag sca">SCA</span> Added “Requirement” field to SCA PDF report
- <span class="module-tag sca">SCA</span> Added “Groups” column to project list and CSV export
- <span class="module-tag sca">SCA</span> Added “Max fixed version” field on dependency page
- Added filters “Authors’ emails” and “Merged with” on the author merge rules page
- <span class="module-tag secrets">Secrets</span> Added “Status” filter on project page
- <span class="module-tag secrets">Secrets</span> Added “Status” filter on secrets list page
- Added policy ignore section to PDF report
- <span class="module-tag sca">SCA</span> Added “Parents” filter on dependencies page
- Reworked `/health` endpoints in REST services and added checks for celery-beat and celery-worker
- Added links to specific CSPW vulnerabilities in Johnny reports
- <span class="module-tag sca">SCA</span> Added filters on dependency vulnerabilities page
- Added project link to notification about project creation
- Added ability to duplicate a policy
- Added ability to collapse the sidebar
- <span class="module-tag osa">OSA</span> Added links to policies on the blocked component page
- Added “Blocker” column to alert tables and delayed blocking details in block status
- Added expand/collapse button in the secret card
- Added support for missing trailing slash on Johnny download page (`/download`)
- Added ability to automatically prefill OIDC settings using the **Get settings** button (see [OIDC configuration](/on-premise/how-to/oidc.en/) for details)

#### Changed

- Moved technologies column on project lists grouped by author
- Renamed field `Host` to `URL` on container registry configuration page
- Updated filter panel behavior: state no longer persists across sections; panel stays open after applying filters
- <span class="module-tag osa">OSA</span> Removed initial relevance filters from OSA section lists
- Removed password change option for LDAP/OIDC-based users
- <span class="module-tag secrets">Secrets</span> Removed syntax highlighting in Secrets section
- Added multi-select support in filters of vulnerabilities and alerts pages
- Updated display formats of “LDAP Server” and “OIDC Server” fields on user list page
- Fixed API content-type definitions in Swagger
- Updated permissions for project analysis and view in CodeScoring.SCA and CodeScoring.Secrets, see the [User Management](/on-premise/how-to/users.en/)) section for more details
- <span class="module-tag tqi">TQI</span> Improved tooltip data display on project metric charts
- Updated content of “New Version” modal
- Changed side menu structure and content
- Changed policy blocking delay calculation to exact hours instead of days
- Improved Russian translation quality
- <span class="module-tag sca">SCA</span> Moved `sca-tasks` queue to celery worker
- <span class="module-tag sca">SCA</span> Removed unicode encoding of text in SBOM files
- Updated Redis to version 7.4.6

#### Fixed

- Optimized retrieval of fixed-value filters
- Optimized loading of author activity map
- Fixed fields “Type” and “Authorization Type” on container registry edit page
- Fixed formatting of dependency/vulnerability tables in PDF report
- <span class="module-tag osa">OSA</span> Fixed deadlock when scanning multiple packets with the same name but different qualifiers
- <span class="module-tag sca">SCA</span> Improved SCA analysis performance
- <span class="module-tag sca">SCA</span> Improved SBOM generation performance during SCA analysis
- Fixed reset of “Source files” field after rescan
- Fixed policy actions edit behavior
- <span class="module-tag secrets">Secrets</span> Fixed secrets list display
- Fixed display of vulnerable packages in dependency graph
- Fixed filtering of container images by blocking status
- Fixed link to active policies on dashboard

#### Deprecated

- Endpoint `/api/tqi/projects/:id/by_complexity` marked as deprecated. Use `/api/tqi/projects/:id/by_commits` instead
- Environment variable `PLATFORM_API_MAX_PAGE_SIZE` marked as deprecated. Use `CODESCORING_API_MAX_PAGE_SIZE`

#### Removed

- Removed queue `high-priority`
- Removed problematic links from author detail page that caused UI jumps

### [2025.37.5] - 2025-10-27

#### Added

- The maximum number of elements per page in the API is now controlled by the environment variable `PLATFORM_API_MAX_PAGE_SIZE`, the default value is 100. Exceeding this value in the request will cause an error.

#### Fixed

- <span class="module-tag osa">OSA</span> Optimized loading of images from registries
- <span class="module-tag sca">SCA</span> Optimized the API request for getting project dependencies

### [2025.37.4] - 2025-10-15

#### Fixed

- Fixed an issue where duplicate email notifications and Jira issues were generated for policies with the same project in the group and in policy actions
- Fixed processing of policy conditions based on the CVSS3 Severity criterion
- Fixed a 500 error for certain policy stage parameters
- Fixed policy behavior for the "PURL exactly matches" condition
- Fixed an issue with Jira tasks priority setting

### [2025.37.3] - 2025-10-07

#### Fixed

- <span class="module-tag sca">SCA</span> Fixed an error determining paths to the `.csproj` and `project.assets.json` manifests when scanning .NET projects

### [2025.37.2] - 2025-10-03

#### Fixed

- Fixed an issue where erroneous notifications were sent for policies without configured actions
- <span class="module-tag sca">SCA</span> Added a database migration to correct the archived flag for alerts generated by SCA analyses

### [2025.37.1] - 2025-09-25

#### Added

- <span class="module-tag osa">OSA</span> Added ability to deactivate the repository manager
- Added `media-cleaner` queue in the `tasks-media` service
- Updated `celery` library version

#### Changed

- Tasks related to cleaning up obsolete media files from the filesystem moved to a separate `media-cleaner` queue

#### Fixed

- <span class="module-tag osa">OSA</span> Fixed issue with ignoring alerts for OSA packages
- Fixed Index Proxy server error when the activation key owner’s name contains Cyrillic characters
- Optimized repository manager removal
- <span class="module-tag sca">SCA</span> Fixed issue in the "PURL contains" policy: if the checked element was not a valid PURL, the policy did not trigger
- <span class="module-tag sca">SCA</span> Fixed issue when SCA scanning projects with dependencies having identical name, version, and language
- Fixed issue with enabling inactive policies
- <span class="module-tag secrets">Secrets</span> Fixed error when exporting secrets PDF report
- Fixed error when the `error` parameter is missing in the OpenID Connect response

### [2025.37.0] - 2025-09-12

#### Added

- <span class="module-tag sca">SCA</span> Added vulnerability reachability analysis for Java, powered by the Svace call graph builder
- <span class="module-tag sca">SCA</span> Added policy "Vulnerability is reachable"
- <span class="module-tag sca">SCA</span> Added UI display of the reachability attribute for vulnerabilities
- <span class="module-tag sca">SCA</span> Added ability to specify `component manufacturer` data to be placed in the relevant section of SBOM versions `CycloneDX 1.6` and `CycloneDX 1.6 ext`, both at platform level and per project
- Added new environment variables `DEFAULT_PROJECT_MANUFACTURER_NAME`, `DEFAULT_PROJECT_MANUFACTURER_EMAIL`, `DEFAULT_PROJECT_MANUFACTURER_HOMEPAGE`
- <span class="module-tag sca">SCA</span> Added saving of annotated data when importing SBOM
- <span class="module-tag sca">SCA</span> Added support for SBOM export in SPDX format
- <span class="module-tag sca">SCA</span> Added suspicious commit links for vulnerabilities with CSPW identifiers in SBOM
- Added integration with external identity providers implementing the OpenID Connect protocol
- <span class="module-tag sca">SCA</span> Added localization of PDF reports in the SCA module
- Added saving of links for Jira issues and emails created by automatic actions with alerts
- <span class="module-tag sca">SCA</span> Added "Requirement" field displaying the required version range from the manifest in the project dependencies section
- Added optional "Priority" field in the Jira task creation policy action form
- Added ability to create custom templates for emails and Jira tasks in alert actions (default template is built-in)
- Added script for re-encrypting sensitive data when changing the `SECRET_KEY` token
- <span class="module-tag sca">SCA</span> Added "Release Date" field to the project dependencies list
- Added grouping of options in the condition dropdown when configuring a policy
- Added rule dragging on the policy configuration page, and updated their appearance
- Added ability to automatically update the audit log list
- <span class="module-tag sca">SCA</span> Added project search and filters by project, relation, detection type, and environment for individual vulnerabilities on the dependencies page
- <span class="module-tag tqi">TQI</span> Added ability to calculate the number of unique authors in GitLab outside of analysis runs
- <span class="module-tag sca">SCA</span> Added ability to run SBOM scans from scan history to check for new vulnerabilities in historical component data
- <span class="module-tag sca">SCA</span> Added "Max fixed version" field to the dependencies section of the project PDF report
- <span class="module-tag tqi">TQI</span> Added filtering by multiple authors on the "List" and "Activity Map" tabs in the `TQI -> Authors` section
- <span class="module-tag tqi">TQI</span> Added tooltip popup with author’s projects when hovering over author’s project count in the `TQI -> Authors` section
- <span class="module-tag tqi">TQI</span> Added author filter on the project list page in the TQI section
- <span class="module-tag tqi">TQI</span> Added "Number of Authors" chart on the project page in the TQI section
- <span class="module-tag tqi">TQI</span> Added "Author’s Commits" and "Author’s Projects" charts on the author page in the TQI section
- Added ability to rename projects
- Added ability to perform bulk actions on certain entities in the Settings section
- Added ability to stop report generation
- <span class="module-tag secrets">Secrets</span> Added ability to export a CSV report with secrets on the project tab
- <span class="module-tag secrets">Secrets</span> Added ability to generate a PDF report with secrets on the project tab

#### Changed

- <span class="module-tag sca">SCA</span> Improved parsing of VCS links in CycloneDX SBOM
- <span class="module-tag tqi">TQI</span> Improved the mechanism for merging authors by email
- Unified the UI for running alert actions manually and automatically
- <span class="module-tag sca">SCA</span> Commit hash in the project PDF report is now displayed in full
- Reduced maximum number of items in paginated API responses to 100
- Blocked launch of SCA and TQI analyses until code cloning is completed for VCS projects
- Improved messages about inability to run SCA analysis for VCS and CLI projects
- <span class="module-tag osa">OSA</span> Changed detailed package info display on the OSA module package page
- <span class="module-tag tqi">TQI</span> Fixed display of "Change author mapping" button when TQI module is disabled
- Changed `GOST:source_lang` field to `GOST:source_langs` in all exported files
- <span class="module-tag tqi">TQI</span> Added information on the number of months an author committed to the TQI section
- <span class="module-tag tqi">TQI</span> Project parameter "Duration (in months)" now shows integer number of months of project activity
- Removed `internal` field from `/api/activation_keys/` API response
- Split project list API into modules (SCA, TQI, Secrets)
- Migrated base images of Index Proxy, `frontend` service, and `backend / tasks-*` services from Debian bookworm to Alpine Linux
- Improved performance of scan history
- <span class="module-tag sca">SCA</span> Optimized loading of dependency and vulnerability lists
- <span class="module-tag secrets">Secrets</span> Changed display and content of tooltips about inability to train ML model in Secrets module
- Changed "Deferred blocking" filter type on the policies page

#### Fixed

- <span class="module-tag sca">SCA</span> Fixed alert table format in project PDF report
- Fixed link to refactoring candidate projects in the "Dashboard" section
- Fixed reset of selected number of items per page in tables when changing sorting
- Fixed pagination reset when navigating to the same page
- <span class="module-tag sca">SCA</span> Fixed link handling in CycloneDX SBOM
- <span class="module-tag sca">SCA</span> Implemented missing logic for handling alerts when comparing PURL values with case sensitivity
- Fixed auto-generated type names in OpenAPI schema
- Fixed verb forms of policy conditions in English locale
- <span class="module-tag tqi">TQI</span> Fixed project links in "Organization Projects" tab on the author page
- <span class="module-tag tqi">TQI</span> Fixed links to code duplicates in the duplicates map
- <span class="module-tag tqi">TQI</span> Fixed CSV export of author’s projects
- Fixed slow loading of alerts when filter "Repository Manager = N/A" is selected
- Fixed Swagger schema for `/api/activation_keys/` endpoint
- <span class="module-tag sca">SCA</span> Fixed missing options in dependency environment filter when `USE_SMART_FILTERS` is set to `False`
- <span class="module-tag sca">SCA</span> Fixed error when scanning a project with dependencies containing invalid PURLs
- Fixed search in dropdowns for Russian locale
- <span class="module-tag tqi">TQI</span> Fixed "Refactoring candidate projects" and "Intra-project duplicates" widgets on the dashboard
- Fixed search within condition dropdowns on the policy editing page
- <span class="module-tag sca">SCA</span> Fixed behavior of "Dependency is dangerous" policy in SCA module
- <span class="module-tag sca">SCA</span> Fixed policy execution error with condition `PURL exactly_match`

### [2025.29.4] - 2025-08-22

#### Added

- Added granular timeout settings for container image registries: connect, pool acquisition, read, and write
- Added a per-registry requests-per-second (RPS) rate-limit setting for connected container registries

#### Changed

- Changed how parameters for connected container images registries are configured: environment-variable configuration has been removed; all settings are now managed in the UI.

### [2025.29.3] - 2025-08-15

#### Added

- Added task results storage time setting in Redis `TASK_RESULT_EXPIRATION_PERIOD`

#### Changed

- Changed the version of the osa-api Alpine base image from 3.21 to 3.20 to support the latest versions of Dynatrace monitoring

### Fixed

- Fixed the lack of policy alerts in the PDF report download for the first SCA scan
- Optimized database queries when calculating policy ignores
- Fixed the behavior of archiving OSA packages. OSA Packages that were loaded but never requested are now sent to the archive
- Fixed saving the checkbox "Can create CLI projects via API" on the CodeScoring user settings form
- Optimized regular updates of current OSA packages

### [2025.29.2] - 2025-08-05

#### Fixed

- Fixed background package update error in OSA module
- Fixed duplication of vulnerabilities in PDF project report
- Added timeout settings for Redis connections via variables `REDIS_SOCKET_CONNECT_TIMEOUT`, `REDIS_SOCKET_TIMEOUT`, `REDIS_SOCKET_KEEPALIVE`

### [2025.29.1] - 2025-07-22

#### Fixed

- <span class="module-tag sca">SCA</span> Optimized loading of dependencies page in SCA module
- Fixed error when changing LDAP settings

### [2025.29.0] - 2025-07-18

#### Added

- <span class="module-tag sca">SCA</span> Added the ability to view the results of SCA analysis of a project from the [scan history](/sca/scan-history.en)
- Added the ability to customize the export of SBOM and PDF files (/sca/export-results.en)
- Added the ability to [manually create a task](/on-premise/how-to/policies.en) in the task manager and send letters for selected alerts
- Added the ability to configure [deferred blocking](/on-premise/how-to/policies.en) in policies
- Added the ability to apply [policy ignores](/on-premise/how-to/ignores.en) to project groups
- Added a new [Security Manager role](/on-premise/how-to/users.en)
- <span class="module-tag sca">SCA</span> Added a condition for the `Dependency is a descendant` policy to search for child dependencies of a selected package at any level of the dependency graph
- <span class="module-tag sca">SCA</span> Added the `Max fixed version` column in the dependency table
- <span class="module-tag sca">SCA</span> Added the ability to download the current version of the Johnny binary agent directly from the platform
- Added the "Technology" column to the alert list export
- Added pop-up notifications with the analysis result upon its completion
- Added search in drop-down list of criteria in policy creation and editing forms
- Added duplicate block of buttons after the group of conditions in policy creation and editing forms
- Added ability to expand the policy conditions management block
- Added [settings for the format of date and number output](/on-premise/how-to/user-profile.en) in the UI
- <span class="module-tag sca">SCA</span> Added legend for the project dependency graph
- <span class="module-tag sca">SCA</span> Added analysis identifier to webhooks associated with the completion of SCA analysis
- <span class="module-tag osa">OSA</span> Added output of the archive/activity flag for OSA packages, container images and alerts
- Added check for data presence when exporting a PDF report
- Added error handling when trying to download a file that was deleted due to expiration of the storage period

#### Changed

- The `tasks-media` queue has been transferred to Celery. The number of workers is controlled by the variables `CELERY_MEDIA_WORKER_CONCURRENCY` (minimum, default is 2) and `CELERY_MEDIA_WORKER_MAX_CONCURRENCY` (maximum, default is 4). The variable `HUEY_MEDIA_WORKERS` has been removed
- <span class="module-tag osa">OSA</span> The OSA background package update mechanism has been optimized. Only relevant packages are updated. By default, packages requested in the last 14 days are considered relevant, the parameter is configured in the platform settings
- Improved error messages when checking the availability of repositories via SSH
- Improved display of the list of events in the "Webhooks" section
- <span class="module-tag secrets">Secrets</span> Improved logic for displaying the ML model management section in the Secrets module
- Optimized the algorithm for launching policy recalculation when updating vulnerabilities: launch occurs only when data that affects policies changes
- Optimized loading of pages with images and alerts
- Changed the choice of a secure protocol for connecting to a mail server from checkboxes to a field with a drop-down list
- Unified action buttons in sections with entity tables
- Updated the OpenAPI specification in terms of error handling
- <span class="module-tag osa">OSA</span> Changed the base image in the OSA API service from Debian bookworm to Alpine
- Updated the pgbouncer image to switch from libevent to c-ares as a DNS backend for support SOA record resource types and EDNS0 protocol
- <span class="module-tag secrets">Secrets</span> Updated gitleaks version for Secrets module to 8.27.0
- Updated Redis image from 7.0.12 to 7.4.3
- Updated PostgreSQL image from 13.4 to 13.21
- <span class="module-tag sca">SCA</span> Updated Johnny version on platform to 2025.29.1

#### Removed

- Removed `HUEY_MEDIA_WORKERS` variable

#### Fixed

- Fixed search on author profile page in "Organization Projects" section
- <span class="module-tag sca">SCA</span> Fixed image hash validation error when passing value via `--hash` parameter when scanning image via Johnny
- Fixed some API schema inaccuracies in Swagger
- <span class="module-tag osa">OSA</span> Fixed error processing list of entities from Docker Registry when receiving `null` instead of empty list
- Fixed error processing image signature files with `.sig` extension and `.att` when working with container registries
- <span class="module-tag tqi">TQI</span> Fixed an error on the "Similar Authors" tab on the author profile page in the case of authors without certain technologies
- Fixed an error with incomplete output of connected version control systems when creating a VCS project
- Fixed the output of a long file name in the list of exported files
- Fixed the output of the "Until" field in the policy ignore modal window
- <span class="module-tag sca">SCA</span> Fixed the reset of the dependency graph state when switching to another browser tab
- Fixed problems updating data on the page after editing some entities
- <span class="module-tag osa">OSA</span> Fixed deadlocks when using multiple instances of the OSA Registration service
- Fixed an error when editing the connection to the Jira task manager
- Fixed incorrect hiding of sensitive data in an error when cloning a project
- Fixed the display of selected parameters in the policy condition
- <span class="module-tag osa">OSA</span> Fixed the output of the list of authors on the page with detailed information about the package blocking in the OSA module
- Fixed saving policies when changing certain conditions

### [2025.21.2] - 2025-06-18

- Optimized data migration process when updating the project scan schedule

### [2025.21.1] - 2025-06-04

- Optimized CSV report export in the "Dependencies" section
- Optimized memory utilization when exporting PDF reports

### [2025.21.0] - 2025-05-21

- Added new policy condition "Dependency is Protestware". Threats that are associated with protest software are marked with the CSPW identifier
- Added interface adaptability for different screen sizes, the system is now easier to use on tablets and mobile devices
- Added the ability to specify the name of the VCS project and create multiple VCS projects for one repository
- Added the ability to run SCA analysis for a VCS project by selecting a specific branch or tag without changing the default branch
- Changed creation and editing of policies: now it is possible to specify a project regardless of selected groups and owners, the policy will work for all selected groups and projects
- Added a link to the repository manager to the package page in OSA
- Added filter by technology and corresponding column in the "Alerts" section, the column is hidden by default
- Added filter by project group in "Alerts" and "Dependencies" sections
- Added multiple selection for "Attack Surface", "Security Function", "Found", "Dependency Environment" filters in project dependencies settings
- Added "Note" column to the "Policy Ignores" section, the column is hidden by default
- Added filters "Type", "Authorisation type", "Active" and search by name and address to "Registries" section
- Added time zone in PDF report generation date
- Added limitation of the number of login requests from the same user, 10 attempts per minute by default
- Added TLS encryption support for PostgreSQL and PgBouncer when installing via docker compose
- Added filters to SCA scan history page
- Updated project and author activity maps, as well as complexity and duplicates map: changed image file name when downloading, removed captions in cells, improved scaling, fixed rendering errors
- Changed handling of sensitive data such as tokens, keys and passwords in API and UI of the system
- Changed the logic of how filters work throughout the system. Filters are now loaded on demand (lazy load), optimised part of requests. When returning to the page, filters are not loaded again
- Changed adding a user or project to a group: existing ones will not be offered for selection
- Updated OpenAPI specification for the References field in the `VulnerabilitySummaryDetail` type
- Added information to metadata tools section when uploading SBOM in CycloneDX format
- Changed autovacuum settings to lower thresholds for tables with frequent updates
- Added `max_client_conn` setting for pgbouncer, the parameter regulates the total number of connections, increased default value
- Changed validation of phone number field to support international numbers
- Changed output of parent dependencies in the project dependencies table, only the first 5 values are shown
- Changed output of events in the webhooks table, only the first 5 values are shown
- Fixed sorting of image vulnerabilities by Fixed Version
- Fixed export of project data to CSV, reduced memory consumption
- Added masking of sensitive data in platform logs
- Improved Russian localisation
- Fixed error output in UI when trying to create an existing project
- Fixed access rights restriction errors
- Fixed animation when switching between tabs of the project editing form

### [2025.13.3] - 2025-05-07

- The behavior of policy ignores has been fixed when alerts outside the scope of ignoring projects and images were ignored
- Fixed an issue where a project could not be saved due to the new format of project scan schedules

### [2025.13.2] - 2025-04-23

- Added view of detailed information on vulnerabilities for platforms that only have the OSA module
- Added checking for connection to Gerrit via SSH
- Optimized memory utilization when calculating policies

### [2025.13.1] - 2025-04-08

- Added the ability to specify days of the week and time in the analysis launch schedule for the SCA and Secrets modules
- Changed the approach to specifying the date of the last artifact request in OSA to avoid increased disk load

### [2025.13.0] - 2025-03-28

- Support for specifying a database schema other than `public` via the `DATABASE_SCHEMA` environment variable has been discontinued. If this configuration is used, please refer to the [how-to](/on-premise/external-database).
- The CodeScoring configuration in Docker Compose has been deeply rewritten and modernized. Please read the [how-to](/on-premise/update/#2025130-2025-03-28) before upgrading.
- Added support for Swift Package Manager ecosystem manifests
- Added granular projects configuration and groups in policy actions to send notifications to different email addresses or different projects in Jira within a single policy
- Added modes for sending email notifications and creating issues in Jira within policy actions: one per alert or digest per scan
- Added processing of secrets analysis results when working with a module via CLI using the johnny console agent
- Added the ability to recalculate secrets information in the ML model management section
- Added basic work with the history of secrets scans
- Added the "does not match" operator in dictionary policies
- Added module icons to the system menu
- Added hiding of the API token on the user settings page
- Added returning of the uuid of the blocked component in the OSA API in a separate field
- Added detailed display of the password validation error when creating a new user
- Added detailed display of the password validation error in the password change form
- Fixed the filter by project name in the `Settings -> Policy ignores` section
- Fixed display of package links in policy conditions in the Alerts section
- Fixed system behavior when receiving results from johnny without the `--save-results` key specifying a project, now the results will not be saved
- Fixed incorrect sorting by project name in project lists
- Added hiding of mutually exclusive Access Token and SSH Key fields in different connection settings to VCS to avoid incorrect validation
- Fixed incorrect display of the environment on the dependency graph
- Fixed the activity of the analysis start button for CLI projects without loaded dependencies
- Fixed an error in the logic of applying policies when using groups
- Optimized the speed of the policy page
- Fixed an error with possible duplication of vulnerabilities
- Optimized the mechanism for updating vulnerability information to reduce the number of entries in the database

### [2025.7.2] - 2025-03-14

- Fixed OSA API service crash when accessing a non-existent key in Redis in version 2025.7.0
- Fixed display of pages with OSA module scan results if the package was requested periodically with an interval of less than a week
- Increased the period for requesting code updates in VCS projects to reduce the load on VCS

### [2025.7.1]-2025-03-07

- Fixed error in the operation of the mechanism of ignoring the Alerts
- Optimized background policy re-scan for OSA when updating information about vulnerabilities
- Fixed error in the operation of integration with OSSIndex
- Optimized the work of updating the date of the last request of the package or image to reduce the load on the disk

### [2025.7.0] - 2025-02-14

- Added ability to select a license in the dependency fields management UI
- Added ability to select a group when [creating a policy](/on-premise/how-to/policies.en/)
- Added ability to select projects in a policy without first selecting an owner
- Added a setting for enabling and disabling cloud resolve for projects in the SCA module
- Added advanced settings for VCS projects: ignores, enabling/disabling recursive search
- Changed the grouping and display of project settings
- Added the output of the Index API availability metric to the standard [platform metrics tracking mechanism](/on-premise/how-to/metrics.en/)
- Added a setting via the environment variable `INDEX_API_FAILURE_RATE_THRESHOLD`, which determines how much failed requests to the Index API in the OSA module must occur before the system considers the index unreachable
- Added the `Skip TLS Verification` setting when [creating a connection to the image registry](/on-premise/how-to/registries.en/)
- Added [webhooks](/on-premise/how-to/webhooks.en/) for Secrets module events
- Added pre-connection to Postgres when the connection is lost in the osa-registration service
- Updated maps in the TQI module. Rendering has been moved to the frontend, more convenient navigation has been implemented, and additional filters by period and number of projects have been added
- Optimized dependency list in SCA modules
- Optimized request list in the OSA module
- Fixed saving of filter state and pagination settings in the dependency editing table
- Fixed a validation error when autofilling the Instance URL field when creating connections to VCS
- Fixed an error setting up columns in the project list in the SCA module
- Fixed translation errors when using numerals
- Fixed links to dependencies and vulnerabilities in the Email digest and Jira Issue
- Fixed incorrect behavior while testing connection configuration for Email server settings
- Removed the API method `get_package_info`

### [2024.52.2] - 2025-02-26

- Fixed the operation of the alert ignoring mechanism

### [2024.52.1] - 2025-01-24

- Fixed a bug that could lead to a sharp increase in container image scanning time
- Changed the approach to background policy recalculation for container images in the OSA module to optimize speed and resource consumption
- Added a separate queue for background package rescanning in the OSA module to unload the main queue

### [2024.52.0] - 2024-12-28

- Added separation of modules in the menu
- Added separate project lists in the SCA, TQI and Secrets modules
- Added support for the Conda ecosystem
- Added editing of container image dependencies for SBOM export
- Added multiple selection of projects and images in the creation of Policy Ignore
- Added the ability to specify a policy stage when creating a CLI project
- Added the ability to filter lists in the Vulnerabilities, Policy Alerts and Projects sections by multiple Severity, Policy and Technology values
- Added saving and displaying SBOM editing in the audit log
- Added displaying the name of CLI projects in the audit log
- Added filter by image tag to Container Images section
- Added dates of first and last SCA scan to projects list
- Implemented ability to add projects to existing groups via API, interface and console agent options for users with active flag **Can create CLI projects via API* *
- The full display of the secret in the section has been moved to a separate Secrets window
- Updated translation into Russian
- Added validation of API token update
- Changed the format of the recommendation field in the SBOM CycloneDX format export to correctly handle cases where a vulnerability affects several versions of the same library
- Fixed an error creating a task in Jira when a policy is triggered
- Fixed an error filtering by status in Policy Alerts section when resetting filters
- URL input errors are now shown after input is complete

### [2024.48.1] - 2024-12-04

- Fixed a bug when starting an image scan from the UI

### [2024.48.0] - 2024-11-30

- Added the ability to send webhooks for key events in the system
- Added the ability for the admin user to specify values for the SBOM fields `GOST:attack_surface`, `GOST:security_function` and links to VCS, the values will be taken into account when unloading SBOM in the `CycloneDX 1.6 Ext` format
- Updated display of matched criteria in alerts
- Added the ability to display the Source files column in the Vulnerabilities section table and in the Affected dependencies table on the vulnerability page
- Added hints for the user in the policy creation and editing form
- Added links from the project scan results page to the project settings page and back
- Improved link typification in the `externalReferences` section when unloading SBOM in CycloneDX
- Accelerated loading of the license distribution graph
- Changed the technology distribution graph on the main page of the system and on the SCA tab for VCS projects, the calculation is based on the project dependency technologies based on the results of compositional analysis
- Fixed the logic of policies when combining several conditions for the environment (`env`) of a dependency
- Fixed import of SBOM files in CycloneDX format containing information in the `components[i].evidence.identity` fields
- Fixed translations into Russian for numerals and some dictionaries of the system
- In emails with alert notifications, the vulnerability identifier is now a hyperlink

### [2024.44.3] - 2024-11-13

- Fixed CVSS Score and CVSS Severity inconsistency when a vulnerability is present in multiple data feeds

### [2024.44.2] - 2024-11-07

- Accelerated loading of `Components -> Packages` and `Components -> Container Images` sections

### [2024.44.1] - 2024-11-05

- Added beta version of interface localization into Russian, language switching is available on the user profile page
- Added support for CycloneDX 1.6 specification for SBOM import and export
- Added export into CycloneDX 1.6 Ext format with the addition of the fields `GOST:source_lang`, `GOST:attack_surface` and `GOST:security_function` to comply with FSTEC of Russia requirements. The fields are filled with the default value
- For new SCA analysis results, the ability to select the CycloneDX version when downloading SBOM has been added
- Improved SBOM export into all CycloneDX versions: added information about the scanned application to `metadata->component`, added information about the platform version to `metadata->tools`, updated the outdated format for indicating the authorship of components for CycloneDX versions 1.5 and 1.6, fixed the format of the component license. Changes are available for new SCA analysis results
- Added display of dependency tree in PDF reports
- Added collection of data on malware from [GitHub Security Advisory](https://github.com/advisories?query=type%3Amalware)
- Added “Dangerous package” classification and corresponding policy for OSA module. Packages with known Malware and certain types of CWE in vulnerabilities are marked as dangerous
- Added additional dates to the package view page in the OSA module: dates of the first and last request to the package, date of the last policy calculation, and date of updating information on the package
- Added the `Source files` value to the vulnerability dump in the Vulnerabilities section
- Added policy conditions for case-sensitive search of a string in the package name `contains (case sensitive)`, and changed the names of case-insensitive conditions from `icontains` to `contains (case insensitive)`
- Added the `Has vulnerabilities` filter and a column with the number of vulnerabilities when viewing the list in the Components and Container images sections of the OSA module
- Added the ability to run mass analysis of secrets in Workmode
- Added processing of the new manifest type `application/vnd.docker.distribution.manifest.list.v2+json` when analyzing container images
- Added a table with projects that use the component to the component view page in the OSA module
- Added a new template `%USER_DN%` for the filter by groups when configuring LDAP
- Added the ability to start a package analysis from its page in the Components section
- Added a notification about the expiration of the activation key
- Fixed key columns in tables during horizontal scrolling
- Implemented a periodic restart of background tasks to optimize memory consumption
- Stabilized the launch time of scheduled analyzes
- Optimized updating of information on the secrets list page when marking up results
- Fixed errors in the behavior of some lists with multiple selection
- Fixed the display of user group records in the LDAP integration diagnostics section
- Fixed loading a list of container images from registries if metadata on some images could not be obtained
- Fixed errors in the operation of filters in the Secrets section table
- Fixed an error when trying to filter dependencies by `License Category = N/A`
- Fixed display of paginators on the SCA and TQI tabs on the project page
- Changed the configuration of connection pools to PostgreSQL. To optimize the memory consumption of the platform, a division of connections to Postgres into connections through connection pools operating in session and transaction mode has been implemented. If the system is installed via docker compose, it is necessary to update the `docker-compose.yml` file. When using custom connection pool configurations, please consult with the support service on the update process.

### [2024.40.1] - 2024-10-09

- Fixed display of repository branch/tag when selecting it in project settings

### [2024.40.0] - 2024-10-04

- Added beta version of the new Secrets module, access for testing can be requested from the vendor
- Implemented the dependence of filters on each other in the sections Policy Alerts, Dependencies and Vulnerabilities
- Added a display of Has Exploit to the vulnerabilities table and on the vulnerability page
- Implemented the ability to hide the filter block in sections with filtering
- Added Policy Alerts to PDF report on the project
- Added the possibility of sorting by the Fixed Version column in the vulnerabilities table
- Added sorting vulnerabilities in the PDF report
- Fixed recalculation of the dates for the criteria of the Dependency Age (Days) policy
- Fixed timing issue of the launch of daily analysis
- Fixed LDAP group matching if several LDAP groups are matched with one group in Codescoring
- Fixed incorrect display of the active tab on the dependency page
- Fixed the display of licenses in the Policies settings
- Fixed Last Updated field value for CLI projects
- Optimized the search for the names of groups in LDAP

### [2024.38.0] - 2024-09-18

- Fixed CSV export in the Dependencies section

### [2024.37.0] - 2024-09-12

- Added team table to the project page
- Added ability to export to CSV in the Components section
- Accelerated SCA analysis in cases where the same package occurs multiple times within a manifest
- Fixed an error when generating a project report if there are incorrect PURLs in SBOM.

### [2024.35.0] - 2024-08-29

- Added a new condition for policies - Dependency Vulnerabilities Count
- Added OSA metrics to the dashboard
- Added the number of blocking Policy Alerts to the dashboard
- Added the ability to run a project scan in the UI in parallel with the scan in Johnny
- Added a column with the number of Policy Alerts in the `Settings -> Policies` subsection
- Added a filter by the date of the last request in the `Components -> Container Images` subsection
- Implemented background generation of downloaded files and accelerated their download
- Implemented pagination when interacting with LDAP
- Accelerated work of the Dependencies section
- Supplemented the list of repository types so that all repositories, including unsupported ones, are displayed in the Repository Managers section

### [2024.32.0] - 2024-08-09

- Added support for Bearer authorization for Container Registries
- Added implementation of searching for LDAP groups through user attribute records
- Added repository type output in the Repository Managers section in cases where it is not supported
- Improved tools for diagnosing LDAP integration
- Fixed comparison of system package versions when calculating policies
- Speeded up the work of the `Components -> Packages`, `Components -> Requests` and Repository Managers sections
- Improved OSA requests cleanup

### [2024.29.1] - 2024-07-17

- Added an ability to specify a license for CLI projects when creating via the API
- Fixed an error while displaying Matched Criteria in the Policy Alerts section
- Fixed the color of the warning level on the blocked component page

### [2024.28.0] - 2024-07-09

- Implemented a new mechanism of policy conditions with the formation of logical expressions
- Optimized memory consumption when generating PDF reports
- Searching LDAP user attributes is now case insensitive
- Fixed sorting in the vulnerability table on the Container Image viewing page
- Fixed calculation of block status in OSA for selected components in a policy

### [2024.25.0] - 2024-06-18

- Added setting for matching LDAP group and user access level
- Added the ability to ignore Policy Alerts by PURL
- Added checking the availability of the Container Registry before starting an image scan in the interface
- Added description of OSA API methods in Swagger
- Improved platform stability in older browsers
- Accelerated loading of the `Components -> OSA Packages` section
- Fixed display of graphs and pagination of the commit table on the TQI tab of the project page
- Fixed the request date filter in the `Components -> Packages` section
- Fixed changing of an obsolete token for VCS
- Removed deprecated API method `/api/dashboard/security/top5_vulnerable_projects/`

### [2024.24.0] - 2024-06-11

- Optimized memory usage when loading vulnerability descriptions

### [2024.22.2] - 2024-05-28

- Added the ability to run platform with the readOnlyRootFilesystem option in Kubernetes
- Improved search speed in the Dependencies, Policy Alerts and Components sections
- Improved sorting by the Dependency/Package field in the Policy Alerts section
- Added cleaning of temporary files after forced completion of image scanning
- Fixed missing Distribution by technology graph in CLI projects after the first scan
- Fixed an error in generating a PDF report if there were links in PURL

### [2024.22.1] - 2024-05-27

- Changed the status in OSA plugins when receiving an unknown Repository Manager

### [2024.22.0] - 2024-05-27

- Fixed a bug when displaying the `Settings -> Workmode` section

### [2024.21.0] - 2024-05-24

- Added the ability to connect repository managers through the interface
- Added OSA package filter for repository managers and individual repositories
- Added policy settings for specific repositories
- Improved LDAP group mapping

### [2024.17.2] - 2024-04-27

- Added the package release date to the page in the `Components -> Packages` section
- A hint has been displayed for the Plugin mode column in the `Components -> Requests` section
- Fixed an error in opening the Policy Ignore editing page with a specified Container Image
- Fixed generation of links to commits in Gitlab

### [2024.17.1] – 2024-04-23

- Added the ability to specify the OSA type of the component for which the policy will be applied
- Added Group mapping section for configuring LDAP groups
- Added mapping of LDAP groups to internal CodeScoring groups
- Added links to vulnerabilities and licenses in the Matched criteria field of the Policy Alerts section
- Added search to the policy condition by the Technology field
- Added the Matched criteria field to the Policy Alerts table on the project page
- Returned display of the SBOM loading icon
- The License and Vulnerability columns in the Policy Alerts tables are now hidden by default
- Accelerated loading of the `Components -> Requests` section
- Improved periodic cleaning of OSA queries from the database
- Fixed redirect when deleting a user
- Fixed formation of Dependency Name from PURL

### [2024.15.0] - 2024-04-09

- Added the ability to configure multiple LDAP integrations
- Added Matched criteria output in the Container images section
- Added columns and filters Scan schedule, Scan with hashes to the Projects section
- Added columns and filters Scan schedule, Excluded from analysis to the `Settings -> Projects` section
- Added information about the previous user access level to the Audit Log
- Added support for non-standard ports for SSH when adding VCS
- Added percentage of similarity between authors in the Authors section
- Implemented periodic cleaning of OSA queries in the database
- Returned the `dev` policy stage to the project settings

### [2024.13.0] – 2024-03-27

- Fixed re-running of periodic tasks in the queue
- Fixed long wait for response from Index API in case of connection interruption

### [2024.12.0] – 2024-03-22

- Added Components section, which includes lists of OSA components and requests
- Added the Vulnerabilities field to the CSV project report
- Added pool_used metric to view busy connections from the pool
- Optimized launching analysis and unloading SBOM CLI project
- Fixed ignoring the load full images list flag when creating or updating a Registry
- Fixed display of the number of active policies in the Dashboard section
- Fixed missing options for CVSS2 Authentication policy
- Fixed an error when calculating Policy Alerts of a policy with the CVSS Score condition

### [2024.11.0] – 2024-03-18

- Added information about the package to the Policy alerts and Vulnerabilities sections on the page of the image blocked in OSA
- Added Group filter in the Vulnerabilities section
- Renamed the Blocks build policy attribute to Blocker
- Optimized analysis of CLI projects in situations where the dependencies of the analyzed project are often found in other projects
- Accelerated loading of information about similar authors
- Fixed display of connections at the same level in the project dependency graph

### [2024.10.0] – 2024-03-06

- Fixed the disappearance of the HTML upload button for charts
- Changed the formatting of commit messages in the project commits table
- Fixed display of metrics on project pages for which analysis was not carried out
- Fixed availability of downloading the PDF report and SBOM depending on the status of the project analysis

### [2024.9.1] – 2024-02-29

- Fixed case insensitivity when creating users from LDAP

### [2024.9.0] – 2024-02-28

- Added display of analysis status in history for projects and images
- Added display of commit messages in projects for past periods on the TQI page
- Expanded SCA metrics on the project page
- Fixed behavior when loading and scanning images without tags
- Fixed updating information about Container registry after saving changes
- Fixed inability to view project commits for the last week
- Fixed display of metrics on project pages for which analysis was not carried out
- Fixed integration with LDAP
- Reduced timeout when checking Registry availability

### [2024.8.0] – 2024-02-22

- Fixed launch of general analysis of clones
- Fixed display of paths to files inside clones
- Fixed transitions to lists of clones from the clone map
- Fixed display of the author when there is no email field
- Fixed display of hidden columns in tables
- Fixed display of the `block_status` variable in the list of the Container Images section
- Fixed updating the list of images when there are images in the registry without specifying the platform
- Removed empty value when selecting in filters
- Removed automatic restart of scheduled scanning in case of a crash

### [2024.7.0] – 2024-02-16

- Added vulnerabilities from the FSTEC BDU
- Implemented a page to display information about a component blocked in OSA
- Implemented launch of author analysis for one project
- Implemented the launch of clone analysis for one project
- Added a table of commits on the TQI tab of the project page
- Fixed filter for vulnerabilities in the Policy Alerts section
- Fixed transition to the policy page from the Dashboard section

### [2024.5.0] – 2024-02-02

- Updated system UI
- Added new SCA metrics on the project page
- Added policy condition to match PURL [regular expression](https://docs.python.org/3/library/re.html#regular-expression-syntax)
- Added policy condition for searching a text string in PURL
- Added a check for hidden characters when entering the activation key
- Fixed filter by technology in the Projects section
- Fixed display of technologies for CLI projects in the Projects section
- Optimized policy recalculation mechanism
- Clarified error messages about connecting to GitLab
- Changed the orientation of the Vulnerabilities section in the PDF project report

### [2024.2.0] – 2024-01-12

- Added information about the architecture of scanned images
- Added Group filter on the projects page
- Added support for CycloneDX 1.5 specification when importing SBOM
- Added new blocking statuses for OSA components
- Improved OSA performance
- Accelerated loading of Complexity map in the Projects section
- Removed scans stuck in in progress status
- Fixed report export to PDF when actively scanning a project and for CLI projects

### [2023.49.0] – 2023-12-08

- Added the ability to export a PDF report with the results of scanning a project
- Added support for Rust dependency analysis via Cargo manifests
- Added the ability to clone a repository via SSH
- Added new VCS type "Other Git"
- Added display of the number of vulnerabilities found in the list of the Projects section
- Added search for nested vulnerabilities (those with entries in different feeds) in the Vulnerabilities section
- Added setting for displaying project ID in the `Settings -> Projects` section
- Added null values to Prometheus OSA API metrics
- Automatic analysis after cloning a VCS project has become optional
- Fixed an error when sorting the table by the CVSS3 Attack Complexity field in the Vulnerabilities section
- Fixed incorrect operation of OSA with packages that have uppercase in the version

### [2023.48.0] – 2023-11-22

- Reduced the size of supplied Docker images CodeScoring
- Added the Matched criteria parameter with the reason for the triggered policy to the Policy alerts section
- Added a new type of Container registries "Other"
- Added the right for users with User access level to create CLI projects via the API
- Added Prometheus metrics on scan status and component blocking status in OSA
- Added password and token hiding in Jira connection settings
- Removed duplicate vulnerabilities in SBOM that have different affected versions
- Removed obsolete endpoint API `/integration_api/v1/`
- Analysis work with a large number of Policy ignores has been accelerated
- Fixed UnsafeOption error when working with Azure and Bitbucket
- Fixed display of available values for the Container images filter in the Policy alerts section
- Fixed search by dependency in the Policy alerts section
- Fixed display of the CWE filter in the Vulnerabilities section

### [2023.44.0] – 2023-10-31

- Added saving filters between tabs in the Policy alerts section
- Fixed display of resolved Policy alerts on the project page

### [2023.43.0] - 2023-10-27

- Added support for scanning proxy Docker repositories based on Sonatype Nexus and JFrog Artifactory
- Added Digest and tags on the container image page
- Added background update of vulnerabilities and background operation of policies for components from container images
- Added [metrics of number and time of requests](/on-premise/how-to/metrics.en) for CodeScoring OSA
- The platform queue metrics have been supplemented - now you can separately view the types of analyzes in the queue
- Added a new policy condition – age of vulnerability
- Added the ability not to automatically download the list of images when adding a Container Registry
- Fixed opening the Policy Ignore view page
- Fixed display of git error 128 when working with VCS

### [2023.41.0] - 2023-10-09

- Running CodeScoring no longer requires superuser rights inside the container. Instructions for migrating from root containers to rootless are available from the vendor

### [2023.40.0] - 2023-10-04

- Added the ability to scan images from hosted Docker repositories based on Sonatype Nexus and JFrog Artifactory
- Added the ability to block downloading images from Sonatype Nexus Repository if they do not comply with security policies

### [2023.38.0] - 2023-09-20

- Added the ability to specify special characters in the password for connecting to the database
- Fixed an issue with displaying ignored alerts in the Policy Ignores section
- Fixed display of Source files and Parents fields on the dependency page
- Instant removal of an alert from the Active list after creating an ignore rule has been restored
- Added [update scheme](/on-premise/update.en) to the current version of the product.

### [2023.35.0] - 2023-08-31

- Added history of SCA scans in the project
- On the project page, information for the SCA and TQI modules is now displayed in separate tabs
- Added display of parts of CVSS vectors in the list of vulnerabilities
- Added a new policy condition "Vulnerability has fixed version"
- Added the CWE field to the CSV vulnerability table export
- Added CodeScoring banner and version logging to the console when launching a Docker container with platform
- Added metrics for the number of running analyzes for Prometheus
- Removed deprecated endpoint `/api/policy_alerts/ignored/`
- Removed deprecated endpoint `/api/policy_alerts/resolved/`
- Removed deprecated endpoint `/api/policy_alerts/`
- Fixed display of technologies on the Policy ignores list
- Fixed purl and CVSS policy for rpm
- Removed license text from generated SBOMs for the project

### [2023.31.0] - 2023-08-04

- Speeded up CodeScoring OSA

### [2023.30.0] - 2023-07-27

- Added fixed version in the Affected dependencies table on the vulnerability page
- Added queue status metrics for Prometheus
- Moved the platform version from the footer to the side menu
- Fixed inconsistency between Swagger schema and API
- Removed the ability to click the Upload SBOM button without an attached file

### [2023.26.0] - 2023-06-30

- Added support for system packages for the OSA plugin in NXRM
- Added new policy conditions - on the presence of a vulnerability exploit and parts of the CVSS vector
- Added output of policy name, stage and level to the Policy alerts list on the project page
- Added a filter by project type in the list of projects
- Marked the `/api/dependencies/csv/` method as deprecated. Now you need to use `/api/dependencies/by_project/csv/`
- Fixed an error when adding a project without first creating a VCS
- Fixed display of information about stages on the policy description card for the User access level

### [2023.24.0] - 2023-06-13

- Added a filter for searching by policy name in the Policies section
- Fixed dependency export with an empty filter

### [2023.22.0] - 2023-06-01

- Fixed loading SBOM in CycloneDX format obtained from `Microsoft.SBOMTool`
- Fixed processing of fractional vulnerability ratings when generating SBOM

### [2023.21.3] - 2023-05-30

- Fixed loading SBOM in CycloneDX format obtained using third-party tools
- Improved loading of Code Clones pages

### [2023.21.2] - 2023-05-23

- Added the ability to upload and download SBOM for a project in CycloneDX format
- Added the ability to perform analysis on a CLI project through the interface
- Added manual update of project code in settings
- Added the ability to connect several VCS with the same address, but different tokens
- Added basic auth support for integration with Jira
- Fixed display of the list of licenses on the chart
- Fixed the appearance of duplicate alerts under heavy load

### [2023.15.0] - 2023-04-14

- Added a new type of projects without reference to a repository - CLI
- Added Policy alerts grouping to digests for notifications via email
- Added search by policy name and dependency name in Policy alerts
- Added recommendations for eliminating vulnerabilities (fixed version)
- Added support for parsing packages in deb/apk/rpm formats
- Added a prompt to refresh the page if the client version is different from the server version
- Added minor improvements to the UI

### [2023.11.0] - 2023-03-16

- Fixed long loading of the Distribution by license graph on the Dashboard
- Added Note field to Policy ignore
- Added Description field to Policy
- Added a new Auditor access level
- Added session lifetime setting via environment variable
- Added links to the dependency graph

### [2023.6.0] - 2023-02-10

- Added project dependency graphs (link is on the project page)
- Added option to disable hash collection during SCA on platform
- Added Index API response cache for OSA (by default from 1 hour to 1.5 hours, configured through environment variables)
- Added information about restrictions on using OSSIndex
- Launch of mass SCA is now logged in Audit log
- Swagger no longer requires internet
- Changed the path to the statics from the backend (you need to fix `docker-compose.yaml`)
- Fixed a bug due to which in packages of the same name (with different versions) located in different manifests, information about the file in which the package was found was incorrectly displayed

### [2022.49.1] - 2022-12-07

- Fixed the work of the project page

### [2022.49.0] - 2022-12-07

- Added login events to Audit log
- Added processing of the unresolved node
- Added a new condition in policies for missing component version
- Changed platform API
- Fixed analysis when there is no env in the dependency graph

### [2022.48.2] - 2022-12-04

- Added support for modern yarn
- Changed the mechanism for classifying dependencies as direct
- Added unresolved section for dependencies that are in the lock file, but do not have a parent component
