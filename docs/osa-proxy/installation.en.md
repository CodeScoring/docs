---
hide:
  - footer
---

# Deployment

Following the configuration of the `application.yml` file, the application can be deployed and executed either within a Docker container environment or orchestrated via a Helm chart for Kubernetes (k8s) deployments.

## Docker container deployment

To instantiate the application as a Docker container, execute the following command:

``` bash
docker run -d \
-p 8080:8080 \
-e SPRING_CONFIG_ADDITIONAL_LOCATION=file:/app/config/ \
-v /path/to/your/config/application.yml:/app/config/application.yml \
--name cs-proxy \
<registry-address>/cs-proxy:<tag>
```

## Kubernetes deployment (Helm Chart)

For Kubernetes environments, the application can be deployed using the provided Helm chart, accessible at `https://{REGISTRY_URL}/repository/helm/`.

**Installation order:**

1. Create a namespace.

     ```
     kubectl create namespace codescoring
     ```

2. Create a secret to access the private Docker registry, using the address (`REGISTRY_URL`), login (`USERNAME`) and password (`PASSWORD`) received from the vendor.

     ```
     kubectl create secret docker-registry codescoring-regcred --docker-server=REGISTRY_URL --docker-username=USERNAME --docker-password=PASSWORD -n cs-proxy
     ```

3. Install [Helm](https://helm.sh/docs/intro/install/) using your preferred method.

4. Run the following commands to add the current Helm repository to the local machine:

     ```
     helm repo add codescoring-org https://{REGISTRY_URL}/repository/helm/ --username USERNAME --password PASSWORD
     helm repo update
     ```

5. Create a `values.yaml` file with the following content:

    ```
    config: |
      # This field must be populated with the content of the application.yml file

    # There's an option to create an Ingress resource
    ingress:
      enabled: true
      className: ""
      annotations: {}
      hosts:
        - host: cs-proxy.example.com
          paths:
            - path: /
              pathType: Prefix
              backend:
                service:
                  name: cs-proxy
                  port:
                    number: 8080
      tls:
        - secretName: cs-proxy-tls
          hosts:
            - cs-proxy.example.com
    ```

6. Run the command to install the chart
    ```
    helm install cs-proxy codescoring-org/cs-proxy -n cs-proxy -f values.yaml --create-namespace --atomic --version CHART_VERSION
    ```

