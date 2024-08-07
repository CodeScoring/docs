---
hide:
  - footer
---
# Пути анализа и исключения

## Значения по умолчанию

В анализе сконфигурированы исключения для путей, по которым **не производится** поиск манифестов, файлов и не происходит анализ качества. По умолчанию в исключения добавлены следующие значения (формат выражений — glob):

- `**/.git*`
- `**/.git/**`
- `**/fixtures/**`
- `**/tests/**`
- `**/doc/**`
- `**/docs/**`
- `**/samples/**`


## Добавление исключений

Чтобы добавить в список свои значения, в файле `app.env` в переменную `ANALYSIS_IGNORED_PATHS` необходимо **добавить** значения в формате:

- `**/ignoring_prj_1/**` - для исключения из анализа директории `ignoring_prj_1`;
- `**/ignoring_projects_*` - для исключения из анализа директорий у которых в навании присутствует `ignoring_projects_`;
- `**/ignoring_file.pom` - для исключения из анализа файла `ignoring_file.pom`.

**Важно**: не рекомендуется удалять пути исключений, указанные в переменной по умолчанию.


Пути добавляются через `,`. Пример переменной с добавленным исключением `**/migrations/**`:

```
ANALYSIS_IGNORED_PATHS=**/.git*,**/.git/**,**/fixtures/**,**/tests/**,**/doc/**,**/docs/**,**/samples/**,**/migrations/**
```