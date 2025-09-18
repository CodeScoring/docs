---
hide:
- footer
---

# Working with dependencies in Python

## pip

### Creating `requirements.txt`

1. Install dependencies and save them to a lock file:

	```sh
	pip freeze > requirements.txt
	```

## pipenv

### Creating `Pipfile.lock`

1. Install pipenv:

	```sh
	pip install pipenv
	```

2. Create `Pipfile.lock`:

	```sh
	pipenv install
	```

## poetry

### Creating `poetry.lock`

If `poetry.lock` does not already exist, Poetry will create it automatically when installing dependencies. If the file already exists, it will be updated. To do this, run the command:

	```bash
	poetry lock
	```

This command will update the dependencies specified in `pyproject.toml` and create or update the `poetry.lock` file.