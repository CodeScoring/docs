- [Русский](https://docs.codescoring.ru/agent/save-results/index.md)

# Saving scan results

To save scan results in an on-premise platform, you need to add the `--save-results` and `--project` parameters to the command or specify the following variables in the config file:

- `project` — the name of the CLI project in the system into which the results will be saved;
- `save-results` — flag for saving results, default value is **false**.

If the CLI project has not been created in the system in advance, you can specify the `--create-project` parameter in the call command or in the config file. For a new project the following parameters can be specified:

- `--project-group` — the group name. If a group with this name does not exist and the `--create-project-group` flag is provided, it will be created before adding the project to the group;
- `--project-proprietor`;
- `--project-categories`.

An example of a request to save scan results to a new project:

```
./johnny scan dir . \
--api_token <api_token> \
--api_url <api_url> \
--save-results\
--create-project\
--project "project-name" \
--project-group "group" \
--project-proprietor "proprietor"
```
