- [Русский](https://docs.codescoring.ru/secrets/secrets-setup/index.md)

# Setting up engine configuration

1. To start working with the Secrets module, you must first create a VCS or CLI [project](/on-premise/how-to/projects) in the `Settings -> Projects` section.
1. After creating the project, you must set the secrets engine configuration in the `Settings -> Secrets` section by opening the form using the **Setup new** button.
1. In the configuration form, you must specify a name, select an engine for searching for secrets in the code and write a standard configuration for it - it will be passed to the engine input during scanning.

Example of a standard configuration for the gitleaks engine:

```
title = "Gitleaks title"

[extend]
useDefault = true
```

More details on configuring the gitleaks engine can be found in the [tool documentation](https://github.com/gitleaks/gitleaks?tab=readme-ov-file#configuration).

## Setting up default engine configuration

To set the default configuration you need to click the **Use by default** button in the configuration settings.

Editing the default configuration

You cannot set more than one default configuration, nor can you delete a configuration that is set as default.

To use the default configuration for a project check the **Use default** flag in the **Secrets** section of the project settings. The configuration currently used by default will be shown in parentheses.

Changing default configuration

When setting a new default configuration, all projects with the **Use default** flag selected will use the new configuration.

Configuration secrets engine for the new project

When creating a new project, a default engine configuration is automatically set. This configuration can be changed in the project settings in the **Secrets** section.
