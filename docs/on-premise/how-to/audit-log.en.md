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

## License Activation

| Event Text  |  Description |
|-------------|-------------|
|*Object <ActivationKey: Owner: {owner.name}. Expired: YYYY-MM-DD HH:MM:SS+HH:MM (timezone). Authors limit: {limit.number}> created* | Activation of software license with owner and author limit specified |
|*No activation key* | No activation key present |
|*Problem with activation key: {status.lower()}* | Issue with activation key |

## User Authentication

| Event Text  |  Description |
|-------------|-------------|
|*User logged in* | User successfully authenticated in the system |
|*User logged out* | User logged out of the system |
|*Failed login attempt {username}* | Incorrect password entered during authentication attempt |

## Object Management

| Event Text  |  Description |
|-------------|-------------|
|*Object {instance!r} created* | Creation of any object in the system via user interface |
|*Object {instance!r} updated* | Update of any object in the system via user interface |
|*Object {instance!r} deleted* | Deletion of any object in the system via user interface |

## SCA Analysis Execution

| Event Text  |  Description |
|-------------|-------------|
|*[SCA][{analysis_run.project.name}][{analysis_run.sequence}/{analysis_run.pk}] Analysis started* | SCA analysis of the project started |
|*[SCA][{analysis_run.project.name}][{analysis_run.sequence}/{analysis_run.pk}] Analysis finished* | SCA analysis of the project completed |
|*[SCA][{analysis_run.project.name}][{analysis_run.sequence}/{analysis_run.pk}] Analysis failed. Check server logs.* | SCA analysis of the project failed. Check server logs. |
|*Failed to clone for repository {repository.name}.* | Repository cloning failed |
|*Failed to detect branch for repository "{repository.name}* | Failed to detect branch for repository |
|*[SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}] Clone source code* | Project source code cloning started |
|*[SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}] Collect files data* | File data collection for the project started |
|*[SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}] Collect manifests* | Manifest collection for the project started |
|*[SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}] Create pipeline* | Pipeline creation for SCA analysis started |
|*[SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}] Check policies* | Policy checking for SCA analysis started |
|*[SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}] Update project metrics* | Project metrics update for SCA analysis started |
|*[SCA][{project.name}][{analysis_run.sequence}/{analysis_run.pk}] Analyze dependencies* | Dependency analysis for SCA started |
|*[[SCA][{project.name}] Analysis didn't start (Reason: {err.message})]* | SCA analysis did not start due to an error |
|*Overall SCA run started for {len(projects)} project(s)* | Overall SCA analysis for projects started |

Each SCA analysis event contains a sequential analysis number in the project and a **UUID** of the execution.

## TQI Analysis Execution

| Event Text  |  Description |
|-------------|-------------|
|*Rebuild author {primary_email}* | Updating author information based on merge rules by primary email |
|*Generate authors merge rules* | Creating author merge rules |
|*(Run #{run_id}) Collect commits data for project {project.name}* | Commit data collection for the project started |
|*(Run #{run_id}) Create authors* | Author creation started |
|*(Run #{run_id}) Load authors OSS contributions* | Loading authors' contributions to OSS |
|*(Run #{run_id}) Authors analysis started* | Author analysis started |
|*(Run #{run_id}) Authors analysis completed* | Author analysis successfully completed |
|*(Run #{run_id}) Authors analysis failed. Check server logs.* | Author analysis failed. Check server logs. |
|*(Run #{run_id}) Authors analysis cancelled* | Author analysis canceled |
|*(Run #{run_id}) Update project {project.name}* | Project update started |
|*(Run #{run_id}) Clones analysis started* | Cloned code analysis started |
|*(Run #{run_id}) Clones analysis completed* | Cloned code analysis completed |
|*(Run #{run_id}) Clones analysis failed. Check server logs.* | Cloned code analysis failed. Check server logs. |
|*(Run #{run_id}) Clones analysis cancelled* | Cloned code analysis canceled |
|*(Run #{run_id}) Clone source code for project {project.name}* | Project source code repository cloning started |

Each TQI analysis event contains a **UUID** of the execution.

## Policy Management

| Event Text  |  Description |
|-------------|-------------|
|*Policy ignore {policy_ignore} created* | Creation of a policy ignore rule |
|*Policy ignore {policy_ignore} activated* | Activation of a policy ignore rule |
|*To Policy ignore {policy_ignore} added Policy {policy_alert.policy}* | Policy added to an existing ignore rule |
| *Policy "{policy.name}" (id: {policy.pk}) skipped. Reason: {err!r}* | Policy skipped due to an error |

## Secrets Analysis

| Event Text  |  Description |
|-------------|-------------|
| *[Secrets][{analysis_run.analysis_object}] Analysis started* | Secrets analysis started |
| *[Secrets] Training run started* | Training of the user model based on labeling results started |
| *[Secrets][{analysis_run.analysis_object}] Analysis finished* | Secrets analysis completed |
| *[Secrets] Training run finished* | Training of the user model based on labeling results completed |
| *[Secrets][{analysis_run.analysis_object}] Analysis failed. Check server logs.* | Secrets analysis failed |
| *[Secrets] Training run failed. Check server logs.* | User model training failed |

## Container Image Analysis

| Event Text  |  Description |
|-------------|-------------|
| *In container image {container_image} dependency {dep_name_and_version} was changed* | A dependency was changed in the container image |
| *Updating images list for registry {container_registry} triggered via update button.* | Forced update of the image list from the registry started |

## LDAP Operations

| Event Text  |  Description |
|-------------|-------------|
| *Applying all LDAP group mapping rules triggered* | Execution of all LDAP group mapping rules started |
| *{message} While processing, failed to apply some of rules related to following LDAP servers: {', '.join(ldap_servers_mapping_failed_for)}. Check server logs.* | Error applying group mapping rules for specified LDAP servers |

## Miscellaneous

| Event Text  |  Description |
|-------------|-------------|
|*(Run #{task.id}) Analysis started via API* | Analysis started via API |
|*Some tasks in analysis failed* | Some tasks in the analysis failed |
|*Could not connect to OSS Index, reason: {err}* | Could not connect to OSS Index due to an error |
|*There is already running analysis* | Analysis is already running |
|*Another analysis in progress. Parallel execution forbidden.* | Parallel execution of analysis is forbidden |
|*Repo path for {project} does not exist, setting status to Not cloned* | Repository path not found, status set to "Not cloned" |
|*Failed to clone for repository {project.repo_name} because project was deleted* | Failed to clone the repository because the project was deleted |
