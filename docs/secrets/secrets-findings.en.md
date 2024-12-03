---
hide:
  - footer
---
# Working with findings

## Viewing secrets in a separate project

To view data on secrets in the context of a project, go to the `Projects -> Project -> Secrets` page.

The page displays the following summary information:

- Date of first scan;
- Date of last scan;
- Number of found secrets by category (true positive, false positive, all);

The table with found secrets has the following fields:

- **Secret** – secret content;
- **Project name** – name of the project in which the secret was found;
- **Filename** – name of the file in which the secret was found;
- **Probability TP** – probability of a true find;
- **Analysis finished at** – date and time of scan completion;
- **Is actual** – whether the secret was found during the last scan;
- **Rule ID** – secret search rule identifier within the used configuration engine;
- **Appeared at** – date and time the secret was added to the code;
- **Author email** – email of the author responsible for adding the secret;
- **Author fullname** – name of the author responsible for adding the secret;
- **Fixed by** – name of the user who marked the secret as fixed;
- **Fixed at** – date of fix;
- **Commit** – hash of the commit in which the secret was added.

![Findings in a project](/assets/img/secrets/findings-project.png)

## Viewing secrets

To study the found secrets for all projects, go to the `Secrets` section in the system menu.

![Findings in all projects](/assets/img/secrets/findings-all.png)

The table with secrets can be filtered by the following criteria:

- **Project** – name of the project where the secret was found;
- **Filename** – name of the file where the secret was found;
- **Proprietor** – division of the organization to which the project with the found secret belongs;
- **Category** – category of the project with the found secret;
- **Rule ID** – identifier of the secret search rule within the used configuration engine;
- **Actual** – secret found during the last scan;
- **Fixed** – secret fixed;
- **Orphan** – secret has no project.

## Markup of true and false positives.

Each secret can be marked as true positive, false positive or fixed. To do this, use the **TP**, **FP** and **Fixed** buttons in the table of found secrets.

Manual markup will be used for [additional training of the machine learning model](/secrets/secrets-model).

![Markup of secrets](/assets/img/secrets/secrets-markup.png)

## Unloading data on secrets

To get an export of data on found secrets, you can use the **Export** button in the upper right corner of the section.
