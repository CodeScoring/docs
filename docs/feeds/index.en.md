---
hide:
- footer
---

# Data Feeds

To effectively search for threats in open source components, CodeScoring integrates data from more than **20** knowledge sources (feeds). Records from all sources are deduplicated and combined under universal identifiers in the system.

Threat knowledge sources complement the unified **CodeScoring Index** database with information about published components, including its own [protestware feed](/feeds/protestware.en).

This section contains a detailed description of individual feeds and the process of working with them.

Currently, CodeScoring uses data from 20 feeds. Below is a table with the data sources and their update frequency.

| Source | Link | Update Frequency |
|--------|------|-----------------|
| Red Hat Security Advisories | [https://access.redhat.com](https://access.redhat.com) | every 30 minutes |
| Open Source Vulnerabilities (OSV) | [https://api.osv.dev/v1/](https://api.osv.dev/v1/) | every 20 minutes |
| Go Vulnerability Database (Golang) | [https://vuln.go.dev](https://vuln.go.dev) | every 30 minutes |
| GitLab Security Advisory Database | [https://advisories.gitlab.com](https://advisories.gitlab.com) | once a day |
| Debian Security Tracker | [https://security-tracker.debian.org](https://security-tracker.debian.org) | every 30 minutes |
| CodeScoring Protestware Feed | - | once a day |
| Astra Linux Security Advisories | [https://astra.ru](https://astra.ru) | every 4 hours |
| CVE.org (MITRE CVE Program) | [https://www.cve.org](https://www.cve.org) | once a day |
| ALT Linux Security Tracker CVE | [https://rdb.altlinux.org/api](https://rdb.altlinux.org/api) | every 4 hours |
| GitHub Security Repositories | [https://github.com](https://github.com) | every hour |
| Ubuntu Security Notices | [https://ubuntu.com](https://ubuntu.com) | every 30 minutes |
| PyPI Security Advisories (PySec) | [https://pypi.org](https://pypi.org) | every 30 minutes |
| Packagist PHP Package Security Advisories | [https://packagist.org](https://packagist.org) | every 30 minutes |
| FSTEC of Russia (Federal Service for Technical and Export Control) Security Advisories | [https://bdu.fstec.ru/](https://bdu.fstec.ru/) | every 30 minutes |
| OpenSSF Malware Database (OSSF Malicious Packages) | [https://openssf.org](https://openssf.org) | every hour |
| GitHub Advisory Database | [https://github.com/advisories](https://github.com/advisories) | every 10 minutes |
| Kaspersky Lab Security Feed | Proprietary feed | every 30 minutes |
| Alpine Linux Security Advisories | [https://alpinelinux.org](https://alpinelinux.org) | every 30 minutes |
| National Vulnerability Database (NVD, NIST) | [https://nvd.nist.gov/](https://nvd.nist.gov/) | every hour |
| Red OS Security Advisories | [https://redos.red-soft.ru](https://redos.red-soft.ru) | once a day |

