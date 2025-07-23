---
hide:
  - footer
---

# Сохранение результатов сканирования

Для сохранения результатов сканирования в on-premise инсталляции необходимо добавить в команду параметры `--save-results` и `--project` или указать в config-файле следующие переменные:

- `project` — имя CLI-проекта в системе, в который будут сохраняться результаты;
- `save-results` — флаг сохранения результатов, по умолчанию стоит значение **false**.

Если CLI-проект не создан в системе заранее, можно указать в команде вызова или в config-файле параметр `--create-project`.
Для нового проекта можно указать группу `--project-group` и подразделение `--project-proprietor`

Пример команды сохранения результатов сканирования в новый проект:

```bash
./johnny scan dir . \
--api_token <api_token> \
--api_url <api_url> \
--save-results \
--create-project \
--project "project-name" \
--project-group "group" \
--project-proprietor "proprietor"
```