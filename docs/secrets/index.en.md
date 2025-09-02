---
hide:
  - footer
---

# CodeScoring.Secrets

## General description

**CodeScoring.Secrets** is a module that searches for sensitive information in code (passwords, API keys, tokens), while using its own machine learning model to significantly reduce the number of false positives during scanning.

Secrets are searched using open analysis tools, currently the [Gitleaks](https://github.com/gitleaks/gitleaks) engine is used.
