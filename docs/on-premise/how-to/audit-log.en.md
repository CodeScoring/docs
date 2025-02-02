---
hide:
  - footer
---
# Audit log

Audit log is a journal of events in the **Codescoring** system. It is located at `Settings -> Audit log`.

In the audit log all the system events, user actions and errors are listed. Each event contains the following data:

- **Event time** - date and time of event;
- **Actor** - username (for system actions the value is `system`);
- **Message** - a message with details;
- **Duration** - the duration of analysis and integration events.

The records in the journal can be filtered by date range or username, and specific events can be found using the **Search** field. Exporting of the journal in CSV format is also available.

Events in the audit log are divided into several categories. Below is a complete list of possible events for each category, along with their descriptions.

## License activation

| Event Text  |  Description |
|----------------|--------------|
|*Object <ActivationKey: Owner: {owner.name}. Expired: YYYY-MM-DD HH:MM:SS+HH:MM (timezone). Authors limit: {limit.number}> created* | Software license activation with key owner and author limit specified |
|*No activation key* | No activation key present |
|*Problem with activation key: {status.lower()}* | Issue with activation key |

## User authentication

| Event Text  |  Description |
|----------------|--------------|
|*User logged in*|User successfully authenticated in the system|
|*User logged out*|User logged out of the system|
|*Failed login attempt {username}*|Incorrect password entered during authentication attempt|

## Object management

| Event Text  |  Description |
|----------------|--------------|
|*Object {instance!r} created*|Creation of any object in the system by a user via the interface|
|*Object {instance!r} updated*|Updating any object in the system by a user via the interface|
|*Object {instance!r} deleted*|Deletion of any object in the system by a user via the interface|

## SCA analysis

| Event Text  |  Description |
|----------------|--------------|
|*[SCA][{analysis_run.project.name}][{analysis_run.sequence}/{analysis_run.pk}] Analysis started*|SCA project analysis started|
|*[SCA][{analysis_run.project.name}][{analysis_run.sequence}/{analysis_run.pk}] Analysis finished*|SCA project analysis completed|
|*[SCA][{analysis_run.project.name}][{analysis_run.sequence}/{analysis_run.pk}] Analysis failed. Check server logs.*|SCA project analysis failed. Check server logs.|
|*Failed to clone for repository {repository.name}.*|Repository cloning failed|
|*Failed to detect branch for repository "{repository.name}*|Failed to detect branch for repository|
|*[SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}] Clone source code*|Project source code cloning started|
|*[SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}] Collect files data*|Project file data collection started|
|*[SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}] Collect manifests*|Project manifest collection started|
|*[SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}] Create pipeline*|SCA analysis pipeline creation started|
|*[SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}] Check policies*|SCA project policy check started|
|*[SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}] Update project metrics*|SCA project metrics update started|
|*[SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}] Analyze dependencies*|SCA project dependency analysis started|
|*[[SCA][{project.name}] Analysis didn't start (Reason: {err.message})]*|SCA project analysis did not start due to an error|
|*Overall SCA run started for {len(projects)} project(s)*|Overall SCA analysis for projects started|

Each SCA analysis event contains a sequential analysis number in the project and a **UUID** for execution.

## TQI analysis

| Event Text  |  Description |
|----------------|--------------|
|*Rebuild author {primary_email}*|Updating author information based on merging rules for primary email|
|*Generate authors merge rules*|Generating author merge rules|
|*(Run #{run_id}) Collect commits data for project {project.name}*|Commit data collection for the project started|
|*(Run #{run_id}) Create authors*|Creating authors|
|*(Run #{run_id}) Load authors OSS contributions*|Loading authors' OSS contributions|
|*(Run #{run_id}) Authors analysis started*|Authors analysis started|
|*(Run #{run_id}) Authors analysis completed*|Authors analysis successfully completed|
|*(Run #{run_id}) Authors analysis failed. Check server logs.*|Authors analysis failed. Check server logs.|
|*(Run #{run_id}) Authors analysis cancelled*|Authors analysis canceled|
|*(Run #{run_id}) Update project {project.name}*|Updating project|
|*(Run #{run_id}) Clones analysis started*|Clone code analysis started|
|*(Run #{run_id}) Clones analysis completed*|Clone code analysis completed|
|*(Run #{run_id}) Clones analysis failed. Check server logs.*|Clone code analysis failed. Check server logs.|
|*(Run #{run_id}) Clones analysis cancelled*|Clone code analysis canceled|
|*(Run #{run_id}) Clone source code for project {project.name}*|Project source code repository cloning started|

Each TQI analysis event contains a **UUID** for execution.

## Policy management

| Event Text  |  Description |
|----------------|--------------|
|*Policy ignore {policy_ignore} created*|Policy ignore rule created|
|*Policy ignore {policy_ignore} activated*|Policy ignore rule activated|
|*To Policy ignore {policy_ignore} added Policy {policy_alert.policy}*|Policy added to existing ignore rule|
|*Policy "{policy.name}" (id: {policy.pk}) skipped. Reason: {err!r}* | Policy skipped due to an error |

## Secrets analysis

| Event Text | Description |
|--------------|------------|
|*[Secrets][{analysis_run.analysis_object}] Analysis started* | Secrets analysis started |
|*[Secrets] Training run started* | Secrets training process started |
|*[Secrets][{analysis_run.analysis_object}] Analysis finished* | Secrets analysis completed |
|*[Secrets] Training run finished* | Secrets training process completed |
|*[Secrets][{analysis_run.analysis_object}] Analysis failed. Check server logs.* | Secrets analysis failed |
|*[Secrets] Training run failed. Check server logs.* | Secrets training process failed |

## Container image analysis

| Event Text | Description |
|--------------|------------|
|*In container image {container_image} dependency {dep_name_and_version} was changed* | Dependency changed in the container image |
|*Updating images list for registry {container_registry} triggered via update button.* | Updating the list of images in the registry |

## LDAP operations

| Event Text | Description |
|--------------|------------|
|*Applying all LDAP group mapping rules triggered* | Applying all LDAP mapping rules started |
|*{message} While processing, failed to apply some of rules related to following LDAP servers: {', '.join(ldap_servers_mapping_failed_for)}. Check server logs.* | Failed to apply rules for LDAP servers |

## Miscellaneous

| Event Text  |  Description |
|----------------|--------------|
|*(Run #{task.id}) Analysis started via API*|Analysis started via console agent using API (with execution UUID)|
|*Some tasks in analysis failed*|Some tasks in the analysis failed|
|*Could not connect to OSS Index, reason: {err}*|Failed to connect to OSS Index due to an error|
|*Could not connect to OSS Index, reason: {err}* | OSS Index connection error |
|*There is already running analysis* | An analysis is already running |
|*Another analysis in progress. Parallel execution forbidden.* | Parallel execution of analysis is forbidden |
|*Repo path for {project} does not exist, setting status to Not cloned* | Repository path not found, status set to "Not cloned" |
|*Failed to clone for repository {project.repo_name} because project was deleted* | Failed to clone repository because the project was deleted |
