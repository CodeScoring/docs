- [Русский](https://docs.codescoring.ru/on-premise/how-to/activation/index.md)

# System activation

## Entering the activation key

To operate the system, it must be activated using a key that is transferred to the client in a separate `txt` file.

To enter the key, go to the `Settings -> Activation key` section, copy the text from the file into the field without any changes and click the **Save** button. If successful, information on the key will appear on the page and the Status field will change to **Active**.

## Key parameters

If the system is successfully activated, the `Settings -> Activation key` section displays the parameters of the key used:

- **Status** – system activation status;
- **Owner** – name of the organization in whose name the key was issued;
- **Issued** – day the key was issued;
- **Expiration** – day the key expires;
- **Authors limit** – the maximum number of authors (developers) for which the system is licensed;
- **Private feeds** – a list of connected private vulnerability databases, such as **Kaspersky OSS Threats Data Feed**;
- **Available modules** – a list of connected modules with the key expiration date for each.

## Activation key expiration

When the activation key expires, the platform continues to operate with limitations:

- Previously performed scans and their results remain available for viewing;
- An attempt to perform a new scan results in an error related to the activation key expiration.
