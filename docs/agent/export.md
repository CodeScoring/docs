---
hide:
  - footer
---

# Экспорт результатов сканирования

Консольный агент Johnny поддерживает выгрузку результатов сканирования в нескольких форматах. Это позволяет адаптировать отчетность под различные нужды, включая интеграцию с системами управления уязвимостями.

## Доступные форматы отчетов

- **coloredtable** – цветная таблица в консоли. Формат по умолчанию;  
- **table** – простая таблица;  
- **text** – текстовый отчет;  
- **junit** – используется в CI/CD (Jenkins, GitLab CI, GitHub Actions);  
- **sarif** – выгружается в DefectDojo, CodeQL, Semgrep;  
- **csv** – применяется в BI-системах, Excel, Pandas, SQL;
- **gl-dependency-scanning-report** – формат отчета для [GitLab Dependency Scanning](https://docs.gitlab.com/ee/user/application_security/dependency_scanning/);
- **gl-code-quality-report** – формат отчета для [GitLab Code Quality](https://docs.gitlab.com/ee/ci/testing/code_quality.html).

### Пример использования

При необходимости можно указать несколько форматов, разделив их запятыми, например:

```bash
./johnny scan file path/to/file \
--api_token <api_token> \
--api_url <api_url> \
--format coloredtable,junit>>junit.xml
```

В этом примере вывод будет в формате `coloredtable` в консоль, а также сохранится в файл `junit.xml` в формате `junit`.