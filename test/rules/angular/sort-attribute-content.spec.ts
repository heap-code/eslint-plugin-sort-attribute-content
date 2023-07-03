import { RuleTester } from "eslint";

import { SORT_ATTRIBUTE_CONTENT_NAME, sortAttributeContentRule } from "../../../src/rules";

// TODO
new RuleTester().run(`[Angular] ${SORT_ATTRIBUTE_CONTENT_NAME}`, sortAttributeContentRule, {
	valid: [],

	invalid: []
});
