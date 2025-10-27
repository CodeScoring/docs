- [Русский](../../agent/gitlab-ci/)

# Integration into Gitlab CI

The CLI agent supports integration into Gitlab CI using the `.gitlab-ci.yaml` file and is supplied as both a Docker image and a binary file.

### Johnny Docker image

An example of the contents of the `.gitlab-ci.yaml` file when using a Docker image of the agent:

`<version>` must be replaced with the agent version. A list of current versions with descriptions is available in [Changelog](/changelog/johnny-changelog.en/).

```
stages:
 - test

sca:
 stage: test

 script:
 - docker pull REGISTRY_URL/johnny-depp:<version>
 ->
 docker run -v $(pwd):/code
 <registry-address>/johnny-depp
 --api_token $CODESCORING_API_TOKEN
 --api_url $CODESCORING_API_URL
 --ignore.git
 --ignore fixtures
 --ignore parsers
 .

 artifacts:
 paths:
 -bom.json
 when: always
 expire_in: 1 week
```

### Johnny binary file

To use the agent binary file, you must first perform the following steps on the gitlab-runner machine:

1. Download the file with the command

   ```
   wget -O /usr/local/bin/johnny https://REGISTRY_USERNAME:REGISTRY_PASSWORD@REGISTRY_URL/repository/files/codescoring/johnny-depp/JOHNNY_VERSION/johnny-linux-amd64-JOHNNY_VERSION
   ```

   or

   ```
   curl -o /usr/local/bin/johnny https://REGISTRY_USERNAME:REGISTRY_PASSWORD@REGISTRY_URL/repository/files/codescoring/johnny-depp/JOHNNY_VERSION/johnny-linux-amd64-JOHNNY_VERSION
   ```

   `JOHNNY_VERSION` must be replaced with the agent version. A list of current versions with descriptions is available in [Changelog](/changelog/johnny-changelog.en/). `REGISTRY_URL`, `REGISTRY_USERNAME` and `REGISTRY_PASSWORD` should be replaced with the URL, login and password received from the vendor.

1. Allow file execution

   ```
   chmod +x /usr/local/bin/johnny
   ```

An example of executing the binary file in `.gitlab-ci.yaml`:

```
stages:
 -test

sca:
 stage: test

 script:
 ->
 johnny
 scan dir
 --api_token $JOHNNY_API_TOKEN
 --api_url $JOHNNY_API_URL
 --ignore.git
 --ignore fixtures
 --ignore parsers
 .

 artifacts:
 paths:
 -bom.json
 when: always
 expire_in: 1 week
```
