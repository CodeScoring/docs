---
hide:
  - footer
---
# Activation of the system

## Entering the activation key

For the operation of the system, it is necessary to activate it using the key, which is transmitted to the client along with the installation instructions in a separate `txt` file.

To enter the key, go to the `Settings -> Activation key`, copy the text from the file to the field without any changes and press the **Save** button. In case of success, the page will appear on the page on the key and the **Status** field will be active.

## Key parameters

After successful activation of the system in the `Settings -> Activation key` section the parameters of the used key are displayed:

- **Status** - system activation status;
- **Owner** - name of the issued key;
- **Issued** - the day of release of the key;
- **Expiration** The day of the expiration of the key;
- **Authors limit** - the maximum number of authors (developers) for which the system is licensed;
- **Private feeds** - a list of connected private datebases of vulnerabilities, for example **Kaspersky OSS Threats Data Feed**;
- **Available modules** - a list of available modules (OSA, SCA, Secrets, TQI);

## Key expiration

When the activation key expires, the platform continues to work with restrictions:

- updates of the system and its components remain accessible;
- previously performed scanning and their results are available for viewing;
- an attempt to perform a new scan leads to an error associated with the expiration of the activation key.