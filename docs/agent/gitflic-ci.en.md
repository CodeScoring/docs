---
hide:
  - footer
---

# Integration into Gitflic CI

Using the johnny console agent, you can configure component scanning in GitFlic CI. The supported runner types are GitFlic shell and GitFlic docker.

## Using the agent with the GitFlic shell runner type

To use the console agent with the GitFlic Shell runner type, you must first perform the following steps on the machine with the agent:

1. Download the file using the command
    ```bash
    wget -O /usr/local/bin/johnny https://REGISTRY_USERNAME:REGISTRY_PASSWORD@REGISTRY_URL/repository/files/codescoring/johnny-depp/JOHNNY_VERSION/johnny-linux-amd64-JOHNNY_VERSION
    ```
    or
    ```bash
    curl -o /usr/local/bin/johnny https://REGISTRY_USERNAME:REGISTRY_PASSWORD@REGISTRY_URL/repository/files/codescoring/johnny-depp/JOHNNY_VERSION/johnny-linux-amd64-JOHNNY_VERSION
    ```

    `JOHNNY_VERSION` should be replaced with the agent version. The list of current versions with descriptions is available in the [Changelog](/changelog/johnny-changelog.en) section. `REGISTRY_URL`, `REGISTRY_USERNAME` and `REGISTRY_PASSWORD` should be replaced with the URL, login and password received from the vendor.

2. Allow file execution

```bash
chmod +x /usr/local/bin/johnny
```

Example of requesting the agent binary in `gitflic-ci.yaml`:

  ```yaml
    stages:
      - test

    sca:
      stage: test

    script:
        - >
          johnny
          scan dir
          --api_token $JOHNNY_API_TOKEN
          --api_url $JOHNNY_API_URL
          --ignore .git
          --ignore fixtures
          --ignore parsers
          .

  artifacts:  
    reports:  
    paths:  
    dependency_scanning:  "bom.json"
  ```

The results of the scan can be managed in the **Security** tab in the project interface.

## Using an agent with the GitFlic docker runner type

To use the console agent with the GitFlic docker runner type, you must first perform the following steps on the machine with the agent:

1. Download the file with the command

    ```bash
    wget -O /usr/local/bin/johnny https://REGISTRY_USERNAME:REGISTRY_PASSWORD@REGISTRY_URL/repository/files/codescoring/johnny-depp/JOHNNY_VERSION/johnny-linux-amd64-JOHNNY_VERSION
    ```
    or
    ```bash
    curl -o /usr/local/bin/johnny https://REGISTRY_USERNAME:REGISTRY_PASSWORD@REGISTRY_URL/repository/files/codescoring/johnny-depp/JOHNNY_VERSION/johnny-linux-amd64-JOHNNY_VERSION
    ```

    `JOHNNY_VERSION` should be replaced with the agent version. The list of current versions with descriptions is available in the [Changelog](/changelog/johnny-changelog.en) section. `REGISTRY_URL`, `REGISTRY_USERNAME` and `REGISTRY_PASSWORD` should be replaced with the URL, login and password received from the vendor.

2. Copy the agent to the container that you plan to use it in

    ```bash
    docker cp ./johnny CONTAINER:/usr/bin
    ```

3. Allow file execution

    ```bash
    docker exec CONTAINER chmod +x /usr/bin/johnny
    ```

4. Save changes to the container

    ```bash
    docker commit <container name><repository>:<tag>
    ```

**Important**: if necessary, save the container to a remote repository.

An example of requesting the agent binary file in `gitflic-ci.yaml`: 

```yaml
    stages:
      - test

    sca:
      stage: test 
    image: <repository><tag>  

    script:
        - >
          johnny
          scan dir
          --api_token $JOHNNY_API_TOKEN
          --api_url $JOHNNY_API_URL
          --ignore .git
          --ignore fixtures
          --ignore parsers
          .

  artifacts:  
    reports:  
    paths:  
    dependency_scanning:  "bom.json"
```

You can manage the results of the scan in the **Security** tab of the project interface.

## Connecting to the registry and scanning images

Example of an image scan using the agent в `gitflic-ci.yaml`:

```
image: angelikade/mvn-npm-jdk:codescoring
stage: test-codescoring-image
when: manual
scripts:
  - ls -la
  - |
    /usr/bin/johnny scan image <registry>/<repository>/<imagename>:<tag> \
    --api_token "${CS_TOKEN}" \
    --api_url "${CS_URL}"
```

**Important**: access to the file `/v2/\_catalog` in GitFlic is disabled for security reasons. Currently, it is not possible to recurse through all images in the registry.

## Configuring security policies during scanning

1. Configure [policies](/on-premise/how-to/policies.en) on your CodeScoring installation

2. Run the pipeline using the default scan settings

    ```yaml
        stages:
          - test

        sca:
          stage: test

        script:
            - >
              johnny
              scan dir
              --api_token $JOHNNY_API_TOKEN
              --api_url $JOHNNY_API_URL
              --ignore .git
              --ignore fixtures
              --ignore parsers
              .

      artifacts:  
        reports:  
        paths:  
        dependency_scanning:  "bom.json"
    ```

3. When the policies are triggered, the agent will exit with an error code and the GitFlic runner will automatically stop the pipeline.

**Important**: GitFlic currently does not have a mechanism for receiving artifacts when a task completes with an error. Due to this, viewing a report on the artifact that caused the pipeline to stop is not possible in the GitFlic web interface.
