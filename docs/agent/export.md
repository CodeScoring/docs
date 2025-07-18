---
hide:
  - footer
---

# Экспорт результатов сканирования

Консольный агент Johnny поддерживает выгрузку результатов сканирования в различных форматах. Это позволяет адаптировать отчетность под разные нужды, включая интеграцию с системами управления уязвимостями.

## Отчет о найденных уязвимостях

### Доступные форматы

- **coloredtable** – цветная таблица в консоли. Формат по умолчанию;
- **table** – простая таблица;
- **text** – текстовый отчет;
- **junit** – используется в CI/CD (Jenkins, GitLab CI, GitHub Actions);
- **sarif** – выгружается в DefectDojo, CodeQL, Semgrep;
- **csv** – применяется в BI-системах, Excel, Pandas, SQL;
- **gl-dependency-scanning-report** – формат отчета для [GitLab Dependency Scanning](https://docs.gitlab.com/ee/user/application_security/dependency_scanning/);
- **gl-code-quality-report** – формат отчета для [GitLab Code Quality](https://docs.gitlab.com/ee/ci/testing/code_quality.html);
- **gl-secrets-report** – формат отчета для [GitLab Secret Detection](https://docs.gitlab.com/user/application_security/secret_detection/).

### Пример использования

При необходимости можно указать несколько форматов, разделив их запятыми, например:

```bash
./johnny scan file path/to/file \
--api_token <api_token> \
--api_url <api_url> \
--format "coloredtable, junit>>junit.xml"
```

В этом примере вывод будет в формате `coloredtable` в консоль, а также сохранится в файл `junit.xml` в формате `junit`.

## Отчет о сработавших алертах

### Доступные форматы

- **coloredtable** – цветная таблица в консоли. Формат по умолчанию;
- **table** – простая таблица;
- **text** – текстовый отчет;
- **json** – структурированный формат на основе JavaScript Object Notation, удобен для машинной обработки данных;
- **csv** – текстовый формат файла, для хранения табличных данных.

**Важно**: структура данных в формате `json` может быть изменена в последующих версиях консольного агента.

### Пример использования

При необходимости можно указать несколько форматов, разделив их запятыми, например:

```bash
./johnny scan file path/to/file \
--api_token <api_token> \
--api_url <api_url> \
--alerts-format "coloredtable, json>>alerts.json"
```

В этом примере вывод будет в формате `coloredtable` в консоль, а также сохранится в файл `alerts.json` в формате `json`.