---
hide:
  - footer
---

# Connecting to a VCS

To add projects (Git repositories) to the system for analysis, you must first create a connection to the version control system (VCS). CodeScoring supports the following platforms:

- GitLab
- GitHub
- BitBucket (Data Center and Server only)
- Azure DevOps Git
- Gitflic
- Other platforms using Git

Integration occurs through two possible mechanisms: Personal Access Token or SSH key. For the Personal Access Token mechanism, it is possible to connect several version control systems with the same address, but different tokens.

After connecting the version control system, it is impossible to change its type (`Instance type`) and address (`Instance URL`).

**Note**: if private NS servers are used to access the version control system, they must be specified in the installation settings. To obtain the appropriate templates, you must contact the vendor.

## Adding an SSH key

1. Copy an existing or generate a new private SSH key in the version control system according to the instructions for:
 - [Gitlab](https://docs.gitlab.com/ee/user/ssh.html])
 - [Github](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
 - [BitBucket](https://support.atlassian.com/bitbucket-cloud/docs/configure-ssh-and-two-step-verification/)
 - [Azure DevOps Git](https://learn.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops)
2. In the CodeScoring interface, go to the `Settings -> SSH Keys` section
3. Click **Setup new** in the upper right corner.
4. Fill out the form. The private SSH key is inserted into the **Instance private key** field.
5. Go to the `Settings -> VCS` section.
6. Click **Setup new** in the upper right corner.
7. Fill out the form as shown in the screenshot. The SSH key is selected from the list in the **SSH key** field.
 ![VCS form with SSH key](/assets/img/vcs-ssh-key.png)
8. You can check the connection by clicking the **Test it** button. To create a connection, click on the **Setup now** button.

## Adding a token for GitLab

Original instructions for generating a token: <https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token>

1. Log in to your GitLab account; for the cloud version, the login is available at the link <https://gitlab.com/users/sign_in>.
2. Through the user menu in the upper right corner, go to the **Edit profile** section.

 ![Edit profile](/assets/img/gitlab/edit-profile-link.png)

3. Next, in the left menu, select the **Access Tokens** section.

 ![Access tokens](/assets/img/gitlab/access-tokens-link.png)

4. Give the token a name, for example, “*codescoring-demo*”, the date can be left blank
5. In the _scopes_ section, select **read_api** and **read_repository**.
 ![Token scopes](/assets/img/gitlab/scopes.png)
6. Click the **Create personal access token** button.
7. Copy the generated token.
8. In the CodeScoring interface, go to the `Settings -> VCS` section.
9. Click **Setup new** in the upper right corner.
10. Fill out the form as shown in the screenshot. The token is inserted into the _Access token_ field.
 ![VCS form for GitLab](/assets/img/gitlab/cs-vcs-form-gitlab.png)

## Adding a token for GitHub

Original instructions for generating a token: <https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token >

1. Log in to your GitHub account; for the cloud version, the login is available at <https://github.com/login>.
2. If your account email is not verified, be sure to do this according to [instructions](https://docs.github.com/en/get-started/signing-up-for-github/verifying-your-email-address).
3. Through the user menu in the upper right corner, go to the **Settings** section.
4. Next, in the left menu, select the **Developer settings** section.
5. In the left menu, select the **Personal access tokens** section.
6. Give the token a name, for example, “codescoring-demo”.
7. In the Select scopes section, select all options from the _repos_ list.
8. Click the **Generate token** button.
9. Copy the generated token.
10. In the CodeScoring interface, go to the `Settings -> VCS` section.
11. Click **Setup new** in the upper right corner.
12. Fill out the form as shown in the screenshot. The token is inserted into the _Access token_ field.
 ![VCS form for GitHub](/assets/img/github/cs-vcs-form-github.png)

## Adding a token for BitBucket Data Center and Server

Original instructions for generating a token in English: <https://confluence.atlassian.com/bitbucketserver072/personal-access-tokens-1005335924.html>

1. Log in to your BitBucket account.
2. Through the user menu in the upper right corner, go to the **Manage account** section.
3. Next, in the left menu, select the **Personal access tokens** section.
4. Click on **Create token**.
5. Give the token a name, for example, “codescoring-demo”.
6. In the **Permissions** section, give read rights to projects and repositories.
7. In the **Expiry** section, if desired, set the token lifetime.
8. Click the **Create** button.
9. Copy the generated token.
10. In the CodeScoring interface, go to the `Settings -> VCS` section.
11. Click **Setup new** in the upper right corner.
12. Fill out the form as shown in the screenshot. The token is inserted into the _Access token_ field.
 ![VCS form for BitBucket Server](/assets/img/bitbucket/cs-vcs-form-bitbucket.png)

## Adding a token for Azure DevOps Git

Original instructions for generating a token in English: <https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops>

1. Sign in to your Azure DevOps account.
2. Through the user menu in the upper right corner, go to the **Personal access tokens** section.

 ![PAT menu item](/assets/img/azure/pat-menu-item.png)

3. Next, click the **New token** button.
4. Set a name for the token, for example, “codescoring-demo”, and the validity period of the token.
5. In the _Scopes_ section, be sure to check **Read** access for the **Code** and **Identity** entities.
6. Click the **Create** button.
7. Copy the generated token.
8. In the CodeScoring interface, go to the `Settings -> VCS` section.
9. Click **Setup new** in the upper right corner.
10. Fill out the form as shown in the screenshot. The token is inserted into the _Access token_ field.
 ![VCS form for Azure](/assets/img/azure/cs-vcs-form-azure.png)

## Connecting GitFlic via ssh

1. Create a new ssh key pair without passphase with type **RSA_SHA512**,**SSH_ED25519** or **ECDSA-SHA2-nistp256**.

    ```bash
    ssh-keygen -t ed25519 -N "" -q -f /tmp/id25519
    ```

2. Go to GitFlic web interface, `Settings -> Keys` and add **public** key to GitFlic key pool.

    You can view the contents of the public key using the following command:
    ```bash
    cat /tmp/id25519.pub
    ```

3. Go to the CodeScoring interface in the `Settings -> SSH Keys` section, open the form for adding a key by clicking the **Setup New** button and add the **private** key to the CodeScoring key pool.

    You can view the contents of the private key using the following command:
    ```bash
    cat /tmp/id25519
    ```

4. Go to the `Settings -> VCS` section, open the form for adding a VCS by clicking the **Setup New** button and fill in the fields for creating a VCS instance:

    - **Instance name** – VCS connection name;
    - **Instance clone type** – cloning type (select SSH type);
    - **Instance type** – VCS instance type (select Other git type);
    - **Instance url** – the address where VCS is available;
    - **SSH key** – the SSH key created in step 4.

5. Go to the `Settings -> Project` section, open the form for creating a new project by clicking the **Create New** button and fill in the project creation fields:

    - **Repository** – a link to the repository in GitFlic;
    - **VCS** – the name of the VCS instance created in step 6.

    **Important**: due to the specifics of GitFlic and CodeScoring, the standard link to the repository must be modified by removing the `/project/` part of the path. For example:
      ```
      <https://gitflic.ru/project/kovalevaa/utils.git> -> <https://gitflic.ru/kovalevaa/utils.git>_
      ```

6. Save the project.

## Synchronization of data from VCS

CodeScoring automatically synchronizes data from version control systems when adding a project, running analysis, and as part of background tasks. All mechanisms for obtaining and updating data from `git` are described below:

1. When adding a project with a link to VCS, CodeScoring creates a local copy of the repository in `bare` mode and saves it in the project directory.
2. When running SCA, TQI or Secrets analysis, the system fetches the current state of the branch specified in the project settings.
3. Once a month, CodeScoring initiates a background task that synchronizes all connected `VCS` projects with remote repositories.
    - `git fetch` is performed for all VCS projects
    - Tasks are distributed using the Huey tool to evenly distribute the load over the remaining days of the month

**Note:** if you need to synchronize the repository early, you can use a manual code update on the project page in the `Settings -> Projects` section.