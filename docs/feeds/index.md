---
hide:
  - footer
---

# Потоки данных

Для эффективного поиска угроз в open source компонентах CodeScoring интегрирует данные из более **20** источников знаний (фидов). Записи из всех источников дедуплицируются и объединяются под универсальными идентификаторами в системе.

Источники знаний об угрозах дополняют единую базу данных **CodeScoring Index** с информацией об опубликованных компонентах, включая собственный [фид protestware](/feeds/protestware).

Данный раздел содержит детальное описание отдельных фидов и процесса работы с ними.

На данный момент CodeScoring использует данные из 20 фидов. Ниже приведена таблица с источниками данных и частотой их обновления

| Источник | Ссылка | Частота обновления |
|----------|--------|------------------|
| Red Hat Security Advisory | [https://access.redhat.com](https://access.redhat.com) | каждые 30 минут |
| Open Source Vulnerabilities (OSV) | [https://api.osv.dev/v1/](https://api.osv.dev/v1/) | каждые 20 минут |
| Go Vulnerability Database (Golang) | [https://vuln.go.dev](https://vuln.go.dev) | каждые 30 минут |
| GitLab Security Advisory Database | [https://advisories.gitlab.com](https://advisories.gitlab.com) | раз в сутки |
| Debian Security Tracker | [https://security-tracker.debian.org](https://security-tracker.debian.org) | каждые 30 минут |
| CCodeScoring Protestware Feed | - | раз в сутки |
| Astra Linux Security Advisories | [https://astra.ru](https://astra.ru) | каждые 4 часа |
| CVE.org (MITRE CVE Program) | [https://www.cve.org](https://www.cve.org) | раз в сутки |
| ALT Linux Security Tracker CVE | [https://rdb.altlinux.org/api](https://rdb.altlinux.org/api) | каждые 4 часа |
| GitHub Security Repositories | [https://github.com](https://github.com) | раз в час |
| Ubuntu Security Notices | [https://ubuntu.com](https://ubuntu.com) | каждые 30 минут |
| PyPI Security Advisories (PySec) | [https://pypi.org](https://pypi.org) | каждые 30 минут |
| Packagist PHP Package Security Advisories | [https://packagist.org](https://packagist.org) | каждые 30 минут |
| FSTEC of Russia (ФСТЭК России — Федеральная служба по техническому и экспортному контролю) | [https://bdu.fstec.ru/](https://bdu.fstec.ru/) | каждые 30 минут |
| OpenSSF Malware Database (OSSF Malicious Packages) | [https://openssf.org](https://openssf.org) | раз в час |
| GitHub Advisory Database | [https://github.com/advisories](https://github.com/advisories) | каждые 10 минут |
| Kaspersky (Лаборатория Касперского) | Проприетарный фид | каждые 30 минут |
| Alpine Linux Security Advisories | [https://alpinelinux.org](https://alpinelinux.org) | каждые 30 минут |
| National Vulnerability Database (NVD, NIST) | [https://nvd.nist.gov/](https://nvd.nist.gov/) | раз в час |
| Red OS Security Advisories  | [https://redos.red-soft.ru](https://redos.red-soft.ru) | раз в сутки |
