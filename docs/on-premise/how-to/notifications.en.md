---
hide:
  - footer
---

# Notification settings

For each policy, you can configure additional notifications, in addition to viewing the results in the `Policy Alerts` section. There are currently two notification methods available: via **email** and via the **Jira** task manager.

## Email notifications

Email notifications are sent via SMTP integration.

To send notifications via email, the mail server must be configured beforehand in the `Settings -> Email` section. To do this, you need to fill in all mandatory fields and check the **Is active** flag.

You can check if the configuration is correct by clicking the **Test it** button.

![CodeScoring email settings example](/assets/img/email-settings.png)

After configuring the mail server, in the `Actions` section of the policy page you can add an email address to which emails with policy alerts will be sent:

![CodeScoring Policy Actions example](/assets/img/policy_actions_email-en.png)

- **Email** — email address;
- **Mode** — email sending mode:
  - Send all the alerts together;
  - Send each alert separately.
- **Groups** — groups of projects to which notification is made. If not specified, all groups are implied;
- **Projects** — the specific projects for which the notification is made. If not specified, all projects are implied.

If both groups and projects are specified, alerts will include information for all projects in the specified groups and for all specified projects.

The policy results email is sent **after the project** has been scanned. The email contains a list of all policies for which notifications were configured and triggered at least once, as well as the following information about those policies:

- **Policy name** - the name of the triggered policy;
- **Blocker** - the attribute of the blocking policy;
- **Dependency** - name of the component;
- **Vulnerability** - vulnerability ID.

## Create tasks in Jira

CodeScoring supports integration with the Jira Task Manager to generate tasks for triggered policies. The integration is configured in the `Settings -> Task managers` section.

The **Setup new** button form is used to create a new integration.

- **Name** - name of the integration;
- **Type** - type of task manager (by default - Jira Server);
- **URL** - address where the task manager can be accessed;
- **Auth type** - authentication type (via access token or login and password).

After filling in the fields, you can test the connection to the server by clicking **Test it**, or complete the creation by clicking **Setup now**.

![CodeScoring Jira settings example](/assets/img/jira-settings.png)

Once the integration is configured, under `Actions` on the policy page, you can add a Jira server on which to create a task with the policy results:

![CodeScoring Jira settings example](/assets/img/policy_actions_task_manager-en.png)

- **Mode** — task sending mode:
  - Send all the alerts together;
  - Send each alert separately.
- **Groups** — groups of projects to which notification is made. If not specified, all groups are implied;
- **Projects** — the specific projects for which the notification is made. If not specified, all projects are implied.
- **Server** — task manager (in this case Jira);
- **Project** — Jira-project;
- **Task** — card type: *Task*, *Story* or *Bug*.

If both groups and projects are specified, alerts will include information for all projects in the specified groups and for all specified projects.

![CodeScoring Policy Actions example](/assets/img/policy_actions-en.png)
