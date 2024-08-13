---
hide:
  - footer
---

# Working with API

Codescoring has open API, which allows you to programatically interact with the system. All the API commands are described in Swagger, which is available via the link **[installation-url]/api/swagger**.

## Beginning

To start working with Codescoring API, you need a token to authenticate requests. You can get a token in the `User profile` section by pressing the **Generate** button in the `API token` field.

To authenticate requests outside Swagger, it is necessary to prescribe a token in Header as follows:

`Authorization: token <YOUR_TOKEN>`

## API structure

API provides a number of endpoints that allow you to perform basic operations in the system. Endpoints are divided into sections corresponding to objects in the Codescoring system - dependencies, licenses, vulnerabilities, authors, etc.

Examples of using some requests in the API:

- Run the analysis of all projects:

```Bash
Curl -x 'Post' \
 '[Installation_url]/API/Analysses/Overall_Sca/Start/' \
 -H 'Accept: Application/Json' \
 -H 'authorization: token <your_token>'
```

- Add policy:

```Bash
Curl -x 'Post' \
 '[Installation_URL]/API/POLICES/' \
 -H 'Accept: Application/Json' \
 -H 'authorization: token <your_token>' \
 -H 'content-type: application/json' \
 -D '{
 "NAME": "string",
 "Stages": [
 "Dev"
 ]
 "Level": "Info",
 "Proprietors": [
 0
 ]
 "Projects": [
 0
 ]
 "Conditions": {
 "Additionalprop1": "String",
 "Additionalprop2": "String",
 "Additionalprop3": "String"
 }
 "Conditions_Connector": "And",
 "IS_ACTIVE": True,
 "is_blocks_build": True,
 "Description": "String"
} '
```

- Get information about a separate project:

```Bash
Curl -x 'get' \
 '[Installation_url]/API/Projects/340/' \
 -H 'Accept: Application/Json' \
 -H 'authorization: token <your_token>'
```

- Get a list of available licenses:

```Bash
Curl -x 'get' \
 '[Installation_url]/API/License/' \
 -H 'Accept: Application/Json' \
 -H 'authorization: token <your_token>'
```

**Important!**: The requests for creating and changing the main objects in the system, such as projects, are located in sections with the prefix **settings>**.
