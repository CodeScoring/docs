---
hide:
  - footer
---

# Подключение системы контроля версий

Для добавления в систему проектов (Git репозиториев) на анализ необходимо предварительно создать подключение к системе контроля версий (VCS). CodeScoring поддерживает следующие платформы:

- GitLab
- GitHub
- BitBucket (только Data Center и Server)
- Azure DevOps Git
- GitFlic
- Другие платформы, использующие Git

Интеграция происходит через два возможных механизма: Personal Access Token или ключ SSH. Для механизма Personal Access Token возможно подключение нескольких систем контроля версий с одним адресом, но разными токенами.

После подключения системы контроля версий невозможно поменять ее тип (`Instance type`) и адрес (`Instance URL`).

**Примечание**: в случае, если для обращения к системе контроля версий используются приватные NS сервера, их надо указать в настройках инсталляции. Для получения соответствующих шаблонов необходимо обратиться к вендору.

## Добавление SSH-ключа

1. Скопировать существующий или сгенерировать новый приватный SSH ключ в системе контроля версий по инструкции для:
    - [Gitlab](https://docs.gitlab.com/ee/user/ssh.html)
    - [Github](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
    - [BitBucket](https://support.atlassian.com/bitbucket-cloud/docs/configure-ssh-and-two-step-verification/)
    - [Azure DevOps Git](https://learn.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops)
2. В интерфейсе CodeScoring перейти в раздел `Settings -> SSH Keys`
3. Нажать **Setup new** в правом верхнем углу.
4. Заполнить форму. Приватный SSH ключ вставляется в поле **Instance private key**.
5. Перейти в раздел `Settings -> VCS`.
6. Нажать **Setup new** в правом верхнем углу.
7. Заполнить форму, как показано на скриншоте. SSH ключ выбирается из списка в поле **SSH key**.
    ![VCS form with SSH key](/assets/img/vcs-ssh-key.png)
8. Проверить подключение можно по кнопке **Test it**. Для создания подключения необходимо нажать на кнопку **Setup now**.

## Добавление токена для GitLab

Оригинальная инструкция для генерации токена на английском: <https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token>

1. Войти в свой аккаунт в GitLab, для облачной версии логин доступен по ссылке <https://gitlab.com/users/sign_in>.
2. Через меню пользователя в правом верхнем углу перейти в раздел **Edit profile**.

    ![Edit profile](/assets/img/gitlab/edit-profile-link.png)

3. Далее в левом меню выбрать раздел **Access Tokens**.

    ![Access tokens](/assets/img/gitlab/access-tokens-link.png)

4. Задать название токену, например, "*codescoring-demo*", дату можно оставить пустой
5. В секции _scopes_ выбрать **read_api** и **read_repository**.
    ![Token scopes](/assets/img/gitlab/scopes.png)
6. Нажать кнопку **Create personal access token**.
7. Скопировать сгенерированный токен.
8. В интерфейсе CodeScoring перейти в раздел `Settings -> VCS`.
9.  Нажать **Setup new** в правом верхнем углу.
10. Заполнить форму, как показано на скриншоте. Токен вставляется в поле _Access token_.
    ![VCS form for GitLab](/assets/img/gitlab/cs-vcs-form-gitlab.png)

## Добавление токена для GitHub

Оригинальная инструкция для генерации токена на английском: <https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token>

1. Войти в свой аккаунт в GitHub, для облачной версии логин доступен по ссылке <https://github.com/login>.
2. Если у аккаунта не верифицирован email, обязательно это сделать по [инструкции](https://docs.github.com/en/get-started/signing-up-for-github/verifying-your-email-address).
3. Через меню пользователя в правом верхнем углу перейти в раздел **Settings**.
4. Далее в левом меню выбрать раздел **Developer settings**.
5. В левом меню выбрать раздел **Personal access tokens**.
6. Задать название токену, например, "codescoring-demo".
7. В секции Select scopes выбрать все опции списка _repos_.
8. Нажать кнопку **Generate token**.
9. Скопировать сгенерированный токен.
10. В интерфейсе CodeScoring перейти в раздел `Settings -> VCS`.
11. Нажать **Setup new** в правом верхнем углу.
12. Заполнить форму, как показано на скриншоте. Токен вставляется в поле _Access token_.
    ![VCS form for GitHub](/assets/img/github/cs-vcs-form-github.png)

## Добавление токена для BitBucket Data Center и Server

Оригинальная инструкция для генерации токена на английском: <https://confluence.atlassian.com/bitbucketserver072/personal-access-tokens-1005335924.html>

1. Войти в свой аккаунт в BitBucket.
2. Через меню пользователя в правом верхнем углу перейти в раздел **Manage account**.
3. Далее в левом меню выбрать раздел **Personal access tokens**.
4. Нажать на **Create token**.
5. Задать название токену, например, "codescoring-demo".
6. В секции **Permissions** дать права на чтение для проектов и репозиториев.
7. В секции **Expiry** при желании задать срок жизни токена.
8. Нажать кнопку **Create**.
9. Скопировать сгенерированный токен.
10. В интерфейсе CodeScoring перейти в раздел `Settings -> VCS`.
11. Нажать **Setup new** в правом верхнем углу.
12. Заполнить форму, как показано на скриншоте. Токен вставляется в поле _Access token_.
    ![VCS form for BitBucket Server](/assets/img/bitbucket/cs-vcs-form-bitbucket.png)

## Добавление токена для Azure DevOps Git

Оригинальная инструкция для генерации токена на английском: <https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops>

1. Войти в свой аккаунт в Azure DevOps.
2. Через меню пользователя в правом верхнем углу перейти в раздел **Personal access tokens**.

    ![PAT menu item](/assets/img/azure/pat-menu-item.png)

3. Далее нажать кнопку **New token**.
4. Задать название токену, например, "codescoring-demo", и срок действия токена.
5. В секции _Scopes_ обязательно отметить доступ на **Read** для сущностей **Code** и **Identity**.
6. Нажать кнопку **Create**.
7. Скопировать сгенерированный токен.
8. В интерфейсе CodeScoring перейти в раздел `Settings -> VCS`.
9. Нажать **Setup new** в правом верхнем углу.
10. Заполнить форму, как показано на скриншоте. Токен вставляется в поле _Access token_.
    ![VCS form for Azure](/assets/img/azure/cs-vcs-form-azure.png)

## Подключение GitFlic через ssh

1. Создайте новую пару ключей ssh без passphase с типом **RSA_SHA512**,**SSH_ED25519** или **ECDSA-SHA2-nistp256**.
        ```bash
        ssh-keygen -t ed25519 -N "" -q -f /tmp/id25519
        ```
2. Перейдите в веб-интерфейс GitFlic в раздел `Настройки -> Ключи` и добавьте **публичный** ключ в пул ключей GitFlic.

    Посмотреть содержимое публичного ключа можно при помощи следующей команды:
        ```bash
        cat /tmp/id25519.pub
        ```

3. Перейдите в интерфейс CodeScoring в раздел `Settings -> SSH Keys`, откройте форму добавления ключа по кнопке **Setup New**  и добавьте **приватный** ключ в пул ключей CodeScoring.

    Посмотреть содержимое приватного ключа можно при помощи следующей команды:
        ```bash
        cat /tmp/id25519
        ```

4. Перейдите в раздел `Settings -> VCS`, откройте форму добавления VCS по кнопке **Setup New** и заполните поля создания VCS инстанса:

    - **Instance name** – название VCS подключения;
    - **Instance clone type** – тип клонирования (выбрать тип SSH);
    - **Instance type** – тип инстанса VCS (выбрать тип Other git);
    - **Instance url** – адрес, по которому доступен VCS;
    - **SSH key** – ключ SSH, созданный в пункте 3.

5. Перейдите  в раздел `Settings -> Project`, откройте форму создания нового проекта по кнопке **Create New** и заполните поля создания проекта:

    - **Repository** – ссылка на репозиторий в GitFlic;
    - **VCS** – название инстанса VCS, созданного в пункте 6.

    **Важно**: ввиду особенностей работы GitFlic и CodeScoring, стандартную ссылку на репозиторий необходимо модифицировать, убрав из нее часть пути `/project/`. Например:
        ```
        <https://gitflic.ru/project/kovalevaa/utils.git> -> <https://gitflic.ru/kovalevaa/utils.git>_
        ```

6. Сохраните проект.

## Синхронизация данных из VCS

CodeScoring автоматически синхронизирует данные из систем контроля версий при добавлении проекта, запуске анализа и в рамках фоново выполняемых задач. Ниже описаны все механизмы получения и обновления данных из `git`:

1. При добавлении проекта с привязкой к VCS, CodeScoring создаёт локальную копию репозитория в режиме `bare` и сохраняет её в каталоге проекта.
2. При запуске SCA, TQI или Secrets анализа система загружает актуальное состояние ветки, указанной в настройках проекта.
3. Раз в месяц CodeScoring инициирует фоновую задачу, которая синхронизирует все подключённые `VCS`-проекты с удалёнными репозиториями.
    - Выполняется `git fetch` для всех VCS-проектов
    - Задачи распределяются с помощью инструмента Huey так, чтобы равномерно распределить нагрузку по оставшимся дням месяца

**Примечание:** при необходимости досрочной синхронизации репозитория можно использовать ручной запуск обновления кода на странице проекта в разделе `Настройки -> Проекты`.