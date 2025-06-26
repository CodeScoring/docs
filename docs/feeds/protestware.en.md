---
hide:
- footer
---

# Working with protestware feed

Since April 2022, the CodeScoring team has been tracking cases of protestware inclusion in open source software components. In addition to open data, additional mechanisms for identifying such packages were first introduced in CodeScoring version **2022.49.0**.

Starting with version [2025.21.0](/changelog/on-premise-changelog.en/#2025210-2025-05-21), the platform supports its own centralized feed at the **CodeScoring Index** knowledge base level for detecting protestware. This feed is regularly updated and allows for automatic detection of such components within the [CodeScoring.OSA](/osa/index.en) and [CodeScoring.SCA](/sca/index.en) modules.

## What is protestware?

**Protestware** are components that contain compromising illegal constructs presented in the source code or accompanying data. Such software can change its behavior or be a prerequisite for the emergence of undeclared capabilities.

The Open Source Initiative [considers](https://opensource.org/blog/open-source-protestware-harms-open-source) protestware as a threat to the neutrality and reproducibility of open source software.

## Policy settings

CodeScoring has a built-in security policy to check for protestware in third-party components.

To activate it, go to the form in the `Settings -> Policies` section and specify the condition **Dependency is protestware**

![Protestware policy](/assets/img/feeds/protestware-policy-en.png)

If necessary, you can set the **Blocker** flag to make the policy blocking – when this condition is triggered, the software build and component download from the proxy repository will be interrupted.

**Important:** it is recommended to use the blocking flag only after a preliminary impact assessment (inventory analysis), as this may affect the development process.

## Analysis results

Protestware-related threats are marked with the **CSPW** identifier in the `Vulnerabilities` section. By going to the page of a separate entry, you can see detailed information about the component, the context of the threat, and the affected part of the code base.

If the corresponding security policy is configured, triggers on it are recorded in the `Alerts` section. The **Matched criteria** field displays the specific reason for the trigger, for example:

```
es5-ext@0.10.64 is protestware
```