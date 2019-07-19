> **[yavnotifier](README.md)**

[Globals](globals.md) /

# yavnotifier

## Index

### Functions

* [isUpdated](globals.md#markdown-header-isupdated)
* [latest](globals.md#markdown-header-latest)
* [notify](globals.md#markdown-header-notify)

## Functions

###  isUpdated

▸ **isUpdated**(`name`: string, `version`: string): *`Promise<boolean>`*

*Defined in [index.ts:21](https://github.com/d0whc3r/yavnotifier/blob/c3566b7/code/src/index.ts#L21)*

Check if a package and version is the latest

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | Name of the package to check |
`version` | string | Version to check if it is the latest |

**Returns:** *`Promise<boolean>`*

Promise with boolean true if its the latest version or false otherwise

___

###  latest

▸ **latest**(`name`: string): *`Promise<string>`*

*Defined in [index.ts:11](https://github.com/d0whc3r/yavnotifier/blob/c3566b7/code/src/index.ts#L11)*

Get the latest version of a package

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | Name of the package to get the latest version |

**Returns:** *`Promise<string>`*

Promise with latest version as result

___

###  notify

▸ **notify**(`name`: string, `version`: string, `message`: string): *`Promise<void>`*

*Defined in [index.ts:33](https://github.com/d0whc3r/yavnotifier/blob/c3566b7/code/src/index.ts#L33)*

Show a notification if there is a newest version for package

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`name` | string | - | Name of the package to check |
`version` | string | - | Version to check if it is the latest |
`message` | string | "Update available for package" | (optional) Message to show in the notification |

**Returns:** *`Promise<void>`*