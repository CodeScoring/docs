- [Русский](https://docs.codescoring.ru/on-premise/how-to/author-audit/index.md)

# Calculating the number of authors

The author audit feature is available in the platform starting with version **2025.37.0**. It allows you to get statistics on unique authors of commits in selected repositories.

You can calculate the number of unique authors in the `Settings → Activation` Key section by clicking the **Calculate** button.

## Supported platforms

Auditing is currently available for the GitLab platform.

## Configuring parameters

After clicking the button, a form with analysis parameters opens:

- **Provider** — repository data source. **GitLab** is currently supported;

- **VCS URL** — host address where the repositories are hosted (without specifying a specific repository). Example:

  ```
  https://gitlab.svc.cdscrng.ru/
  ```

- **Access Key** — a personal token with `read_api` permissions. The token is not saved and is used only for the current calculation. In GitLab, the token can be obtained at:

  ```
  <VCS-URL>/-/user_settings/personal_access_tokens
  ```

- **Author Email Filter** — a list of domains or regular expressions for filtering authors. Multiple values ​​can be specified, separated by `|`.

Important

The VCS URL must begin with the data transfer protocol. The trailing slash is optional.

## Performing analysis

After filling out the form, click **Calculate**. While the scan is in progress, you can cancel the process by clicking **Cancel**.

## Calculation Results

After the analysis is complete, the following data is displayed in the Activation Keys section:

- **Status** — shows the result of the analysis. If an error occurs, the cause can be found in the **Audit log** section;
- **Date** — the date and time the analysis was performed;
- **Unique authors per year** – the number of commit authors over the last 365 days. This parameter can be changed via the API;
- **Repos processed with success** – the number of repositories processed without errors;
- **Repos processed with error** – the number of repositories with read errors. Details can be found in the backend logs;
- **JSON format report URL** – a link to the full report in JSON format with analysis details and a list of processed repositories.

## Troubleshooting

If the analysis failed:

1. Check the **VCS URL** and the correctness of the **token**. A **401** error typically indicates an invalid URL or an invalid token.
1. Additional information can be found in the **Audit log** section.
