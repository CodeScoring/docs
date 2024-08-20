---
hide:
  - footer
---
# LDAP Settings

## LDAP integration capabilities

**CodeScoring** supports authentication and authorization of users via **LDAP** and mapping of user attributes in **LDAP** to user attributes in the system.

## CodeScoring Authentication Page

On the authentication page, a menu is available with a choice of authentication provider. In addition to the default provider (local
accounts, `internal directory`), active integrations with **LDAP** servers are available for selection.

<p float="left">
  <img src="/assets/img/ldap/login-2.png" alt="choice of provider of authenticating" width="350" />
  <img src="/assets/img/ldap/login-1.png" alt="authentication via default provider" width="350" /> 
</p>


## Mapping LDAP user record attributes to CodeScoring user attributes

When authenticating via **LDAP**, the following data is mapped from a directory entry to an account in CodeScoring:

- username;
- first name;
- last name;
- e-mail.

![mapping attributes of user records to CodeScoring](/assets/img/ldap/user_field_mapping.png)

## Mapping LDAP groups to CodeScoring groups and roles

When authenticating via LDAP, CodeScoring can query a user's LDAP group data and map it to its own groups and roles. To activate this feature, the following fields must be filled in the LDAP settings:

- `Group search base`.
- `Group search filter for user`
- `Group search filter for all groups`
- `Group name field`
- `Group member field`

CodeScoring performs mapping according to the rules, the management of which is available in the `Settings -> Group mapping` section.

Mapping is triggered only in two cases:

- when the user logs in;
- when the `Apply all rules` button is pressed in `Settings -> Group mapping` section.

Mapping rules are applied as follows:

- during the mapping process the composition of the user's groups is updated;
- adding, modifying and deleting mapping rules will not update the user groups. In order to apply the changed rules, the mapping process must be initiated in one of the two ways specified above;
- user groups added or edited manually by the administrator are not changed during the mapping process, i.e. manual changes take precedence;
- if an error occurs when searching for LDAP groups after successful authentication in LDAP, the user groups applied according to the mapping rules will be deleted.

![creating LDAP group mapping rules to CodeScoring roles and groups](/assets/img/ldap/group_mapping_create.png)

![view LDAP group mapping rules to CodeScoring roles and groups](/assets/img/ldap/group_mapping_list.png)

## View existing LDAP integrations

Viewing existing integrations is available in the `Settings -> LDAP` section. The section displays a table with a list of
configured LDAP integrations, a button to create a new integration (`Setup new`), and a search box (`Search`).

![view list of LDAP integrations](/assets/img/ldap/list.png)

## View details about an existing LDAP integration

Detailed view opens by clicking on the link with the name of the integration or by clicking the **View** button in the Actions section.

When viewing, the following actions are available:

- deleting an integration (`Delete`);
- editing the integration (`Edit`);
- checking availability (`Refresh status`).

In addition to the basic configuration fields (described below), when viewing details about an integration with **LDAP**, data about:

- creation date;
- date of the last update;
- availability status;
- (optional) reason for unavailability.

![view LDAP integration details](/assets/img/ldap/view.png)

## Create or edit an LDAP integration

In order to create a new integration with **LDAP**, you must click on the `Setup new` button in the list of integrations view. In order to edit an existing integration, you must click the `Edit` button on the page or in the list of integrations. The create and edit forms are identical.

### Description of form fields

- `Name` - name of the integration, displayed on the authentication page;
- `LDAP protocol` - choice between **LDAP** and **LDAPS** protocols (**LDAP** over **SSL**);
- `LDAP hostname` - domain name or IP address of the **LDAP** server;
- `LDAP port` - port of **LDAP** server;
- `User search base` - specifies where to search for user records;
- `User search filter` - filter for searching user records. Must contain the `%USERNAME%` pattern, when searching it will be replaced by the name of the user;
- `Username field` - attribute storing the name of the user's KM in the record about it;
- `Email field` - attribute storing the user's email in the record about it;
- `First name field` - attribute storing user's name in its record;
- `Last name field` - attribute storing the user's last name in the user's record;
- `Username format` - selection of authorization string format;
- `Domain` - specifying the **Active Directory** domain (appears when the corresponding **Username format** is selected);
- `Service user` - login of the user with permissions to read directories on the **LDAP** server;
- `Service user password` - password of the user with directory reading rights on the **LDAP server**;
- `Group search base` - specifies where to search for group records;
- `Group search filter for user` - filter to search for records of groups to which the user belongs. Must contain the `%USERNAME%` template, during the search it will be replaced by the name of the KM for which authentication via **LDAP** is performed;
- `Group search filter for all groups` - filter to search for records of all groups in **LDAP**;
- `Group name field` - attribute that stores the name of the group in the group record;
- `Group member field` - attribute that stores group member identifiers in the group record;
- `Use tls` - use **TLS**;
- `Is active` - whether integration with **LDAP** is used for user authentication.

![create or edit fields](/assets/img/ldap/edit_or_create.png)

### Available options for username format

![available options for username format](/assets/img/ldap/username_format.png) 

### Testing the LDAP integration configuration

For ease of configuration, 2 forms for connection testing are available to users:

- connection and authentication testing (`test bind`);
- testing of search (`test search`).

Both tests combine data from the main form with data from the test form. Data from the fields `Service user` and `Service user password` fields are ignored.

#### Connection and authentication testing

When the button (`Test it`) in the **Test bind** section is clicked, connection to the LDAP server is made (`bind` operation). In case of successful test a notification about the success of the operation is displayed. In case of test failure - an error message.

![successful connection test](/assets/img/ldap/test_bind_success.png)
![failed connection test](/assets/img/ldap/test_bind_fail.png) 

#### User Data Load Test

When the button (`Test it`) in the **Test user search** is clicked, the connection to the LDAP server is made (`bind` operation) and the data about the user data (`search` operation) according to the data in the form. In case of a successful test, a notification about the success of the operation and the search result is displayed. In case of test failure - an error message.

![successful test of loading user data](/assets/img/ldap/test_search_success.png)
![failed user data load test](/assets/img/ldap/test_search_fail.png) 

#### Group Data Loading Test

When the test button (`Test it`) in the **Test load groups** is clicked, the connection to the LDAP server (`bind` operation) is made and search for data on the groups (`search` operation) according to the data in the form. In case of a successful test, a notification about the success of the operation and the search result is displayed. In case of test failure - an error message.
![successful test of group data loading](/assets/img/ldap/test_load_groups_success.png)
![failed group data load test](/assets/img/ldap/test_load_groups_fail.png) 

## LDAP authentication mechanism

![LDAP authentication mechanism illustration](/assets/img/ldap/auth_swimlane.png) 

## Notes

- Using authentication via **LDAP** does not imply full directory synchronization with user information from **Directory Service**.
- It is not possible to edit the username and assign a password to a user from **LDAP**.
- It is possible to have users from different authentication providers with the same username.
- It is possible to assign any access level (`User`, `Auditor`, `Administrator`) to a user from **LDAP**.
