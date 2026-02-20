- [Русский](https://docs.codescoring.ru/tqi/authors/index.md)

# Building author profiles

CodeScoring.TQI allows to study the individual contribution of authors to projects using interactive profiles and activity visualization. Information about authors is available in several formats, allowing to evaluate their work in the most complete way.

## List of authors

The `TQI -> Authors` section contains all the authors involved in changing the organization's code base.

- **Author** - author's name and email, multiple selections are allowed;
- **Start date** - date of the author's first commit;
- **Last seen** - date of the author's last commit in the project;
- **Activity, mos** - number of months during which the author actively committed changes;
- **Project** – total number of projects that author has contributed to;
- **Total commits** - total number of commits made by the author in the project. Details are available on value hover;
- **Complexity** - the average cyclomatic complexity of the author's commits in the project;
- **Clones** – the number of code fragments borrowed by the author;
- **OSS count** – total number of Open Source projects in which the author participated;
- **Proprietor** – part of the organization to which the author belongs;
- **Technologies** – programming languages the author works with (determined by his commits).

## Activity map

The authors' work is visualized as an activity map, which can be seen on the **Activity Map** tab.

The map can be filtered by the following parameters:

- **Commit Date** – the period during which the commit was made in the version control system;
- **Authors Number** – the total number of authors displayed on the map;
- **Proprietor** – part of the organization that manages the project;
- **Project Category** – category assigned within the CodeScoring system;
- **Project** – name of the project;
- **Technologies** – programming languages used in the project;
- **Authors** - author's name and email, multiple selections are allowed.

The technology (language) filter is applied to commits. If a commit contains changes in the specified language, it is included in the selection.

Suppose the following commits are present:

| Author   | Language 1 | Share | Language 2 | Share |
| -------- | ---------- | ----- | ---------- | ----- |
| Author 1 | Python     | 100%  | JS         | 1%    |
| Author 1 | Python     | 50%   | Java       | 50%   |
| Author 2 | Java       | 100%  | —          | —     |
| Author 2 | JS         | 100%  | —          | —     |
| Author 2 | JS         | 99%   | Python     | 1%    |

If you set the filter to **Python**, then commits **1, 2, and 5** will be included in the sample, since they contain changes in this language.

After filtering, commits are grouped by month and aggregated. As a result, there may be situations when the main language of the month is JS, and Python takes up only **1%**, but it still gets into the sample.

The map can also be saved as a PNG image.

## Author page

The author's individual page contains key metrics of his work:

- **Activity period** – dates of first commit and the last change by the authors;
- **Activity, months** – number of months during which the author actively committed changes relative to their total time on the projects;
- **Projects count** – number of proprietary projects to which the author contributed changes;
- **OSS count** – number of open source projects to which the author contributed changes;
- **Complexity** – the average cyclomatic complexity of the author's commits in the projects;
- **Duplicates** – the number of code fragments borrowed by the author;
- **Contribution, LOC** – the total number of lines of code written by the author;
- **Contribution, lines added** - the total number of lines added by the author;
- **Contribution, lines modified** - the total number of lines modified by the author;
- **Contribution, lines removed** - the total number of lines removed by the author;
- **Contribution, total commits** – the total number of commits (commits + merge commits) made by the author in the projects;
- **Contribution, commits** – the total number of commits made by the author in the projects;
- **Contribution, merge commits** – the total number of merge commits made by the author in the projects;
- **Novelty** - added lines share relative to total number of lines written by author;
- **Refactoring** - modified and removed lines share relative to total number of lines written by author;

In addition, the page shows lists of the organization's projects and the Open Source projects in which the author participated.

The **Similar authors** tab contains a list of developers with the most similar competencies to the author. The percentage of similarity between authors is calculated based on the set of technologies used, participation in projects, and complexity of the code written.

## Rules for merging authors' profiles

Author profiles can be merged by email in the event of duplicates or multiple accounts of the same developer.

In the `Settings -> Authors` section, automatic merging of authors is available by clicking the **Create rules automatically** button, as well as setting rules manually using **Add new rule** button.

After merging, the author's profile will contain all addresses associated with his main email, and his activity will be tracked by all commits with the specified addresses.

Warning

The user, regardless of the access level, can view the "Authors merge rules" if the email specified in his profile is present in the rule.
