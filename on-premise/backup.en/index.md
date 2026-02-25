- [Русский](https://docs.codescoring.ru/on-premise/backup/index.md)

# Backup

## Creating a backup copy of the platform

1. Go to the directory with the startup files:

```
cd /path/to/docker/compose
```

1. To create a backup, run the command:

```
docker compose run backup create
```

The backup file will be saved to the `backup` directory.

## Restoring from a backup copy

1. To restore from a backup copy, run the command:

```
docker compose run backup restore BACKUP_FILENAME
```

`BACKUP_FILENAME` is the name of the backup file. A list of available copies can be obtained by running the command:

```
ls -la ./backup
```

1. Restart the platform:

```
docker compose up -d --force-recreate --renew-anon-volumes
```
