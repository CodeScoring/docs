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

## Activation

| Text of the event | Decoding |
| --------------- | ----------------------------------------------------------
|*Object ActivationKey: Owner: {Owner.name}. Expired: yyyy-mm-dd hh: mm: ss+hh: mm (Timezone). Authors limit: {limit.number} created* | Activation of the PO license indicating the owner of the key and restrictions on the number of authors |

## Authentication of the user

| Text of the event | Decoding |
| --------------- | ----------------------------------------------------------
|*User logged in*| The user has successfully logged into the system |
|*User logged out*| The user has logged out of the system |
|*Failed Login Attempt {Username}*| The wrong password has been used when trying to log in |

## Object Management

| Text of the event | Decoding |
| --------------- | ----------------------------------------------------------
|*Object {Instance! R} created*| Creation of any object in the system by a user through the UI |
|*Object {Instance! R} updated*| Updating any object in the system by a user through the UI |
|*Object {Instance! R} Deleted*| Removing any object in the system by a user through the UI |

## SCA analysis launch

| The text of the event | Decoding |
| --------------- | ----------------------------------------------------------
|*[SCA][{analysis_run.project.name}] [{analysis_run.sequence}/{analysis_run.pk}] Analysis started*| SCA analysis of a project has been launched |
|*[SCA][{analysis_run.project.name}] [{analysis_run.sequence}/{analysis_run.pk}] Analysis finished*| SCA analysis of a project has completed |
|*[SCA][{analysis_run.project.name}] [{analysis_run.sequence}/{analysis_run.pk}] Analysis failed. Check server logs.*| SCA analysis of the project ended with an error. It is necessary to check the server logs. |
|*Failed to clone for repository {repository.name}.*| Cloning of the repository has failed |
|*Failed to detect branch for repository "{repository.name}"*| It was not possible to find the branch for the repository |
|*[SCA][{project.name}] [{analysis_run.sequence}/{analysis_run.pk}] clone source code*| cloning the source code of the project launched |
|*[SCA][{project.name}] [{analysis_run.sequence}/{analysis_run.pk}] Collect Files Data*| Search for data on project files launched |
|*[SCA][{project.name}] [{analysis_run.sequence}/{analysis_run.pk}] Collect manifests*| Search for project manifestos is launched |
|*[SCA][{project.name}] [{analysis_run.sequence}/{analysis_run.pk}] Create pipeline*| Creation of Pipeline for SCA Analysis of the project is launched |
|*[SCA][{project.name}] [{analysis_run.sequence}/{analysis_run.pk}] Check policies*| Checking the policies analysis is launched |
|*[SCA][{project.name}] [{analysis_run.sequence}/{analysis_run.pk}] Update project metrics*| Updating the project metrics for the SCA analysis of the project is launched |
|*[SCA][{project.name}] [{analysis_run.sequence}/{analysis_run.pk}] analyze dependencies*| Analysis of the dependencies for the SCA analysis of the project is launched |
|*(Run #{task.id}) analysis started via API*| Analysis launched through the CLI agent in the API (with UUID of the launch) |
|*Some tasks in analysis failed*| Some tasks in the analysis are not completed |
|*Could not connect to OSS Index, Reason: {Err}*| It was not possible to connect to the OSS index (with error code)|
|*[[SCA][{project.name}] Analysis disidn't start (reason: {err.message})]*| SCA analysis of the project did not start with an indication of error |
|*Overall SCA run started for {len(projects)} project(s)*| Launched SCA analysis for all projects (with number of projects) |

Each SCA analysis event contains a sequential analysis number in the project and **UUID** of the launch.

## TQI analysis launch

| The text of the event | Decoding |
| --------------- | ----------------------------------------------------------
|*Rebuild author {primary_email}*| Updating information on the author based on the default email in Authors Merge rules|
|*Generate authors merge rules*| Creation of the merge rules for authors |
|*(Run #{run_id}) Collect commits data for project*| Collection of commits data for a project has started|
|*(Run #{run_id}) Create authors*| Creation of authors |
|*(Run #{run_id}) Load authors OSS Contributions*| Loading the authors contribution in Open Source projects |
|*(Run #{run_id}) Authors analysis started*| Analysis of the authors began |
|*(Run #{run_id}) Authors analysis completed*| Analysis of the authors successfully completed |
|*(Run #{run_id}) Authors analysis failed. Check server logs.*| Analysis of the authors has not been completed due to an error. It is necessary to check the server logs |
|*(Run #{run_id}) Authors analysis cancelled*| Analysis of the authors cancelled |
|*(Run #{run_id}) Update project {project.name}*| Updating a project |
|*(Run #{run_id}) Clones analysis started*| Analysis of the code clones has started |
|*(Run #{run_id}) Clones analysis completed*| Analysis of the code clones has completed |
|*(Run #{run_id}) Clones analysis failed. Check server logs.*| Analysis of the code clones has not been completed due to an error. It is necessary to check the server logs |
|*(Run #{run_id}) Clones analysis cancelled*| Analysis of the code clones canceled |
|*(Run #{run_id}) Clone source code for project {project.name}*|Cloning of the source code repository for a project has started|

Each TQI analysis event contains an **ID** of the launch.

## Policy management

| Text of the event | Decoding |
| --------------- | ----------------------------------------------------------
|*Policy ignore {Policy_ignore} created*| Policy ignore rule has been created|
|*Policy ignore {Policy_ignore} фctivated*| Policy ignore rule has been activated|
|*To policy ignore {policy_ignore} added policy {Policy_Alert.policy}*| Policy has been added to a current policy ignore rule|
