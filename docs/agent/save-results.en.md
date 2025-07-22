---
hide:
  - footer
---

# Saving scan results

To save scan results in an on-premise installation, you need to add the `--save-results` and `--project` parameters to the command or specify the following variables in the config file:

- `project` — the name of the CLI project in the system into which the results will be saved;
- `save-results` — flag for saving results, default value is **false**.

If the CLI project has not been created in the system in advance, you can specify the `--create-project` parameter in the call command or in the config file.
For new project you can specify group `--project-group` and proprietor `--project-proprietor`

An example of a request to save scan results to a new project:

```bash
./johnny scan dir . \
--api_token <api_token> \
--api_url <api_url> \
--save-results\
--create-project\
--project "project-name" \
--project-group "group" \
--project-proprietor "proprietor"
```
