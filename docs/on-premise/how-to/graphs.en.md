---
hide:
  - footer
---

# Working with dependency graph

Open Source dependencies of software projects represent a graph – a structure in which individual components are depicted as nods, and the connections between them as edges.

You can see the visualization of the dependency graph in the `Dependencies` section or on the project page by clicking on the corresponding icon in the list of dependencies.

![Dependencies](/assets/img/dependencies_list.png)

On the page with interactive visualization, components are presented by the level of nesting - from the root dependency to the deepest level of transitive dependencies. By hovering cursor over the objects, you can see more detailed information about components: version, environment, technology and number of vulnerabilities.

Visualization is interactive and scalable. By choosing a component, you can track its path of entering the project. Components with found vulnerabilities are indicated by color.

![Graph](/assets/img/graph.png)

Components on the graph can be filtered according to the following parameters:

- technology;
- development environment;
- severity of vulnerability.
