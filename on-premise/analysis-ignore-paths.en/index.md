- [Русский](https://docs.codescoring.ru/on-premise/analysis-ignore-paths/index.md)

# Analysis exception paths

## Default values

There are exception paths for which manifests and files are not **searched** and quality analysis is not performed. By default, the following values are added to the exceptions (expression format is `glob`):

- `**/.git*`
- `**/.git/**`
- `**/fixtures/**`
- `**/tests/**`
- `**/doc/**`
- `**/docs/**`
- `**/samples/**`

## Adding exceptions

To add your own values to the list, in the `app.env` file you need to **add** values in the `ANALYSIS_IGNORED_PATHS` variable in the following format:

- `**/ignoring_prj_1/**` - to exclude the directory `ignoring_prj_1` from analysis;
- `**/ignoring_projects_*` - to exclude from the analysis directories that have `ignoring_projects_` in their name
- `**/ignoring_file.pom` - to exclude the file `ignoring_file.pom` from analysis

**Important**: It is not recommended to delete exception paths specified in the default variable.

Paths are added using `,`. Here is an example with `**/migrations/**` exception added:

```
ANALYSIS_IGNORED_PATHS=**/.git*,**/.git/**,**/fixtures/**,**/tests/**,**/doc/**,**/docs/**, **/samples/**,**/migrations/**
```
