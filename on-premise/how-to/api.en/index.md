- [Русский](https://docs.codescoring.ru/on-premise/how-to/api/index.md)

# Working with API

Codescoring has open API, which allows you to programatically interact with the system. All the API commands are described in Swagger, which is available via the link **[platform-url]/api/swagger**.

## Beginning

To start working with Codescoring API, you need a token to authenticate requests. You can get a token in the `User profile` section by pressing the **Generate** button in the `API token` field.

To authenticate requests outside Swagger, it is necessary to prescribe a token in Header as follows:

`Authorization: Token <YOUR_TOKEN>`

## API structure

API provides a number of endpoints that allow you to perform basic operations in the system. Endpoints are grouped into sections corresponding to objects in the Codescoring system - dependencies, licenses, vulnerabilities, authors, etc.

## Pagination

For paginated response you can set `page` (for page number) and `per_page` (for per-page items amount) query parameters to the request.

The value of `per_page` parameter can be set with `CODESCORING_API_MAX_PAGE_SIZE` environment variable and defaults to 100.

Recommendation for the CODESCORING_API_MAX_PAGE_SIZE variable

Setting this value above 100 may negatively impact system performance.

Some endpoints work **only** in pagination mode and these parameters are mandatory, for the details see **[platform-url]/api/swagger**.

## Usage examples

- Run the analysis of all projects:

```
Curl -x 'Post' \
 '[platform_url]/API/Analysses/Overall_Sca/Start/' \
 -H 'Accept: Application/Json' \
 -H 'authorization: token <your_token>'
```

- Add policy:

```
Curl -x 'Post' \
 '[platform_URL]/API/POLICES/' \
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

```
Curl -x 'get' \
 '[platform_url]/API/Projects/340/' \
 -H 'Accept: Application/Json' \
 -H 'authorization: token <your_token>'
```

- Get a list of available licenses:

```
Curl -x 'get' \
 '[platform_url]/API/License/' \
 -H 'Accept: Application/Json' \
 -H 'authorization: token <your_token>'
```

**Important!**: The requests for creating and changing the main objects in the system, such as projects, are located in sections with the prefix **settings>**.
