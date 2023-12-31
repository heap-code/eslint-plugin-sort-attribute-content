# eslint-plugin-sort-attribute-content

[![CI](https://github.com/heap-code/eslint-plugin-sort-attribute-content/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/heap-code/eslint-plugin-sort-attribute-content/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/eslint-plugin-sort-attribute-content)](https://www.npmjs.com/package/eslint-plugin-sort-attribute-content)
![Code coverage](.badges/code/coverage.svg)

An ESLint plugin to sort attribute content in HTML

> If you are using [Tailwind](https://tailwindcss.com/) and only want to lint the classnames,
> then the [eslint-plugin-tailwindcss](https://www.npmjs.com/package/eslint-plugin-tailwindcss)
> is probably a better choice.

## Installation

First, `eslint` must be installed:

```bash
npm i --save-dev eslint
```

Then, `eslint-plugin-sort-attribute-content` can be installed:

```bash
npm i --save-dev eslint-plugin-sort-attribute-content
```

## Usage

A parser must be set to use this plugin:

```json
{
  "parser": "@html-eslint/parser"
}
```

> Go to the [parsers section](#parsers) to display the list of available parsers.

The plugin can then be activated by adding `sort-attribute-content` to the `plugins` property:

```json
{
  "plugins": ["sort-attribute-content"]
}
```

The rule can be defined as follows:

```json
{
  "rules": {
    "sort-attribute-content/sort-attribute-content": ["error", { "attributes": "class" }]
  }
}
```

> All this configuration can be done on a `override` section:
> <https://eslint.org/docs/latest/use/configure/configuration-files#how-do-overrides-work>

### Parsers

The plugin can be used with multiple parsers.

#### HTML

A _regular_ HTML parser can be used for any HTML files.  
The parser [@html-eslint/parser](https://www.npmjs.com/package/@html-eslint/parser)
should be installed first:

```bash
npm i -D @html-eslint/parser
```

Then set in the configuration file:

```json
{
  "parser": "@html-eslint/parser"
}
```

#### Angular

This plugin can be used with the [Angular framework](https://angular.io/).  
The parser [@angular-eslint/template-parser](https://www.npmjs.com/package/@angular-eslint/template-parser)
should be installed first:

```bash
npm i -D @angular-eslint/template-parser
```

Then set in the configuration file:

```json
{
  "parser": "@angular-eslint/template-parser"
}
```

> **Note**:  
> It only works for text attributes.
>
> ```angular2html
> <div class="a b c" [title]="'d e f'"></div>
>             ^^^^^
> ```

#### React

This plugin can be used with the [React library](https://react.dev/).  
ESLint must first be configured to read React.  
> [How to configure?](https://github.com/jsx-eslint/eslint-plugin-react#configuration-legacy-eslintrc-)

Once enabled, it will work on `jsx` and `tsx` files.

> Do not forget to set the [typescript parser](https://typescript-eslint.io/packages/parser/)
> for `tsx` files.
>
> Install:
>
> ```bash
> npm i -D @typescript-eslint/parser
> ```
>
> Then set in the configuration file:
>
> ```json
> {
>   "parser": "@typescript-eslint/parser"
> }
> ```

It might be useful to enable the rule only on these files:

```json
{
  "overrides": [
    {
      "files": ["*.jsx", "*.tsx"],
      "rules": {
        "sort-attribute-content/sort-attribute-content": ["error", { "attributes": "className" }]
      }
    }
  ]
}
```

> **Note**:  
> It only works for literal text attributes.
>
> ```tsx
> return <div className="a b c" title={title} />
>                        ^^^^^
> ```

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                           | 🔧 |
| :------------------------------------------------------------- | :- |
| [sort-attribute-content](docs/rules/sort-attribute-content.md) | 🔧 |

<!-- end auto-generated rules list -->

## Releases

See information about breaking changes and release notes [here](https://github.com/heap-code/eslint-plugin-sort-attribute-content/blob/HEAD/CHANGELOG.md).
