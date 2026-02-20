- [Русский](https://docs.codescoring.ru/on-premise/how-to/oidc/index.md)

# Setting up OpenID Connect

## CodeScoring Authentication Page

**CodeScoring** supports authentication and authorization of users via **OpenID Connect**. On the authentication page, a menu is available with a choice of authentication provider. In addition to the default provider (local accounts, `internal directory`) and LDAP, active integrations with **OpenID Connect** servers are available for selection.

## Configuring the OpenID Connect Client on the Side of Provider

Below is an example of valid OpenID Connect client configuration on the side of provider given that the URL of the CodeScoring platform is `https://codescoring.example.com/`:

- **Root url** - `https://codescoring.example.com/`;
- **Home url** - `https://codescoring.example.com/cabinet/dashboard/`;
- **Valid redirect urls** - `https://codescoring.example.com/auth/oidc/callback*`;
- **Web origins** - `https://codescoring.example.com/`;
- **Admin url** - `https://codescoring.example.com/`;
- **Authentication flow** - standard flow.

## Configuring OpenID Connect Client on the side of CodeScoring

In order to configure OpenID Connect, go to `Settings -> Identity Providers -> OpenID Connect`.

You can go to the OpenID Connect integration creation for by clicking the **Create new** button. Fill in the fields below:

### Main OIDC Settings

- **Name** - the name of the integration, it is displayed at the login page;
- **Is active** - the activity flag, depending on the value, users will be able to select this integration as an identity provider at the login page;
- **Client ID** - identifier of the OpenID Connect Client, must match the identifier configured on the Provider side;
- **Client secret** - secret of the OpenID Connect Client, must match the secret configured on the Provider side.

### Connection settings

CodeScoring can configure itself based on the `/.well-known/openid-configuration` endpoint of the issuer via the `Get settings` button.

- **Provider issuer URL** - Issuer URL of the OpenID Connect provider;
- **Provider authorization URL** - Authorization URL of the OpenID Connect provider, can be obtained at `$ISSUER_URL/.well-known/openid-configuration`;
- **Provider token URL** - Token URL of the OpenId Connect provider, can be obtained at `$ISSUER_URL/.well-known/openid-configuration`;
- **Provider UserInfo URL** - UserInfo URL of the OpenID Connect provider, can be obtained at `$ISSUER_URL/.well-known/openid-configuration`;
- **Provider JWKS URL** - JWKS URL of the OpenID Connect provider, can be obtained at `$ISSUER_URL/.well-known/openid-configuration`;
- **Client scopes** - these values are passed in the `scope` parameter of the authorization request.

### Field mapping settings

- **Subject identifier field** - name of the field that contains the **subject** in the response, returned by UserInfo endpoint;
- **Username field** - name of the field that contains the **display username** in the response, returned by UserInfo endpoint;
- **First name field** - name of the field that contains the **first name** in the response, returned by UserInfo endpoint;
- **Last name field** - name of the field that contains the **last name** in the response, returned by UserInfo endpoint;
- **Email field** - name of the field that contains the **email** in the response, returned by UserInfo endpoint.

## OpenID Connect-managed accounts in CodeScoring

During the authentication via OpenID Connect, Codescoring will create or update a CodeScoring user account.

The following fields are mapped from the UserInfo response to the CodeScoring users:

- Subject identifier;
- Username;
- First name;
- Last name;
- Email.

Accounts, created via OpenID connect, can be added to groups, and their access level can be elevated the same way, as it is done for regular CodeScoring users.

For CodeScoring user accounts, managed by OpenID Connect, it is impossible to modify the username or set the password.
