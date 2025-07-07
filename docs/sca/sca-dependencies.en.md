---
hide:
  - footer
---

# Working with SCA components

Components that have checked the `SCA` module are displayed in the `SCA` section of the CodeScoring interface.

## View dependencies list¶

The list of scanned Open Source dependencies can be viewed in the `SCA -> Dependencies` subsection.
The table in this section contains **all** dependencies that were checked during the operation of the SCA module, with the following information:

- **Dependency** – dependency name (with a link to its individual page);
- **Technology** – technology (programming language or build tool);
- **Licenses** – licenses;
- **Authors** – authors;
- **Vulnerabilities** – number of vulnerabilities found in the dependency;
- **Found** – dependency definition type: by manifest or by content (when the component code is included in the project code base);
- **Relationship** – dependency type (direct or transitive);
- **Environment** – development environment (scope);
- **Parent Dependencies** – related upstream dependencies;
- **Project** – used in the project;
- **Maximum patch version** - the version to which the dependency must be updated to close known vulnerabilities of the dependency;
- **Release date** - the date and time of the dependency release.

The dependency table can be filtered by project, department, project category, project groups, technology, license, license category, as found, relationship, environment, release time period.

Clicking on the dependency name takes you to its individual page, where information about its use in projects and found vulnerabilities is displayed.

Note on calculating the maximum patch version. This value is the version to which the dependency must be updated to close vulnerabilities currently known in CodeScoring with a known patch version. Dependencies without a version are not taken into account in the calculation.

## Working with dependency graph

Open Source dependencies of software projects represent a graph – a structure in which individual components are depicted as nodes, and the connections between them as edges.

You can see the visualization of the dependency graph in the `Dependencies` section or on the project page by clicking on the corresponding icon in the list of dependencies.

![Dependencies](/assets/img/dependencies_list.png)

On the page with interactive visualization, components are displayed according to their nesting level - from the root dependency to the deepest level of transitive dependencies. Hovering the cursor over an object reveals more detailed information about the component, such as version, environment, technology and number of vulnerabilities.

The visualization is interactive and scalable. By selecting a component, you can trace its path into the project. Components with identified vulnerabilities are highlighted.

![Graph](/assets/img/graph.png)

Components on the graph can be filtered according to the following parameters:

- technology;
- development environment;
- severity of vulnerability.
