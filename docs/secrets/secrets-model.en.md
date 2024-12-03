---
hide:
- footer
---
# Machine learning model management

By default, CodeScoring uses its own machine learning model to reduce the number of false positives when searching for secrets. By [manually marking](/secrets/secrets-findings.en/#_3) the found secrets, you can further train the model and improve the search results on your own source code.

To further train the model while having at least a 1000 marked up findings, go to the `Settings -> Workmode` section and click the **Run now** button in the **Secrets ML model management** section.

After further training, you can compare the results of the secret search and, based on them, either accept the user model (**Accept training**) or return to the base model (**Purge user model**).

![Machine learning model](/assets/img/secrets/ml-model.png)

The control section displays information about the current state of the model to the user:

- **Current ML Model Type** – type of the model used (base or user);
- **Base model accuracy** – search accuracy. It is calculated as an average value based on the markup, where the true-positive finding is taken as one, and the false-positive finding is taken as zero.
- **User model accuracy** – search accuracy using the user model;
- **Latest training model accuracy** – search accuracy using the latest additional training;
- **Is training possible** – possibility of additional training of the model based on the current labeling;
- **TP/FP/Total count** – true positives, false positives and all findings.

**Important**: if additional training of the model is impossible, this means that the markup is not complete enough. In this case, it is necessary to designate a larger number of findings as true positives or false positives.