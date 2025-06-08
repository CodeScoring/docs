---
hide:
- footer
---

# Using Kaspersky Open Source Software Threats Data Feed

CodeScoring integrates the [Kaspersky Open Source Software Threats Data Feed](https://www.kaspersky.com/open-source-feed) (Kaspersky OSSTDF) feed into the CodeScoring SCA and CodeScoring OSA modules, providing access to information about vulnerabilities found in detected open source components. The feed is useful not only as a source of data on new vulnerabilities, but also as a tool for enriching already known records from other sources.

The feed is integrated natively at the CodeScoring Index knowledge base level, which ensures deduplication of detected vulnerabilities and a single data presentation for the user.

## Connection check

The CodeScoring activation key contains data on the availability of private feeds.

If Kaspersky OSSTDF is successfully connected, the "Private feeds" field in the `Settings -> Activation Key` section has the value “Kaspersky open source software threats data feed”.

![Kaspersky activation](/assets/img/kaspersky-activation-en.png)

## Analysis results

CodeScoring integrates the feed not only in terms of data, but also contextual extensions of functionality. In particular, with the connection of the feed, the "Impacts" field appears in the list of vulnerabilities and on their pages, for which a separate security policy can be configured. The value of the field indicates the impact on the system that the vulnerability has.

For example, the abbreviation **RLF** means "Read Local Files" - such a vulnerability allows access to read files on the user's device. This information helps to understand the context of the vulnerability and determine the direction of a potential attack.

A complete list of possible values of the variable:

- Arbitrary Code Execution (ACE);
- Code Injection (CI);
- Denial of Service (DoS);
- Hacktool;
- Loss of Integrity (LoI);
- Malware;
- Overwrite Arbitrary Files (OAF);
- Obtain Sensitive Information (OSI);
- Privilege Escalation (PE);
- Read Local Files (RLF);
- Security Bypass (SB);
- Spoof User Interface (SUI);
- Write Local Files (WLF);
- Cross Site Scripting (XSS/CSS);
- Other.

## Vulnerability details

Additional information appears on the vulnerability page obtained from the Kaspersky OSSTDF feed. The table with the main data contains the Kaspersky field, which can be used to determine the vulnerability ID, and the "Impacts (Kaspersky)" field.

![Kaspersky vulnerability page](/assets/img/kaspersky-vulnerability-en.png)

## Setting up policies

The data from the feed can be used to create security policies for both analyzing the current code base and checking downloaded components.

The "Impacts" field allows to precisely specify the types of vulnerabilities that require attention. For example, to set up a policy that blocks the use of components with malicious code, one needs to create the condition `Vulnerability mpacts (Kaspersky) -> exactly match -> Malware` and specify the `proxy` value as the development stage to which the policy will apply.

![Kaspersky policy](/assets/img/kaspersky-policy-en.png)

