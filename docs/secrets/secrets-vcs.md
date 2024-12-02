---
hide:
  - footer
---
# Настройка VCS проекта для работы с секретами

Для работы модуля Secrets в рамках проекта необходимо задать параметры сканирования на странице настроек проекта в разделе `Settings -> Projects`:

- **Secrets scan schedule** – график сканирования на наличие секретов (ежедневное или еженедельное);
- **Secrets engine configuration** – конфигурация [движка секретов](/secrets/secrets-setup);
- **Secrets scan scope** – область применения сканирования (**Repo**, для сканирования всех веток в рамках репозитория или **Default branch** для сканирования стандартной ветки).

![VCS configuration example](/assets/img/secrets/vcs-configuration.png)

