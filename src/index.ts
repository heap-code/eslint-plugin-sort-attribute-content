import { ESLint } from "eslint";

import { SORT_ATTRIBUTE_CONTENT_NAME, sortAttributeContentRule } from "./rules";

export default {
	rules: {
		[SORT_ATTRIBUTE_CONTENT_NAME]: sortAttributeContentRule
	}
} satisfies ESLint.Plugin;
