- [Русский](../../osa/osa-policies/)

# Configuring OSA policies

To decide whether to block or allow downloading of components, the plugin uses the [CodeScoring policies](/on-premise/how-to/policies.en) mechanism.

In order for the policy to be applied when called from the plugin, you must set the following settings for the selected policy in the `Policies` section:

- **Stages** – specify the *proxy* value;
- set the *Blocker* flag;
- set the *Is Active* flag.

In addition, you can clarify the scope of the policy using two parameters:

- **OSA Components** – type of components to which the policy will apply (packages or container images);
- **Repositories** – list of repositories with components.

**Important**: to select a repository, you must first [connect the repository manager](/osa/repo-managers.en) to the platform.
