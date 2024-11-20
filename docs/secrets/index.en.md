---
hide:
- footer
---
# CodeScoring Secrets

## General description

**CodeScoring Secrets** is a module that searches for sensitive information in code (passwords, API keys, tokens).

Secrets are searched using open analysis tools, currently the [gitleaks](https://github.com/gitleaks/gitleaks) engine is used.

At the same time, CodeScoring uses its own machine learning model, which allows to significantly reduce the number of false positives during scanning.