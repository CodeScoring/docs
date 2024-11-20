---
hide:
  - footer
---
# Создание конфигурации для поиска секретов

1. Для начала работы с модулем Secrets необходимо предварительно создать VCS или CLI [проект](/on-premise/how-to/projects) в разделе `Settings -> Projects`.

2. После создания проекта нужно задать конфигурацию движка секретов в разделе `Settings -> Secrets`, открыв форму по кнопке **Setup new**.

3. В форме конфигурации необходимо указать имя, выбрать движок для поиска секретов в коде и прописать ему стандартную конфигурацию – она будет передана на вход движка при сканировании.

Пример стандартной конфигурации для движка gitleaks:

```json
title = "Gitleaks title"

[extend]
useDefault = true
```

![Engine configuration example](/assets/img/secrets/engine-configuration.png)

Подробнее с конфигурированием движка gitleaks можно ознакомиться в [документации инструмента](https://github.com/gitleaks/gitleaks?tab=readme-ov-file#configuration).