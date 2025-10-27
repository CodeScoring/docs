- [Русский](../../agent/scan-docker/)

# Scanning a container image

The agent supports image scanning functionality in the OCI and Docker standards and can be launched in one of the following ways, indicating:

- path to the **tar** archive created using **docker save**:

```
./johnny scan image ./my_own.tar \
--api_url <api_url> \
--api_token <api_token>
```

- image name located in the **Docker** daemon, **Podman**:

```
./johnny scan image docker:python:3.9 \
--api_url <api_url> \
--api_token <api_token>
```

- image name from the public **Docker HUB**:

```
./johnny scan image python:3.9 \
--api_url <api_url> \
--api_token <api_token>
```

- image name from private **registry**:

Before working with a private repository, you need to run the command `docker login`

```
./johnny scan image pvt_registry/johnny-depp:<version> \
--api_url <api_url> \
--api_token <api_token>
```

Alternatively, you can log in to the private registry using environment variables:

- `JOHNNY_REGISTRY_AUTH_AUTHORITY` - URL to the registry (for example "docker.io", "localhost:5000", etc.);
- `JOHNNY_REGISTRY_AUTH_LOGIN` - login;
- `JOHNNY_REGISTRY_AUTH_PASSWORD` - password;
- `JOHNNY_REGISTRY_AUTH_TOKEN` - token;

or through similar variables in the config file:

- `authority`;
- `login`;
- `password`;
- `token`.

**Note**: token and login with password are interchangeable.

## Scanning the file system inside a Docker image

To scan files inside an image, you need to add the `--scan-files` parameter to the command or specify the `scan-files` variable in the `image` section in the config file.

When scanning a file system, you can use the `--ignore` option to exclude specific files from analysis. For example:

```
./johnny scan image ./my_own.tar \
--api_url <api_url> \
--api_token <api_token> \
--scan-files \
--ignore "**/node_modules"
```

## Command parameters

The **scan image** command has two unique parameters, in addition to the [general scan command settings](/agent/scan.en/#launch-options):

- `--hash` – specifying the image hash;
- `--scan-files` – scanning files in the image.

For a summary of the available command parameters and usage instructions, you can call the command with the `-h, --help` flag.
