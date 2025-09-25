---
hide:
- footer
---

# Standards compliance

The **CodeScoring** platform helps organizations comply with secure development standards and regulatory requirements.
The system covers key secure development practices, including source code quality control, third-party software security control, vulnerability scanning, confidential information (secrets) scanning, and supply chain security incident response.

## GOST R 56939–2024

GOST R 56939–2024 *"Secure Software Development. General Requirements"* regulates the stages, requirements, and methods of secure software development, including architectural practices, code analysis, and dependency handling.

**CodeScoring ensures compliance with 8 of the 25 standard points:**

| Requirement | Implementation Module | Comment |
|------------|------------------|-------------|
| **5.9 Source Code Expertise** | CodeScoring.TQI | Provides automated code quality expertise using metrics (cyclomatic complexity, duplication, change dynamics). Systematic assessment of code quality and maintenance during development is supported. |
| **5.12 Using a Secure Software Build System** <br> **5.13 Ensuring the Security of the Software Build Environment** | CodeScoring.OSA, CodeScoring.SCA | Dependencies used during the build are analyzed, and unsafe components are identified. Software composition is checked before the build is started, which helps reduce the risk of introducing vulnerabilities and errors from the system and build environment in accordance with goals 5.12.1.1 and 5.13.1.1. |
| **5.15 Security of Used Secrets** | CodeScoring.Secrets | Searches for keys, passwords, tokens, and other secrets in source code, commit history, and configuration files. Machine learning methods are used to reduce false positives. |
| **5.16 Compositional Analysis** | CodeScoring.SCA | All dependencies, including transitive ones, are analyzed, identifying their sources, licenses, and known vulnerabilities. A dependency list (PPK, SBoM) is generated and updated, ensuring composition control, vulnerability identification, and the application of corrective measures in the supply chain. |
| **5.17 Supply Chain Malware Injection Scanning** | CodeScoring.OSA, CodeScoring.SCA | Monitors third-party libraries and components used in the project. Implemented:<br>• *5.17.2.4* – Detection and control of pre-built vendor software;<br>• *5.17.2.5* – Dependency analysis for malicious code (excluding anti-virus scanning, which is considered additional protection). |
| **5.23 Vulnerability Information Response** | CodeScoring.OSA, CodeScoring.SCA, CodeScoring.Secrets | Provides regular vulnerability database updates and automatic notification of new risks. Integration with corporate systems (mail, task manager) is supported, enabling timely response within the organization's security policy. |
| **5.24 Vulnerability Scanning During Operation** | CodeScoring.SCA | Performs analysis of source code, container images, and SBoM files during operation. The ability to regularly recheck released builds for recurrent vulnerability scanning has been implemented. |

For more information on the platform's functionality, see the [Functional specifications](/functionality.en) section.