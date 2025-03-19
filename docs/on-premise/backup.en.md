---
hide:
  - footer
---
# Backup

## Creating a backup copy of the installation

1. Go to the directory with the startup files:

 ```bash linenums="1"
 cd /path/to/docker/compose
 ```

2. To create a backup, run the command:


 ```bash linenums="2"
 docker compose run backup create
 ```

 The backup file will be saved to the `backup` directory.


## Restoring from a backup copy

1. To restore from a backup copy, run the command:


 ```bash linenums="1"
 docker compose run backup restore BACKUP_FILENAME
 ```

 `BACKUP_FILENAME` is the name of the backup file. A list of available copies can be obtained by running the command:

 ```bash
 ls -la ./backup
 ```

2. Restart the installation:

 ```bash linenums="2"
 docker compose up -d --force-recreate --renew-anon-volumes
 ```

