- [Русский](https://docs.codescoring.ru/feeds/oss-index/index.md)

# Integrating OSS Index

In addition to the internal **CodeScoring Index** database, you can also connect a third-party feed [Sonatype OSS Index](https://ossindex.sonatype.org/) for advanced analysis.

Integration is carried out in the `Settings -> OSS Index` section. To connect, you must fill in the Email and API token received during user registration in Sonatype OSS Index.

**Important**:

1. OSS Index is used only during SCA startup.
1. OSS Index will refer to a third-party URL: <https://ossindex.sonatype.org/>.
1. SCA speed may decrease when using OSS Index.
1. When using OSS Index without a token, the system may return data different from authorized requests.
