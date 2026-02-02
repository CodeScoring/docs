---
hide:
  - footer
---

# Потоки данных

Для эффективного поиска угроз в open source компонентах CodeScoring интегрирует данные из более **20** источников знаний (фидов). Записи из всех источников дедуплицируются и объединяются под универсальными идентификаторами в системе.

Источники знаний об угрозах дополняют единую базу данных **CodeScoring Index** с информацией об опубликованных компонентах, включая собственный [фид protestware](/feeds/protestware).

Данный раздел содержит детальное описание отдельных фидов и процесса работы с ними.

Ниже приведена таблица с источниками данных и частотой их обновления.

| Источник | Ссылка | Частота обновления |
|----------|--------|------------------|
| CodeScoring Protestware Feed | - | раз в сутки |
| Банк данных угроз безопасности информации ФСТЭК России | [https://bdu.fstec.ru/](https://bdu.fstec.ru/) | каждые 30 минут |
| Kaspersky Open Source Software Data Feed | [https://www.kaspersky.ru/open-source-feed](https://www.kaspersky.ru/open-source-feed) | каждые 30 минут |
| Astra Linux Security Advisories | [https://astra.ru](https://astra.ru) | каждые 4 часа |
| ALT Linux Security Tracker CVE | [https://packages.altlinux.org](https://packages.altlinux.org) | каждые 4 часа |
| Red OS Security Advisories  | [https://redos.red-soft.ru](https://redos.red-soft.ru) | раз в сутки |
| CVE.org (MITRE CVE Program) | [https://www.cve.org](https://www.cve.org) | раз в сутки |
| National Vulnerability Database (NVD, NIST) | [https://nvd.nist.gov/](https://nvd.nist.gov/) | раз в час |
| Open Source Vulnerabilities (OSV) | [https://osv.dev](https://osv.dev) | каждые 20 минут |
| GitHub Advisory Database | [https://github.com/advisories](https://github.com/advisories) | каждые 10 минут |
| GitHub Security Repositories (Более 2000 репозиториев) | [https://github.com](https://github.com) | раз в час |
| OpenSSF Malware Database (OSSF Malicious Packages) | [https://openssf.org](https://openssf.org) | раз в час |
| Go Vulnerability Database (Golang) | [https://vuln.go.dev](https://vuln.go.dev) | каждые 30 минут |
| GitLab Security Advisory Database | [https://advisories.gitlab.com](https://advisories.gitlab.com) | раз в сутки |
| Packagist PHP Package Security Advisories | [https://packagist.org](https://packagist.org) | каждые 30 минут |
| PyPI Security Advisories (PySec) | [https://pypi.org](https://pypi.org) | каждые 30 минут |
| Ubuntu Security Notices | [https://ubuntu.com/security/notices](https://ubuntu.com/security/notices) | каждые 30 минут |
| Alpine Linux Security Advisories | [https://alpinelinux.org](https://alpinelinux.org) | каждые 30 минут |
| Debian Security Tracker | [https://security-tracker.debian.org](https://security-tracker.debian.org) | каждые 30 минут |
| Red Hat Security Advisory | [https://access.redhat.com](https://access.redhat.com) | каждые 30 минут |
