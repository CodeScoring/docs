---
hide:
  - footer
---

# Launching in Docker

To run the agent via Docker, you currently need active [authorization in the registry with system images](/on-premise/installation.en).

Example request on the current directory:

```bash
docker run --rm\
 -v $(pwd):/code\
 -a stdout\
 <registry-address>/johnny-depp:<version> \
 scan dir. \
 --api_token <api_token> \
 --api_url <api_url> \
 --ignore .tmp --ignore fixtures --ignore .git
```

The `-a stdout` parameter is required to correctly display the **Vulnerabilties** and **Policy Alerts** tables when running the agent via Docker.
