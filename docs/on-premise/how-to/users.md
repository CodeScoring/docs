---
hide:
  - footer
---

# Управление учетными записями

## Создание учетных записей

Система CodeScoring поддерживает работу множества пользователей с отдельными учетными записями. Создание и управление учетными записями пользователей происходит в разделе `Settings -> Users`. 

Для создания нового пользователя необходимо перейти на форму по кнопке **Create New** и заполнить следующие поля:

- Username — имя пользователя в системе;
- First name — имя;
- Last name — фамилия;
- Contact email — электронная почта;
- Proprietor — принадлежность к собственнику кода в рамках системы;
- Access level — уровень доступа.

Список созданных пользователей на вкладке `Users` можно отфильтровать по следующим параметрам:

- Proprietor — собственник;
- Access level — уровень доступа; 
- Is active — признак действующей учетной записи;
- From LDAP — признак учетной записи, созданной через LDAP.

## Настройка учетных записей

Созданные учетные записи можно отредактировать или удалить в разделе `Settings -> Users`. Добавить пользователя в проект с указанной ролью можно по кнопке **Add Project** на вкладке Projects страницы редактирования пользователя.

Время сессии для неактивного пользователя ограничено. По умолчанию сессия пользователя заканчивается через 2 недели с момента последней активности, после чего нужно произвести повторный вход в систему.

Для конфигурации времени жизни сессии доступна переменная окружения (в секундах):
`SESSION_COOKIE_AGE` 

## Разделение уровней доступа

При создании учетной записи ей должна быть присвоен один из следующих уровней доступа - **User** (пользователь), **Administrator** (администратор) или **Auditor** (аудитор ИБ).

Для уровня доступа **User** доступно три роли в рамках индивидуального проекта:

- **Viewer** — доступ только на просмотр результатов анализов в рамках проекта;
- **Developer** — доступ к запуску анализа в веб-интерфейсе, через агента и через плагин прокси-репозитория;
- **Owner** — доступ к управлению политиками проекта, изменению настроек проекта и управлению доступами других пользователей проекта.

Для уровня доступа **Administrator** доступен просмотр и изменение всех настроек и проектов в системе без ограничений.

Для уровня доступа **Auditor** доступен просмотр всех настроек и проектов в системе без возможности вносить и сохранять изменения.

В проекте может быть несколько пользователей с одинаковыми ролями, в том числе несколько **Owner**. При отсутствии пользователей в роли **Owner** проектом может управлять только пользователь с уровнем доступа **Administrator**.

## Группы пользователей

Пользователи внутри системы могут быть распределены в группы. Создание и управление группами происходит в разделе `Settings->Groups`. 

Для создания новой группы пользователей необходимо перейти на форму по кнопке **Create New** и заполнить следующие поля:

- Name — название;
- Description — описание.

Группы могут быть добавлены к созданным проектам для более удобного отслеживания пользователей, связанных с проектом.