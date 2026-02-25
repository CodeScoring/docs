- [Русский](https://docs.codescoring.ru/tqi/metrics/index.md)

# Calculating technical debt metrics

CodeScoring.TQI tracks several technical debt metrics. The main ones are **cyclomatic complexity**, **clone occurrence**, **code rate**.

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

```
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

## Impact of changes

You can evaluate the impact of changes on the project using the following parameters on the general graph:

- Rate;
- Velocity;
- Density.

The calculation is performed for the period. The minimum period is one week.

The sizes of the elements in the sample are normalized. The sample is normalized using the formula:

```
X’ = (X−Xmin)/(Xmax−Xmin)
```

Where:

- **Xmin** is the minimum value in the sample;
- **Xmax** is the maximum value in the sample;
- **X’** is the normalized value.

### Calculating the code rate

**Code rate** shows the amount of code change relative to the total number of lines of code. A high rate of code change indicates frequent changes in requirements or an unstable rhythm of the development team.

Calculation is based on the formula:

```
R = 100 * L / T
```

Where:

- **R** - code rate;
- **L** – number of lines of code entered (added, deleted, modified) during the billing period;
- **T** - total number of lines of code in the project repository at the beginning of the billing period.

### Calculating the velocity rate

**Velocity rate** shows the amount of changes in the code relative to the number of commits. At high values, the workload increases during code review, testing, and maintenance.

Calculation is based on the formula:

```
V = T / C
```

Where:

- **D** – density of changes;
- **L** – number of lines of added, deleted, modified code during the reporting period;
- **F** – number of modified files.

### Calculation of the density rate

**Density rate** shows how many changes were made to the code relative to the number of modified files. The high density value indicates the modification of a large number of modules. The burden of code review, testing and maintenance increases.

Calculation is based on the formula:

```
D = T / F
```

Where:

- **D** – density of changes;
- **L** – number of lines of code entered (added, deleted, modified) during the billing period;
- **F** – number of modified files.
