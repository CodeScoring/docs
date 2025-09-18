---
hide:
- footer
---

# Calculating technical debt metrics

CodeScoring.TQI tracks several technical debt metrics. The main ones are **cyclomatic complexity** and **clone occurrence**.

## Calculating cyclomatic complexity

**Cyclomatic complexity** is an indicator that reflects the number of independent paths in the code. The higher this value, the more difficult it is to maintain and test the code.

Calculation is based on the formula:

```
M = E - N + 2P
```

Where:

- **M** – cyclomatic complexity;
- **E** – number of edges (transitions between operators);
- **N** – number of nodes (operators, conditions);
- **P** – number of connectivity components (usually 1).

Example:

```python
def is_even(x):
print("Even" if x % 2 == 0 else "Odd")
```

Cyclomatic complexity:

- **N = 3** (input, `if-else`, `print`).
- **E = 3** (input -> `if-else`, `if-else` -> `print`, `print` -> output).
- **P = 1** (function).

So cyclomatic complexity is M = E - N + 2P = 3 - 3 + 2 = **2**

Complexity levels:

- **Low**: < 10 (simple code, easy to read and maintain);
- **Medium**: 10–20 (moderately complex code, requires attention when changing);
- **High**: > 20 (complex code, possible problems with testing and support).

## Calculating the percentage of intra-project clones

This indicator reflects what part of the project's code is duplicated. It is calculated using the following formula:

```
Percentage of duplicates = (number of duplicated lines of code / total number of lines of code) * 100%
```

The higher this percentage, the more code can be optimized with refactoring.

## Calculating the occurrence of clones

This indicator evaluates the extent to which duplicated code is distributed throughout the project.

Categories:

- **Low level** - if there are less than 50 duplicated lines;
- **Medium level** - if there are from 50 to 300 duplicated lines;
- **High level** - if there are more than 300 duplicated lines.