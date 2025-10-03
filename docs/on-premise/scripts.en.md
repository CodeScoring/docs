---
hide:
  - footer
---

# Scripts for platform management

## Script execution

Scripts are executed in the platform backend service:

- for Docker Compose:

``` bash
docker exec -it <backend service> ./manage.py runscript <команда>`
```

- for Helm:

``` bash
kubectl exec -it <backend service> ./manage.py runscript <команда>
```

All usage examples are provided for docker-compose but can also be run in k8s. To do so, replace `docker` with `kubectl`.

Arguments passed to the script are strictly positional and are specified with the `--script-arg` key. Optional arguments are enclosed in square brackets.

## Available commands

### `set_new_secret_key`

This command sets a new value for the `SECRET_KEY` environment variable. To avoid issues with encoding, aliases, or other unexpected console behavior, it is recommended to copy the `NEW_SECRET_KEY` value from the terminal output after the script has finished.

**Syntax**

```bash
 set_new_secret_key --script-arg="NEW_SECRET_KEY" [--script-arg="OLD_SECRET_KEY"]
```

**Usage examples**

1. Changing from explicitly specified `OLD_SECRET_KEY` to explicitly specified `NEW_SECRET_KEY`. This is required when the `SECRET_KEY` environment variable value during platform launch differs from `OLD_SECRET_KEY`.

      ```bash
      ./manage.py runscript set_new_secret_key --script-arg="NEW_SECRET_KEY" --script-arg="OLD_SECRET_KEY"
      ```

      This command will re-encrypt all sensitive fields from the given `OLD_SECRET_KEY` to `NEW_SECRET_KEY`.

      **IMPORTANT!** If the `SECRET_KEY` variable at the moment of script execution does not match the `NEW_SECRET_KEY`,
      after successful script completion you must update the `SECRET_KEY` variable to `NEW_SECRET_KEY` and restart the
      platform.

2. Changing to explicitly specified `NEW_SECRET_KEY` without specifying `OLD_SECRET_KEY`. This is required when `OLD_SECRET_KEY` matches the one defined in `settings.SECRET_KEY`.

      ```bash
      ./manage.py runscript set_new_secret_key --script-arg="NEW_SECRET_KEY"
      ```

      This command will re-encrypt all sensitive fields from the key set in `settings.SECRET_KEY` to `NEW_SECRET_KEY`.

      After successful script completion you must update the `SECRET_KEY` variable to `NEW_SECRET_KEY` and restart the platform.
