- [Русский](https://docs.codescoring.ru/dependencies/python/index.md)

# Working with dependencies in Python

## pip

### Creating `requirements.txt`

1. Install dependencies and save them to a lock file:

   ```
   pip freeze > requirements.txt
   ```

## pipenv

### Creating `Pipfile.lock`

1. Install pipenv:

   ```
   pip install pipenv
   ```

1. Create `Pipfile.lock`:

   ```
   pipenv install
   ```

## poetry

### Creating `poetry.lock`

If `poetry.lock` does not already exist, Poetry will create it automatically when installing dependencies. If the file already exists, it will be updated. To do this, run the command:

````
```bash
poetry lock
````

```

This command will update the dependencies specified in `pyproject.toml` and create or update the `poetry.lock` file.

## pipdeptree

### Creating the `pipdeptree.txt` file

When a `pipdeptree.txt` file is detected, the agent will analyze its contents as the output of the pipdeptree utility in the standard dependency tree format.
To create the file, you can use the following commands:

```

pipdeptree > pipdeptree.txt

```

To filter the output by specific packages:

```

pipdeptree --packages "example1,example2" > pipdeptree.txt

```

## uv

### Creating `uv.lock`

If `uv.lock` does not already exist, uv will create it automatically when installing dependencies. If the file already exists, it will be updated. To do this, run the command:

```

```bash
uv lock
```

```

This command will update the dependencies specified in `pyproject.toml` and create or update the `uv.lock` file.

### UV workspaces mechanism Support

The [UV workspaces](https://docs.astral.sh/uv/concepts/projects/workspaces/) mechanism allows centralized management of multiple packages.

In `pyproject.toml`, the following entry can be specified in the workspaces section:

```

[tool.uv.workspace] members = [ "packages/core", "packages/api" ]

````

In this case, the Johnny agent will process the root `pyproject.toml` and all `pyproject.toml` files of all packages from the workspace as a single entity.```
````
