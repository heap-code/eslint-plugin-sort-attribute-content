# Rule

<!-- end auto-generated rule header -->

Sort the content of attributes.

## Options

| Name            | Description                                                | value                                                     |
|:----------------|:-----------------------------------------------------------|:----------------------------------------------------------|
| `attributes`    | The attribute(s) on which to apply the order.              | _string_ \| _string[]_                                    |
| `caseSensitive` | If true, enforce properties to be in case-sensitive order. | _boolean_                                                 |
| `direction`     | Specify the direction of the ordering.                     | `asc` \| `desc`                                           |
| `separator`     | The string or the _RegExp_ to separate the content.        | _string_ as a _RegExp_ when it starts and ends with a `/` |

> Definitive information in the [JSON schema](../../src/rules/sort-attribute-content/sort-attribute-content.options.schema.json).

### Defaults

This is the default values when the rule is enabled:

```json
{
  "sort-attribute-content/sort-attribute-content": [
    "warn",
    {
      "attributes": ["class"],
      "caseSensitive": true,
      "direction": "asc",
      "separator": "/\\s+/"
    }
  ]
}
```

### Usage

<details>
<summary>Usage of <code>"attributes": ["a", "b"]</code></summary>

#### Configuration

```json
{
  "sort-attribute-content/sort-attribute-content": [
    "warn",
    {
      "attributes": ["class", "data-tags"]
    }
  ]
}
```

#### ❌ Invalid

```html
<div class="a D B c"><span data-tags="2 1 3"></span></div>
```

#### ✅ Valid

```html
<div class="B D a c"><span data-tags="1 2 3"></span></div>
```

</details>

<br />

<details>
<summary>Usage of <code>"caseSensitive": false</code></summary>

#### Configuration

```json
{
  "sort-attribute-content/sort-attribute-content": [
    "warn",
    {
      "attributes": "class",
      "caseSensitive": false
    }
  ]
}
```

#### ❌ Invalid

```html
<div class="a D B c"></div>
```

#### ✅ Valid

```html
<div class="a B c D"></div>
```

</details>

<br />

<details>
<summary>Usage of <code>"direction": "desc"</code></summary>

#### Configuration

```json
{
  "sort-attribute-content/sort-attribute-content": [
    "warn",
    {
      "attributes": "class",
      "direction": "desc"
    }
  ]
}
```

#### ❌ Invalid

```html
<div class="a D B c"></div>
```

#### ✅ Valid

```html
<div class="c a D B"></div>
```

</details>

<br />

<details>
<summary>Usage of <code>"separator": "/[-\\|]+/"</code></summary>

#### Configuration

```json
{
  "sort-attribute-content/sort-attribute-content": [
    "warn",
    {
      "attributes": "class",
      "separator": "/[-\\|]+/"
    }
  ]
}
```

#### ❌ Invalid

```html
<div class="a-D|-|B|c"></div>
```

#### ✅ Valid

```html
<div class="B-D|-|a|c"></div>
```

</details>

<br />
