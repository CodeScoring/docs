---
hide:
- footer
---
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

## Calculating the number of authors

The author count feature is available in the platform starting with version **2025.37.0**. It allows you to get statistics on unique commit authors in connected repositories.

You can perform the calculation in the `Settings → Activation Key` section by clicking the **Calculate** button.

### Configuring parameters

After clicking the button, a form with analysis parameters opens:

- **Provider** — repository data source. Currently, GitLab is supported;
- **VCS URL** — host address where the repositories are hosted (without specifying a specific repository).
	Example:
	```
	https://gitlab.svc.cdscrng.ru/
	```
- Access key — personal token with `read_api` rights. The token is not saved and is used only for the current calculation.
	In GitLab, you can get a token at:
	```
	<VCS-URL>/-/user_settings/personal_access_tokens
	```
- **Author email filter** — a list of domains or regular expressions for filtering authors. Multiple values can be specified, separated by `|`.

!!! warning "Important"

		The VCS URL must start with https://. The closing slash is optional.

### Performing analysis

After filling out the form, click **Calculate**. While the scan is in progress, you can cancel the process by clicking **Cancel**.

### Calculation Results

After the analysis is complete, the following data is displayed in the Activation Keys section:

- **Status** — shows the result of the analysis. If an error occurs, the cause can be found in the **Audit log** section;
- **Date** — the date and time the analysis was performed;
- **Unique authors per year** – the number of commit authors over the last 365 days. This parameter can be changed via the API;
- **Repos processed with success** – the number of repositories processed without errors;
- **Repos processed with error** – the number of repositories with read errors. Details can be found in the backend logs;
- **JSON format report URL** – a link to the full report in JSON format with analysis details and a list of processed repositories.

### Troubleshooting

If the analysis failed:

1. Check the **VCS URL** and the correctness of the **token**. A **401** error typically indicates an invalid URL or an invalid token.
3. Additional information can be found in the **Audit log** section.
