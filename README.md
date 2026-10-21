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

> Supported ESLint versions: `^8.57.0 || ^9.0.0 || ^10.0.0`.

With the [flat configuration](https://eslint.org/docs/latest/use/configure/configuration-files)
(`eslint.config.js`, default since ESLint 9 and the only format of ESLint 10),
a parser must be set, then the plugin and its rule can be enabled:

```js
import htmlParser from "@html-eslint/parser";
import sortAttributeContent from "eslint-plugin-sort-attribute-content";

export default [
  {
    files: ["**/*.html"],
    languageOptions: { parser: htmlParser },
    plugins: { "sort-attribute-content": sortAttributeContent },
    rules: {
      "sort-attribute-content/sort-attribute-content": ["error", [{ attributes: "class" }]],
    },
  },
];
```

> Go to the [parsers section](#parsers) to display the list of available parsers.

<details>
<summary>Legacy configuration (<code>.eslintrc</code>, ESLint 8)</summary>

```json
{
  "overrides": [
    {
      "files": ["*.html"],
      "parser": "@html-eslint/parser",
      "plugins": ["sort-attribute-content"],
      "rules": {
        "sort-attribute-content/sort-attribute-content": ["error", [{ "attributes": "class" }]]
      }
    }
  ]
}
```

</details>

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

```js
import htmlParser from "@html-eslint/parser";

export default [{ files: ["**/*.html"], languageOptions: { parser: htmlParser } }];
```

#### Angular

This plugin can be used with the [Angular framework](https://angular.io/).  
The parser [@angular-eslint/template-parser](https://www.npmjs.com/package/@angular-eslint/template-parser)
should be installed first:

```bash
npm i -D @angular-eslint/template-parser
```

Then set in the configuration file:

```js
import angularTemplateParser from "@angular-eslint/template-parser";

export default [{ files: ["**/*.html"], languageOptions: { parser: angularTemplateParser } }];
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
ESLint must first be configured to read React (JSX).  
> [How to configure?](https://github.com/jsx-eslint/eslint-plugin-react#flat-configs)

Once enabled, it will work on any file containing JSX.

> Do not forget to set the [typescript parser](https://typescript-eslint.io/packages/parser/)
> for `tsx` files.
>
> Install:
>
> ```bash
> npm i -D typescript-eslint
> ```

It might be useful to enable the rule only on these files:

```js
import sortAttributeContent from "eslint-plugin-sort-attribute-content";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.jsx", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { "sort-attribute-content": sortAttributeContent },
    rules: {
      "sort-attribute-content/sort-attribute-content": ["error", [{ attributes: "className" }]],
    },
  },
];
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

See information about breaking changes and release notes in the [CHANGELOG](https://github.com/heap-code/eslint-plugin-sort-attribute-content/blob/HEAD/CHANGELOG.md).
