# eslint-plugin-sort-attribute-content

[![CI](https://github.com/heap-code/eslint-plugin-sort-attribute-content/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/heap-code/eslint-plugin-sort-attribute-content/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/eslint-plugin-sort-attribute-content)](https://www.npmjs.com/package/eslint-plugin-sort-attribute-content)
![Code coverage](.badges/code/coverage.svg)

An ESLint plugin to sort attribute content in HTML

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

<!-- TODO: other parsers -->

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

## Rules

<!-- begin auto-generated rules list -->

<!-- end auto-generated rules list -->

## Releases

See information about breaking changes and release notes [here](https://github.com/heap-code/eslint-plugin-sort-attribute-content/blob/HEAD/CHANGELOG.md).
