# Подключение системы контроля версий

Для добавление в систему репозиториев необходимо предварительно создать подключение к системе контроля версий. Для интеграции CodeScoring использует механизм Personal Access Token.

## Добавление токена для GitHub

Оригинальная инструкция на английском: <https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token>

1. Войти в свой аккаунт в github, логин доступен по ссылке <https://github.com/login>.
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


## Добавление токена для GitLab

Оригинальная инструкция на английском: <https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token>

1. Войти в свой аккаунт в gitlab, логин доступен по ссылке <https://gitlab.com/users/sign_in>.
2. Через меню пользователя в правом верхнем углу перейти в раздел **Edit profile**.
    ![Edit profile](/assets/img/gitlab/edit-profile-link.png)
3. Далее в левом меню выбрать раздел **Access Tokens**.
    ![Access tokens](/assets/img/gitlab/access-tokens-link.png)
4. Задать название токену, например, "codescoring-demo", дату можно оставить пустой
5. В секции _scopes_ выбрать **read_api** и **read_repository**.
    ![Token scopes](/assets/img/gitlab/scopes.png)
6. Нажать кнопку **Create personal access token**.
7. Скопировать сгенерированный токен.
8. В интерфейсе CodeScoring перейти в раздел `Settings -> VCS`.
9. Нажать **Setup new** в правом верхнем углу.
10. Заполнить форму, как показано на скриншоте. Токен вставляется в поле _Access token_.
    ![VCS form](/assets/img/gitlab/vcs-form.png)
