---
hide:
  - footer
---
# Installation in Kubernetes

## Installation using Helm chart with default parameters {#helm-installation-default}

**Important!**: This installation option does not provide an ability to scale CodeScoring horizontally. To install CodeScoring with horizontal scaling support, please refer to the relevant documentation section below.

**Important!**: You must have a configured default `StorageClass` in the cluster. By default, volumes are created **with a capacity of 20 GiB**

**Installation order:**

1. Create a namespace.

     ```
     kubectl create namespace codescoring
     ```

2. Create a secret to access the private registry of Docker images of the "CodeScoring" system, using the address (`REGISTRY_URL`), login (`USERNAME`) and password (`PASSWORD`) received from the vendor.

     ```
     kubectl create secret docker-registry codescoring-regcred --docker-server=REGISTRY_URL --docker-username=USERNAME --docker-password=PASSWORD -n codescoring
     ```

3. Install [Helm](https://helm.sh/docs/intro/install/) using your preferred method.

4. Run the following commands to add the current Helm repository to the local machine:

     ```
     helm repo add codescoring-org https://registry-one.codescoring.ru/repository/helm/ --username USERNAME --password PASSWORD
     helm repo update
     ```

5. Create a `values.yaml` file with the following content:

     **Important!**: Please replace the values in the sensitive data fields with your own. These fields include `secretKey`, `defaultSuperuserUsername`, `defaultSuperuserPassword`, `defaultSuperuserEmail`, and all fields containing `username` or `password`. It is also important to note that all such variables are mandatory.

     ```
     codescoring:
      config:
        ## codescoring-backend configuration parameters
        siteScheme: https # site scheme http or https
        siteHost: "codescoring.k8s.local" # domain where CodeScoring will be available
        djangoCSRFTrustedOptions: "https://codescoring.k8s.local" # Domain where CodeScoring will be available, including schema
        secretKey: "" # secret key for the application backend, random string of characters
        defaultSuperuserUsername: "admin" # administrator name on the system
        defaultSuperuserPassword: "changeme" # system administrator password
        defaultSuperuserEmail: "mail@example.com" # e-mail of the administrator in the system
        databaseHost: ipcs-pgcat
        databasePort: 5432
        postgresqlDatabase: "codescoring"
        postgresqlUsername: "codescoring"
        postgresqlPassword: "changeme" # password must match the password for pgcat.postgresql.password

     pgcat:
      adminPassword: "changeme"

     postgresql:
      host: "codescoring-postgresql"
      port: 5432
      username: "codescoring"
      password: "changeme" # password must match the password in codescoring.postgresqlPassword
      database: "codescoring"


     frontend:
      ingress:
        enabled: true
        className: "nginx"
        hosts:
        - host: codescoring.k8s.local # domain where CodeScoring will be available
        paths:
        - path: /
        pathType: ImplementationSpecific
     ```

6. Run the command to install the chart
 ```
 helm install codescoring codescoring-org/codescoring -n codescoring -f values.yaml --create-namespace --atomic --version CHART_VERSION
 ```

## Changing the admin password {#changing-admin-password}

To change the admin password without manually editing the `values.yaml` file, you can use the following command:

  ```bash
  kubectl exec -it your-backend-pod -- python manage.py changepassword <user_name>
  ```

## Advanced settings for Helm chart parameters {#extended-helm-parameters}

**Important**: It is highly recommended that you make the necessary changes **before installing CodeScoring**, otherwise a complete system reinstall may be required. These instructions assume that the **specialist has experience working with a Kubernetes cluster and the Helm utility**.

To easily edit CodeScoring parameters, you can download and unpack the Helm chart source code with the command:

```
helm pull codescoring-org/codescoring --version CHART_VERSION --untar --untardir codescoring-src && cd codescoring-src
```

In the `values.yaml` file you can edit the necessary variables, and after that run the installation command in the directory with the Helm chart source code:
```
helm install codescoring . -f values.yaml -n codescoring --atomic --version CHART_VERSION
```


### Connecting to external PostgreSQL and Redis {#external-databases}
By default, PostgreSQL and Redis run in separate `StatefulSets`. This option may not be suitable for usage in a **production environment**, because it is not fault tolerant.


#### Connecting to external Redis {#external-redis}
To connect to external Redis, you must do the following:

1. Disable Redis deployment by specifying the variable - `redis.enabled: false`
2. In the `codescoring.config.djangoCachesRedisUrls` and `codescoring.config.hueyRedisUrl` variables, specify the connection strings for external Redis.

##### Connecting to external Redis via TLS {#external-redis-tls}
To connect to external Redis, in addition to abovementioned you must do the following:

1. Set the `codescoring.trustedCA.enabled` variable to `true`
2. Add the Redis-server root certificate to `codescoring.trustedCA.certificates`
3. In the `codescoring.config.djangoCachesRedisUrls` and `codescoring.config.hueyRedisUrl` variables, specify the connection strings for external Redis using the following format: `rediss://redis.example.com:6379/0`, where 0 is the Redis database number.  

#### Connecting to PostgreSQL via PgCat pooler {#external-postgres}

**Important!**: Connecting to external PostgreSQL must be done using a connection pooler.

This option is suitable if PostgreSQL is already deployed in the existing infrastructure, but the connection pool is not used. Helm-chart will deploy the [PgCat](https://github.com/postgresml/pgcat) puller and connect it to the existing PostgreSQL. You need to do the following:

1. Disable PostgreSQL deployment by specifying the variable - `postgresql.enabled: false`

2. Connect the PgCat pooler to external PostgreSQL, replacing the appropriate parameters with the required ones:
```
codescoring:
  config:
    postgresqlDatabase: "codescoring"
    postgresqlUsername: "codescoring"
    postgresqlPassword: "changeme"
  pgcat:
    postgresql:
      host: "postgresql.example.host"
      port: 5432
      username: "codescoring"
      password: "changeme"
      database: "codescoring"
```

#### Connecting to an external PostgreSQL pooler {#external-postgres-pooler}
This option is suitable if PostgreSQL and a connection pooler (for example, PgBouncer) are already deployed in the existing infrastructure.
In this case, deployment of the PgCat pooler is not required. You need to do the following:

1. Disable PostgreSQL deployment by specifying the variable - `postgresql.enabled: false`
2. Disable PgCat deployment by specifying the variable - `codescoring.pgcat.enabled: false`
3. Connect codescoring directly to an external pooler, in the `codescoring.config` section the parameters are:

```
posgtresqlHost: ipcs-pgcat
posgtresqlPort: 5432
postgresqlDatabase: "codescoring"
postgresqlUsername: "codescoring"
postgresqlPassword: "changeme"
```

### Setting up volumes (PV) {#volumes}

By default, the chart creates the required volumes via [Dynamic Volume Provisioning](https://kubernetes.io/docs/concepts/storage/dynamic-provisioning/) using the default `StorageClass`. If this volume deployment option is not suitable, you can configure volume creation in several ways.

**Important!**: The options described below are **mutually exclusive**. You must select **ONLY ONE** deployment option for each volume. You can select different deployment options for different volumes.

!!! note
 To change the size of created volumes (except for local ones), you need to change the `size` parameter in the corresponding sections.

#### Dynamic Volume Provisioning using the required StorageClass {#dynamic-volume-provisioning}

You can set the required `StorageClass` in the following variables:

- `codescoring.persistentVolumes.analysisRoot.storageClass`
- `codescoring.persistentVolumes.mediaRoot.storageClass`
- `codescoring.persistentVolumes.djangoStatic.storageClass`
- `codescoring.backup.persistentVolume.storageClass`
- `redis.persistentVolume.storageClass` (if using built-in Redis)
- `postgresql.persistentVolume.storageClass` (if using built-in PostgreSQL)

In this case, volumes will be created using the specified `StorageClass`

#### PersistentVolumeClaim for pre-created PersistentVolumes {#persistent-volume}

The name of pre-created volumes can be set in the following variables:

- `codescoring.persistentVolumes.analysisRoot.volumeName`
- `codescoring.persistentVolumes.mediaRoot.volumeName`
- `codescoring.persistentVolumes.djangoStatic.volumeName`
- `codescoring.backup.persistentVolume.volumeName`
- `redis.persistentVolume.volumeName` (if using built-in Redis)
- `postgresql.persistentVolume.volumeName` (if using built-in PostgreSQL)

In this case, only `PersistentVolumeClaim` will be created for the volumes specified in these variables

#### Using pre-created PersistentVolumeClaim {#persistent-volume-claim}

The name of pre-created PVCs can be set in the following variables:

- `codescoring.persistentVolumes.analysisRoot.existingClaim`
- `codescoring.persistentVolumes.mediaRoot.existingClaim`
- `codescoring.persistentVolumes.djangoStatic.existingClaim`
- `codescoring.backup.persistentVolume.existingClaim`
- `redis.persistentVolume.existingClaim` (if using built-in Redis)
- `postgresql.persistentVolume.exsistingClaim` (if using built-in PostgreSQL)

In this case, the specified PVC name will be inserted directly into the `volumes` section for `Pod`.

#### Using local volumes {#local-volumes}

If there is no external data storage in the Kubernetes cluster, it is possible to run CodeScoring using local volumes. In this case, the data will be stored on one of the cluster nodes.

To create local volumes, you must perform the following steps:

1. Assign the value `true` to the following variables:

 - `codescoring.persistentVolumes.analysisRoot.localVolume.enabled`
 - `codescoring.persistentVolumes.mediaRoot.localVolume.enabled`
 - `codescoring.persistentVolumes.djangoStatic.localVolume.enabled`
 - `codescoring.backup.persistentVolume.localVolume.enabled`
 - `redis.persistentVolume.localVolume.enabled` (if using built-in Redis)
 - `postgresql.persistentVolume.localVolume.enabled` (if using built-in PostgreSQL)

2. Set the path to the **directory on the cluster node**, in which the data in the following variables will be placed:

 - `codescoring.persistentVolumes.analysisRoot.localVolume.path`
 - `codescoring.persistentVolumes.mediaRoot.localVolume.path`
 - `codescoring.persistentVolumes.djangoStatic.localVolume.path`
 - `codescoring.backup.persistentVolume.localVolume.path`
 - `redis.persistentVolume.localVolume.path` (if using built-in Redis)
 - `postgresql.persistentVolume.localVolume.path` (if using built-in PostgreSQL)

3. Specify the name of the node on which the local volume will be created in the following variables:

 - `codescoring.persistentVolumes.analysisRoot.localVolume.nodeHostname`
 - `codescoring.persistentVolumes.djangoStatic.localVolume.nodeHostname`
 - `codescoring.backup.persistentVolume.localVolume.nodeHostname`
 - `redis.persistentVolume.localVolume.nodeHostname` (if using built-in Redis)
 - `postgresql.persistentVolume.localVolume.nodeHostname` (if using built-in PostgreSQL)

It is allowed to use different nodes for different volumes.

#### Setting up storage for temporary scan files {#temporary-files-storage}

By default, temporary files during the scanning process are stored in the `/tmp` directory inside containers, to which Ephemeral Volumes of type `emptyDir` are mounted:

- `codescoring.huey.ipcsQueue.ephemeralVolumes`
- `codescoring.huey.tasksOsaContainerImageScan.ephemeralVolumes`
- `codescoring.huey.tasksOsaPackageScan.ephemeralVolumes`

However, in some cases you may need to use Persistent Volume instead of Ephemeral Volume. In this case, you should comment out the appropriate sections in `ephemeralVolumes` for one or more services, depending on which services require volumes to be mounted:

```
codescoring:
  huey:
    ipcsQueue:
      ephemeralVolumes:
        volumeMounts:
        # - mountPath: /tmp
        #   name: ipcs-queue-tmp
        - mountPath: /etc/ssl/certs
          name: ipcs-queue-ssl-certs
        volumes:
        # - name: ipcs-queue-tmp
        #   emptyDir: {}
        - name: ipcs-queue-ssl-certs
          emptyDir: {}

    tasksOsaContainerImageScan:
      ephemeralVolumes:
        volumeMounts:
        # - mountPath: /tmp
        #   name: container-image-scan-tmp
        - mountPath: /etc/ssl/certs
          name: container-image-scan-ssl-certs
        volumes:
        # - name: container-image-scan-tmp
        #   emptyDir: {}
        - name: container-image-scan-ssl-certs
          emptyDir: {}

    tasksOsaPackageScan:
      ephemeralVolumes:
        volumeMounts:
        # - mountPath: /tmp
        #   name: package-scan-tmp
        - mountPath: /etc/ssl/certs
          name: package-scan-ssl-certs
        volumes:
        # - name: package-scan-tmp
        #   emptyDir: {}
        - name: package-scan-ssl-certs
          emptyDir: {}
```

Then you need to set the value `enabled: true` in one or more of the following sections:

- `codescoring.huey.persistentVolumes.hueyTmp`
- `codescoring.huey.persistentVolumes.hueyPackageScanTmp`
- `codescoring.huey.persistentVolumes.hueyContainerImageScanTmp`

As a result, PersistentVolumeClaim will be created for the corresponding services. It is worth noting that the possibilities for configuring these volumes fully correspond to those described in the section [Configuring volumes (PV)](#pv).

When horizontally scaling services, you need to configure volumes in accordance with the instructions in the [Horizontal scaling CodeScoring](#codescoring) section.

### Horizontal scaling CodeScoring {#horizontal scaling}

**Important!**: To horizontally scale the CodeScoring system, the Kubernetes cluster must have the ability to create volumes with the access type **ReadWriteMany (RWX)**

To scale CodeScoring horizontally, you need to create `analysis-root`, `media-root` and `django-static` volumes with an access type of `ReadWriteMany`.

To do this, you need to replace the value of `ReadWriteOnce` with `ReadWriteMany` in the variables:

- `codescoring.persistentVolumes.analysisRoot.accessModes`
- `codescoring.persistentVolumes.mediaRoot.accessModes`
- `codescoring.persistentVolumes.djangoStatic.accessModes`

Then, you need to comment out the variables:
- `codescoring.backend.affinity`
- `codescoring.frontend.affinity`

If this is not done, then all pods will be launched on only one node in the cluster.

## Setting resource limits {#resource-limits}

By default, `requests` and `limits` are not specified. This is done to ensure the ability to run the CodeScoring system in clusters with a small number of resources (for example, minikube) for testing purposes.
When running in a **production environment**, you may need to configure resource limits. This can be done by setting the following variables:

- `postgresql.resources` (when using built-in PostgreSQL)
- `redis.resources` (when using built-in Redis)
- `codescoring.backend.resources`
- `codescoring.frontend.resources`
- `codescoring.huey.highPriorityQueue.resources`
- `codescoring.huey.ipcsQueue.resources`
- `codescoring.huey.tasksOsaContainerImageScan.resources`
- `codescoring.huey.tasksOsaPackageScan.resources`
- `codescoring.huey.tasksPolicy.resources`
- `codescoring.huey.tasksMedia.resources`

It is possible to specify both `resources` and `limits` together or separately, for example:

```
codescoring:
  backend:
    resources:
      limits:
        cpu: 1000m
        memory: 2000Mi
  huey:
    ipcsQueue:
      resources:
        limits:
          cpu: 2000m
          memory: 3000Mi
        requests:
          cpu: 1000m
          memory: 1000Mi
```

Below are approximate `limits` values for a CodeScoring installation with 8-10 projects:
```
codescoring:
  backend:
    resources:
      limits:
        cpu: 250m
        memory: 2500Mi
  huey:
    ipcsQueue:
      scheduler:
        resources:
          limits:
            cpu: 500m
            memory: 500Mi
      resources:
        limits:
          cpu: 2250m
          memory: 4000Mi
    highPriorityQueue:
      resources:
        limits:
          cpu: 2250m
          memory: 4000Mi
    tasksOsaContainerImageScan:
      resources:
        limits:
          cpu: 2250m
          memory: 4000Mi
    tasksOsaPackageScan:
      resources:
        limits:
          cpu: 2250m
          memory: 4000Mi
    tasksOsaPackageScan:
      resources:
        limits:
          cpu: 2250m
          memory: 4000Mi
    tasksPolicy:
      resources:
        limits:
          cpu: 2250m
          memory: 4000Mi
    tasksTqi:
      resources:
        limits:
          cpu: 2250m
          memory: 4000Mi
    tasksMedia:
      resources:
        limits:
          cpu: 1000m
          memory: 1500Mi
  frontend:
    resources:
      limits:
        cpu: 250m
        memory: 500Mi
  redis:
    resources:
      limits:
        cpu: 1000m
        memory: 2000Mi
  postgresql:
    resources:
      limits:
        cpu: 1000m
        memory: 2000Mi
```

## Adding a Certificate Authority (CA) certificate {#ca-certificate}

To access CodeScoring resources with TLS certificates signed by a corporate certification authority (CA), you must:

1. Set the `codescoring.trustedCA.enabled` variable to `true`
2. Add the root certificate of the certification authority (RootCA) in PEM format to the `codescoring.trustedCA.certificates` variable in the `key: value` format,
where key is the name of the certificate file, including the `.crt` extension, value is the certificate in PEM format.


For example:
```
codescoring:
  trustedCA:
    enabled: true
    certificates:
        ## THIS IS AN EXAMPLE ONE! DO NOT USE IN PRODUCTION!
        my-root-ca.crt: |-
          -----BEGIN CERTIFICATE-----
          MIIDTDCCAjSgAwIBAgIBATANBgkqhkiG9w0BAQUFADA3MQswCQYDVQQGEwJERTEP
          MA0GA1UEChMGZWR1UEtJMRcwFQYDVQQDEw5lZHVQS0kgVGVzdCBDQTAeFw0xMDAz
          MzExMjIwMjRaFw0zMDAzMjYxMjIwMjRaMDcxCzAJBgNVBAYTAkRFMQ8wDQYDVQQK
          EwZlZHVQS0kxFzAVBgNVBAMTDmVkdVBLSSBUZXN0IENBMIIBIjANBgkqhkiG9w0B
          AQEFAAOCAQ8AMIIBCgKCAQEAt5IxCk/NQPOLqeA1lGuB3pvqHGQPxRQ1udYGcXQY
          t7EuSMFymUR9m5TsifG1ktktJTtOWyaWFC4ac0vai49wGVeuDYptfZBoHLIUvCwN
          DOofLYHxk04WzfrtSiUTptn1o6QPOw8YR0XH30MEi1zgD8fLMZmVTJ+XwA5Eus6c
          XtTmI4XhNrHUtvWt4UsNgLmp5/djUgRMpNqxIdrpFQzl+XycRJRAaoAwUzHFl14t
          49qwBhGChxQ8AdDMQGA7kv6VR8o0ktCPv3a4GQbs8+z0cX0w5dC+XhJ1xpqW6TOg
          qAY9XBFIDe5j21hjKmNZ39rsODVGUS2wUtNEhSz+3YqxLwIDAQABo2MwYTAdBgNV
          HQ4EFgQUqHe3saMjZZLan8RlFJs+Xuz4yiAwHwYDVR0jBBgwFoAUqHe3saMjZZLa
          n8RlFJs+Xuz4yiAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMCAQYwDQYJ
          KoZIhvcNAQEFBQADggEBAEjQGyHZQis47c2kf+zXJJoDDlRgFzr9xfcnrHFaJvYx
          nuqNE0T+xmujnwGm3VrgddeAQJuW3sD6y0Ox8NgL4z886VFeaDQ0GmFPI6HEVtg6
          mixMhi+YzdkC+PFrEdYUeVNNwVO+bvJb1Rc08BYU4v7VtTkssHjru76E2/ahn/Ct
          kaVTEojEWeRaxsw5/0VLkgyf8SwDaukM2aamqgEzfsw5GTdSAh7ERZKc+zF7Sr5s
          DY8c5lOmyCwuNh9ODuw4cAThICrn7G8bh8ZyxLyj4Znxh0X45SwMZKTmYLfy9ab8
          b/j7FK8uBNRL+pXl9HGBWAFA01uJw4HkYK+Uo+RcAzo=
          -----END CERTIFICATE-----
``` 
If you have multiple root CAs, you need to add them to separate keys, for example:
```
codescoring:
  trustedCA:
    enabled: true
    certificates:
        my-root-ca.crt: |-
          ...
        my-root-ca-2.crt: |-
          ...
```

## Upgrading CodeScoring {#update}

In order to upgrade CodeScoring you need to actualize the helm repository by running

```commandline
helm repo update
```

and then upgrade the installation with the following command, where the CHART_NAME variable must contain the version you're going to upgrade to

```commandline
helm upgrade codescoring codescoring-org/codescoring -n codescoring -f values.yaml --version CHART_VERSION
```
