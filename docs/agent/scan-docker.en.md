---
hide:
  - footer
---

# Scanning a container image

The agent supports image scanning functionality in the OCI and Docker standards and can be launched in one of the following ways, indicating:

 - path to the **tar** archive created using **docker save**:

 ```bash
 ./johnny scan image ./my_own.tar \
 --api_url <api_url> \
 --api_token <api_token>
 ```

 - image name located in the **Docker** daemon, **Podman**:

 ```bash
 ./johnny scan image docker:python:3.9 \
 --api_url <api_url> \
 --api_token <api_token>
 ```

 - image name from the public **Docker HUB**:

 ```bash
 ./johnny scan image python:3.9 \
 --api_url <api_url> \
 --api_token <api_token>
 ```

 - image name from private **registry**:

 Before working with a private repository, you need to run the command ```docker login```
 ```bash
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

```bash
./johnny scan image ./my_own.tar \
--api_url <api_url> \
--api_token <api_token> \
--scan-files \
--ignore "**/node_modules"
```

## Command parameters

The **scan image** command has four unique parameters, in addition to the [general scan command settings](/agent/scan.en/#launch-options):

- `--hash` – specifying the image hash;
- `--scan-files` – scanning files in the image.
- `--branch-or-tag` – a reference to a branch or repository tag. Format `^refs/(heads|tags)/.+` (e.g. `refs/tags/v1.0`);
- `--commit` – specifying the commit hash.

For a summary of the available command parameters and usage instructions, you can call the command with the `-h, --help` flag.