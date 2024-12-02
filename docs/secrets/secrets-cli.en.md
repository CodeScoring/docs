---
hide:
- footer
---
# Importing report to a CLI project

To search for secrets in a CLI project, you need to scan the secrets manually. You can read about using gitleaks manually in the command line in the [tool documentation](https://github.com/gitleaks/gitleaks?tab=readme-ov-file#usage).

1. After receiving a report from the tool, go to the Secrets tab on the project page.

![CLI Project](/assets/img/secrets/cli-project.png)

2. Click the **Import report file** button.

![CLI Upload](/assets/img/secrets/cli-upload.png)

3. Select the file with the report and specify which tool it was created with, then click the **Upload** button. Depending on its size, the report can take anywhere from tens of seconds to several minutes to load.