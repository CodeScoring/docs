---
hide:
- footer
---

# Tracking code clones

CodeScoring.TQI allows you to track code fragments that were copied from one project of the organization to another, or duplicated within a single project.

## Cross-project clones

The `TQI -> Code clones -> Cross project` section displays a list of projects between which copying was performed. Clicking on the number of clones will display a table with detailed information about the copying performed, indicating the following fields:

- Excerpts of copied code with a link to the commit in the version control system;
- Direction of copying;
- Commit date;
- Author;
- Number of copied lines;
- Clone occurrence level (low, medium, high);
- Technology.

## Intra-project clones

The `TQI -> Code clones -> Intra project` section displays a list of projects where code fragments were copied, as well as the percentage of duplicates from the total project code and the occurrence level. Clicking on the number of duplicates will display a table with detailed information about the copying performed, indicating the following fields:

- Excerpts of copied code with a link to the commit in the version control system;
- Copy direction;
- Commit date;
- Author;
- Number of copied lines;
- Clone occurrence level (low, medium, high);
- Technology.

## Clones map

The `TQI -> Code clones -> Clones map` section displays a visualization of borrowings between projects. The clones map can be filtered by the following fields:

- **Proprietor** – part of the organization to which the project belongs;
- **Project category** – project category within the CodeScoring system.

![Clones map](/assets/img/tqi/en/clones-map.png)

Clicking on the intersection between two projects will transfer user to a page with a detailed description of the clones. The map can also be saved as a PNG image.