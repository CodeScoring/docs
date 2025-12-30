- [Русский](https://docs.codescoring.ru/on-premise/how-to/webhooks/index.md)

# Connecting webhooks

Codescoring supports a webhook-based notification system. When events occur, a `POST` HTTP request is sent to the specified URL.

## Adding a new webhook

To add a new webhook to the platform, follow these steps:

1. Go to the `Settings -> Webhooks` section.

1. Click the **Setup new** button.

1. Fill in the fields in the form:

   - **Name** – name in the CodeScoring system;
   - **URL** – address with the protocol. For example: `http://webhook.com/`;
   - **Projects** – list of projects for which webhooks will be applied. If the field is empty, all projects will be taken into account;
   - **Events** – list of events for which the notification will be triggered;
   - **Token** – token that is transmitted in the HTTP request (`X-CodeScoring-Authentication` header);

1. Test the connection after filling in the data by clicking the **Test it** button. When testing, the `test` trigger is used with an empty payload.

After creating a new connection by clicking the **Setup now** button, the webhook will be displayed in the section list, with the ability to view information about it (**View**), change the webhook parameters (**Edit**), or delete it (**Delete**).

## Request body structure

```
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

| Event name                                | Trigger value                                | Request payload structure                                                                                                                        |
| ----------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| SCA Policy has been triggered             | sca_policy_has_been_triggered                | `  ` "alert_id": 0, "stage": "dev                                                                                                                |
| OSA Policy has been triggered             | osa_policy_has_been_triggered                | `  ` "alert_id": 0, "stage": "dev                                                                                                                |
| Project SCA analysis started              | project_sca_analysis_started                 | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Project SCA analysis finished             | project_sca_analysis_finished                | `  ` "project_id": 0, "project_name": "project_name", "vulnerabilities_count": 0, "dependencies_count": 0 ` `                                    |
| Project SCA analysis cancelled            | project_sca_analysis_cancelled               | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Project SCA analysis failed               | project_sca_analysis_failed                  | `  ` "project_id": 0, "project_name": "project_name", "error": "error_description" ` `                                                           |
| Container Image SCA analysis started      | container_image_sca_analysis_started         | `  ` "container_image_id": 0, "container_image_name": "container_image_name" ` `                                                                 |
| Container Image SCA analysis finished     | container_image_sca_analysis_finished        | `  ` "container_image_id": 0, "container_image_name": "container_image_name", "vulnerabilities_count": 0, "dependencies_count": 0 ` `            |
| Container Image SCA analysis cancelled    | container_image_sca_analysis_cancelled       | `  ` "container_image_id": 0, "container_image_name": "container_image_name" ` `                                                                 |
| Container Image SCA analysis failed       | container_image_sca_analysis_failed          | `  ` "container_image_id": 0, "container_image_name": "container_image_name", "error": "error_description" ` `                                   |
| Clone analysis started                    | clones_analysis_started                      | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Clone analysis finished                   | clones_analysis_finished                     | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Clone analysis cancelled                  | clones_analysis_cancelled                    | `   ` "project_id": 0, "project_name": "project_name" \`\`\`                                                                                     |
| Clone analysis failed                     | clones_analysis_failed                       | `  ` "project_id": 0, "project_name": "project_name", "error": "error_description" ` `                                                           |
| Authors analysis started                  | authors_analysis_started                     | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Authors analysis finished                 | authors_analysis_finished                    | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Authors analysis failed                   | authors_analysis_failed                      | `  ` "project_id": 0, "project_name": "project_name", "error": "error_description" ` `                                                           |
| Authors analysis cancelled                | authors_analysis_cancelled                   | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Cloning of repository started             | cloning_of_repository_started                | `  ` "project_id": 0, "project_name": "project_name", "repo_url": "repo_url", "repo_ref_name": "repo_ref_name" ` `                               |
| Cloning of repository finished            | cloning_of_repository_finished               | `  ` "project_id": 0, "project_name": "project_name", "repo_url": "repo_url", "repo_ref_name": "repo_ref_name" ` `                               |
| Cloning of repository failed              | cloning_of_repository_failed                 | `  ` "project_id": 0, "project_name": "project_name", "repo_url": "repo_url", "repo_ref_name": "repo_ref_name", "error": "error_description" ` ` |
| Project Secrets analysis started          | project_secrets_analysis_started             | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Project Secrets analysis finished         | project_secrets_analysis_finished            | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Project Secrets analysis cancelled        | project_secrets_analysis_cancelled           | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Project Secrets analysis failed           | project_secrets_analysis_failed              | `  ` "project_id": 0, "project_name": "project_name" ` `                                                                                         |
| Secrets ML user model training started    | ml_model_user_secrets_training_run_started   | `  ` Empty payload ` `                                                                                                                           |
| Secrets ML user model training finished   | ml_model_user_secrets_training_run_finished  | `  ` Empty payload ` `                                                                                                                           |
| Secrets ML user model training cancelled  | ml_model_user_secrets_training_run_cancelled | `  ` Empty payload ` `                                                                                                                           |
| Secrets ML model user training run failed | ml_model_user_secrets_training_run_failed    | `  ` Empty payload ` `                                                                                                                           |
| Secrets ML user model accepted            | ml_model_user_secrets_accepted               | `  ` Empty payload ` `                                                                                                                           |
| Secrets ML user model purged              | ml_model_user_secrets_purged                 | `  ` Empty payload ` `                                                                                                                           |

## Example of a simple Flask application

```
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
