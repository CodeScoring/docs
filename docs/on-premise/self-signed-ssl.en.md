---
hide:
  - footer
---
# Using self-signed SSL certificates

When working with external systems, CodeScoring checks the validity of SSL certificates of remote hosts and by default will not connect projects from systems whose certificates have not been validated or are signed by a certification authority unknown to the system.

To connect an external system whose domain SSL certificate is self-signed, you need to add the root certificate to trusted at the installation level. To do this, before starting the system, it must be placed in the `ssl` directory in the system installation files. It is advisable to give the file a meaningful name, for example, `codescoring-root-CA.crt`.

**Important**: the file extension must be `crt`.

To view the entire chain of certificates used for a domain and highlight the root one, you can use the command:

```bash
openssl s_client -showcerts -partial_chain -connect DOMAIN.NAME:443
```
