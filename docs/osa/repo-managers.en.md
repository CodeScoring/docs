---
hide:
  - footer
---

# Connecting a repository manager

Codescoring.OSA performs artifact check in the **Sonatype Nexus Repository** and **JFrog Artifactory** repository managers via [OSA plugins](/osa). You can pre-configure a connection to a repository manager to make it easier to work with artifacts on your installation.

To add a new repository manager on an installation, follow these steps:

1. Go to `Settings -> Repo managers`.
2. Click on the **Setup new** button.
3. Fill in the fields in the form:

    - **Name** - name in the CodeScoring system;
    - **Is active** - an indication of an active repository manager;
    - **Type** - type (Sonatype Nexus Repository or JFrog Artifactory);
    - **URL** - address with the protocol specified. For example: `https://jfrog.example.com`;
    - **Username** - user with access to the repository manager;
    - **Password** - password.

4. Test the connection after filling in the data using the **Test it** button.

After creating a new connection by clicking **Setup now**, the repository manager will be displayed in the section list, with the possibility to view information about it (**View**), change connection parameters (**Edit**), or delete the connection (**Delete**).

On the view page you can see a list of repositories with the following parameters:

- **Name** - name;
- **Type** - type of repository manager;
- **Ecosystem** - type of stored artifacts (NPM, PyPI and others);
- **Is active** - presence of component requests in the last 24 hours;
- **Is available** - availability of the repository in API (checked once an hour);
- **Last request at** - date and time of the last request to check components.

You can see the list of packages and images from connected repositories in the `OSA -> Packages` and `OSA -> Container Images` sections, and the list of requests for verification in the `OSA -> Requests` section.

Within the sections, you can filter by individual components or the following fields:

- **Repository** – a repository within the artifact storage;
- **Technology** – a programming language or operating system;
- **License** – a component distribution license;
- **Block Status** – an indicator of a blocked component request;
- **Last Request** – the date of the last component request;
- **Repository Manager** – the name of the connected manager in CodeScoring;
- **Repository Ecosystem** – the type of stored artifacts (PyPI, NPM, etc.);
- **Contains Vulnerabilities** – the presence of vulnerabilities in the requested components;
- **Current** – a flag for an updated component. You can read more about this flag on the [Updating Component Data](/osa/update.en) page.

In addition, once the manager is connected, it is possible to [customize security policies](/osa/osa-policies.en) for individual repositories.
