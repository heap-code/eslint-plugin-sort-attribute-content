import { ESLint } from "eslint";

import { SORT_ATTRIBUTE_CONTENT_NAME, sortAttributeContentRule } from "./rules";

/** Set by `tsup` at build time */
declare const __PACKAGE_VERSION__: string;

const plugin = {
	meta: { name: "eslint-plugin-sort-attribute-content", version: __PACKAGE_VERSION__ },
	rules: {
		[SORT_ATTRIBUTE_CONTENT_NAME]: sortAttributeContentRule,
	},
} satisfies ESLint.Plugin;

export default plugin;
