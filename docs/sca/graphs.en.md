---
hide:
  - footer
---

# Working with dependency graph

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
