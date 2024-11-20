---
hide:
- footer
---
# Setting up engine configuration

1. To start working with the Secrets module, you must first create a VCS or CLI [project](/on-premise/how-to/projects) in the `Settings -> Projects` section.

2. After creating the project, you must set the secrets engine configuration in the `Settings -> Secrets` section by opening the form using the **Setup new** button.

3. In the configuration form, you must specify a name, select an engine for searching for secrets in the code and write a standard configuration for it - it will be passed to the engine input during scanning.

Example of a standard configuration for the gitleaks engine:

```json
title = "Gitleaks title"

[extend]
useDefault = true
```

![Engine configuration example](/assets/img/secrets/engine-configuration.png)

More details on configuring the gitleaks engine can be found in the [tool documentation](https://github.com/gitleaks/gitleaks?tab=readme-ov-file#configuration).