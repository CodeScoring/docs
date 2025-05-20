---
hide:
- footer
---

# OSS Index Integration

In addition to the internal **CodeScoring Index** database, you can also connect a third-party feed [Sonatype OSS Index](https://ossindex.sonatype.org/) for advanced analysis.

Integration is carried out in the `Settings -> OSS Index` section. To connect, you must fill in the Email and API token received during user registration in Sonatype OSS Index.

![OSS Index](/assets/img/oss-index-en.png)

**Important**:

1. OSS Index is used only during SCA startup.
2. OSS Index will refer to a third-party URL: [https://ossindex.sonatype.org/](https://ossindex.sonatype.org/).
3. SCA speed may decrease when using OSS Index.
4. When using OSS Index without a token, the system may return data different from authorized requests.