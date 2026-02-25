- [Русский](https://docs.codescoring.ru/on-premise/troubleshooting/index.md)

# Troubleshooting

## Working with logs

1. Go to the directory with the startup files:

```
cd /path/to/docker/compose
```

1. Execute the command to copy the log file from the container to the file `codescoring_onprem.log`

```
docker cp -L PROJECT_NAME_fluentd_1:/fluentd/log/docker.log codescoring_onprem.log
```

1. Send the `codescoring_onprem.log` file to the vendor.

## System re-installation

If you want to start the installation process from scratch, you need to clean up the volumes.

If there are no other containers on the server with docker other than the CodeScoring project, run the command:

```
docker system prune --all --volumes
```

If there are other docker projects on the server:

1. stop docker compose:

```
docker compose down --remove-orphans
```

1. run the command:

```
docker volume rm PROJECT_NAME__db-data
```

1. If an error occurs that this volume is being used by the container, you should run the command and repeat the previous steps (`CT_HASH` will be in the error message):

```
docker rm CT_HASH
```

If the problem persists, contact your vendor support contact for further instructions.
