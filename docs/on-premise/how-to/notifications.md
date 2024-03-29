---
hide:
  - footer
---

# Настройка уведомлений

Для каждой политики можно настроить дополнительные уведомления о срабатывании политик, помимо просмотра результатов в разделе `Policy Alerts`. На данный момент доступно два способа оповещения: через **email** и через таск-менеджер **Jira**.

## Уведомления через email

Отправка email оповещений осуществляется через интеграцию по протоколу SMTP.

Для отправки уведомлений через email необходимо предварительно настроить почтовый сервер в разделе `Settings -> Email`. Для этого нужно заполнить все обязательные параметры и активировать флаг **Is active**.

Проверить правильность конфигурации можно по кнопке **Test it**.

![CodeScoring email settings example](/assets/img/email-settings.png)

После настройки почтового сервера в разделе `Actions` на странице политики можно добавить email адрес, на который будет осуществляться рассылка писем с результатами работы политики.

![Add email](/assets/img/actions-email.png)

Письмо с результатами работы политики отправляется **по завершении сканирования проекта или контейнерного образа**. В письме содержится список всех политик, для которых были настроены уведомления и которые сработали как минимум один раз, а также следующая информация о данных политиках:

- **Policy name** — название сработавшей политики;
- **Blocker** — признак блокирующей политики;
- **Dependency**  — название компонента;
- **Vulnerability** — идентификатор уязвимости.

## Создание задач в Jira

CodeScoring поддерживает интеграцию с таск-менеджером Jira для формирования задач по сработавшим политикам. Настройка интеграции происходит в разделе `Settings -> Task managers`.

Для создания новой интеграции используется форма по кнопке **Setup new**.

- **Name** - название интеграции;
- **Type** - тип таск-менеджера (по умолчанию – Jira Server);
- **URL** - адрес, по которому доступен таск-менеджер;
- **Auth type** - тип аутентификации (через access token или логин и пароль).

После заполнения полей можно проверить соединение с сервером по кнопке **Test it**, или завершить создание по кнопке **Setup now**.

![CodeScoring Jira settings example](/assets/img/jira-settings.png)

После настройки интеграции в разделе `Actions` на странице политики можно добавить сервер Jira, на котором будет создаваться задача с результатами работы политики.