---
hide:
  - footer
---

# Сканирование на наличие секретов

Сканирование на наличие секретов выполняется с помощью команды `johnny secrets gitleaks dir`.

**Важно**: агент работает только с версией Gitleaks 8.19.0 и выше.

При запуске агент:

1. Анализирует файлы в указанной директории на наличие секретов (пароли, токены, ключи доступа и т. д.).
  - исключает файлы и каталоги, указанные в `.gitleaksignore`;
  - игнорирует секреты, зафиксированные в отчете Gitleaks, если задан `baseline-path`.
2. Формирует результаты по найденным секретами, при необходимости сохраняет их на инсталляции CodeScoring и создает отчет в формате GitLab.

## Пример запуска команды

```bash
johnny secrets gitleaks dir . \
--gitleaks-path <path-to-gitleaks> \
--api_token <api_token> \
--api_url <api_url> \
--save-results \
--create-project \
--project <project-name> \
--gitleaks-ignore-path .gitleaksignore \
--gl-secrets-report \
--gl-secrets-report-filename secrets-report.json
```

Данная команда запускает сканирование секретов в текущей директории, игнорируя файлы, перечисленные в `.gitleaksignore`, отправляет результаты на инсталляцию CodeScoring, и формирует отчет в формате GitLab, записывая его в `secrets-report.json`.

## Параметры команды

Команда **johnny secrets gitleaks dir** имеет следующие уникальные параметры, помимо [общих настроек команды сканирования](/agent/scan/#_2):

### Параметры запуска поиска секретов

- `--gitleaks-path` – путь к исполняемому файлу Gitleaks, который будет использоваться при сканировании. Если не задан, будет выполняться вызов системной команды `gitleaks`;
- `--gl-secrets-report` – включение формирования отчета о найденных секретах в формате GitLab;
- `--gl-secrets-report-filename` – имя выходного файла для отчета в формате GitLab (по умолчанию `gl-secrets-report.json`).

#### Параметры Gitleaks

- `--baseline-path` – путь к файлу отчета Gitleaks, который используется в качестве базовой линии для игнорирования ранее найденных секретов.
- `--enable-rule` – список ID правил, которые будут **включены** при сканировании.
- `--gitleaks-ignore-path` – путь к файлу `.gitleaksignore` или директории, содержащей его, для исключения файлов и каталогов из сканирования.
- `--ignore-gitleaks-allow` – игнорирование комментариев `gitleaks:allow`, которые помечают строки как безопасные для игнорирования.
- `--log-level` – уровень логирования, который контролирует подробность выводимых сообщений. Возможные значения: `trace`, `debug`, `info`, `warn`, `error`, `fatal`.
- `--max-decode-depth` – максимальная глубина рекурсивного декодирования при поиске секретов. Значение `0` отключает декодирование.
- `--max-target-megabytes` – максимальный размер анализируемых файлов в мегабайтах. Файлы, превышающие этот размер, будут пропущены.
- `--no-banner` – отключение баннера Gitleaks, который отображается при запуске инструмента.
- `--no-color` – отключение цветного вывода для подробного режима (`verbose`).
- `--redact` – маскирование найденных секретов в логах. Можно задать промежуточные значения (например, `20` для скрытия 20% секрета).
- `--verbose` – включение подробного (`verbose`) вывода, предоставляющего больше информации о процессе сканирования.

Для сводки доступных параметров команды и инструкции по использованию можно вызвать команду с флагом `-h, --help`.