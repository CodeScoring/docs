- [Русский](https://docs.codescoring.ru/secrets/secrets-vcs/index.md)

# Configuring VCS project for secret search

For the Secrets module to work within a project, you need to set the scanning parameters on the project settings page in the `Settings -> Projects` section:

- **Secrets scan schedule** - schedule for scanning for secrets (is set by time and days of week);
- **Secrets engine configuration** - configuration of the [secrets engine](/secrets/secrets-setup.en);
- **Secrets scan scope** - scope of scanning:
  - **Repo** - for scanning all the branches within repository;
  - **Default branch** - for scanning the default branch in the project settings;
- **Exclude from Secrets** - exclude current project from SCA analysis;
