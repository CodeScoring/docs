---
hide:
  - footer
---

# Connecting webhooks

Codescoring supports a webhook-based notification system. When events occur, a `POST` HTTP request is sent to the specified URL.

## Adding a new webhook

To add a new webhook to the installation, follow these steps:

1. Go to the `Settings -> Webhooks` section.
2. Click the **Setup new** button.
3. Fill in the fields in the form:

	- **Name** – name in the CodeScoring system;
	- **URL** – address with the protocol. For example: `http://webhook.com/`;
	- **Projects** – list of projects for which webhooks will be applied. If the field is empty, all projects will be taken into account;
	- **Events** – list of events for which the notification will be triggered;
	- **Token** – token that is transmitted in the HTTP request (`X-CodeScoring-Authentication` header);

4. Test the connection after filling in the data by clicking the **Test it** button. When testing, the `test` trigger is used with an empty payload.

After creating a new connection by clicking the **Setup now** button, the webhook will be displayed in the section list, with the ability to view information about it (**View**), change the webhook parameters (**Edit**), or delete it (**Delete**).

## Request body structure

```json
{
  "events": [
    {
      "created_at": "datetime_in_iso_format",
      "trigger": "trigger_name",
      "payload": {
        ...
      }
    },
    ...
  ]
}
```

## Request sending mechanism

Requests are processed every 5 seconds, according to a periodic task performed by the system.

A webhook usually sends one event per request. However, in the following cases, an array of events can be sent:

- **Sending accumulated events:** if several events occurred within a unit of time (default is 5 seconds), they will be sent in a single request;
- **Retries:** if the server did not respond or returned an error on the previous attempt, all unsuccessful events are resent in a single request.

HTTP codes in the range [200; 299] are considered successful. If the server's response is outside this range, the event is considered unsuccessful, accumulated, and resent according to the following schedule: 1 minute → 5 minutes → 30 minutes → 3 hours → 12 hours → 24 hours → 48 hours.

If at least one request remains unsuccessful after 48 hours, the webhook is disabled and no more events are sent.

## Webhooks management via API

To manage webhooks, an API is provided at the endpoint `/api/settings/webhooks` with the following commands:

- `GET /api/settings/webhooks/` — get a list of all webhooks;
- `POST /api/settings/webhooks/` — create a new webhook;
- `GET /api/settings/webhooks/{id}/` — get information by ID;
- `PUT /api/settings/webhooks/{id}/` — completely update data;
- `PATCH /api/settings/webhooks/{id}/` — partially update data;
- `DELETE /api/settings/webhooks/{id}/` — delete a webhook by ID;
- `POST /api/settings/webhooks/{id}/refresh_availability_status/` — refresh the availability status;
- `POST /api/settings/webhooks/test/` — test the connection;
- `GET /api/settings/webhooks/triggers/` — get a list of available triggers.

## Available events

<table>
  <thead>
    <tr>
      <th>Event name</th>
      <th>Trigger value</th>
      <th>Request payload structure</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>SCA Policy has been triggered</td>
      <td>sca_policy_has_been_triggered</td>
      <td>
        <pre>
  ```
  "alert_id": 0,
  "stage": "dev|source|build|stage|test|prod|proxy",
  "level": "info|warning|critical",
  "policy_id": 0,
  "policy_name": 0,
  "dependency_id": 0,
  "dependency_purl": "purl",
  "matched_criteria": ["matched_criteria", ...],
  "project_id": 0
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>OSA Policy has been triggered</td>
      <td>osa_policy_has_been_triggered</td>
      <td>
        <pre>
  ```
  "alert_id": 0,
  "stage": "dev|source|build|stage|test|prod|proxy",
  "level": "info|warning|critical",
  "policy_id": 0,
  "policy_name": 0,
  "dependency_id": 0,
  "dependency_purl": "purl",
  "matched_criteria": ["matched_criteria", ...],
  "container_image_id": 0,
  "artifact_repository_id": 0
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Project SCA analysis started</td>
      <td>project_sca_analysis_started</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Project SCA analysis finished</td>
      <td>project_sca_analysis_finished</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name",
  "vulnerabilities_count": 0,
  "dependencies_count": 0
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Project SCA analysis cancelled</td>
      <td>project_sca_analysis_cancelled</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Project SCA analysis failed</td>
      <td>project_sca_analysis_failed</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name",
  "error": "error_description"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Container Image SCA analysis started</td>
      <td>container_image_sca_analysis_started</td>
      <td>
        <pre>
  ```
  "container_image_id": 0,
  "container_image_name": "container_image_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Container Image SCA analysis finished</td>
      <td>container_image_sca_analysis_finished</td>
      <td>
        <pre>
  ```
  "container_image_id": 0,
  "container_image_name": "container_image_name",
  "vulnerabilities_count": 0,
  "dependencies_count": 0
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Container Image SCA analysis cancelled</td>
      <td>container_image_sca_analysis_cancelled</td>
      <td>
        <pre>
  ```
  "container_image_id": 0,
  "container_image_name": "container_image_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Container Image SCA analysis failed</td>
      <td>container_image_sca_analysis_failed</td>
      <td>
        <pre>
  ```
  "container_image_id": 0,
  "container_image_name": "container_image_name",
  "error": "error_description"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Clone analysis started</td>
      <td>clones_analysis_started</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Clone analysis finished</td>
      <td>clones_analysis_finished</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Clone analysis cancelled</td>
      <td>clones_analysis_cancelled</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name"
 </pre>
      </td>
    </tr>
    <tr>
      <td>Clone analysis failed</td>
      <td>clones_analysis_failed</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name",
  "error": "error_description"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Authors analysis started</td>
      <td>authors_analysis_started</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Authors analysis finished</td>
      <td>authors_analysis_finished</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Authors analysis failed</td>
      <td>authors_analysis_failed</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name",
  "error": "error_description"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Authors analysis cancelled</td>
      <td>authors_analysis_cancelled</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Cloning of repository started</td>
      <td>cloning_of_repository_started</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name",
  "repo_url": "repo_url",
  "repo_ref_name": "repo_ref_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Cloning of repository finished</td>
      <td>cloning_of_repository_finished</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name",
  "repo_url": "repo_url",
  "repo_ref_name": "repo_ref_name"
  ```
 </pre>
      </td>
    </tr>
    <tr>
      <td>Cloning of repository failed</td>
      <td>cloning_of_repository_failed</td>
      <td>
        <pre>
  ```
  "project_id": 0,
  "project_name": "project_name",
  "repo_url": "repo_url",
  "repo_ref_name": "repo_ref_name",
  "error": "error_description"
  ```
</pre>
      </td>
    </tr>
  </tbody>
</table>


## Example of a simple Flask application

```python
import json

from flask import Flask, request


app = Flask(__name__)

events = []


@app.get('/')
def show_events():
    return f'<pre>{json.dumps(events, indent=2)}</pre>'


@app.post('/')
def handle_events():
    received_events = request.json.get('events', [])
    events.extend(received_events)
    return 'OK'
```
