import { type TSESLint } from "@typescript-eslint/utils";
import { RuleTester } from "eslint";

import {
	SORT_ATTRIBUTE_CONTENT_NAME,
	SortAttributeContentMessagesId,
	SortAttributeContentOptions,
	sortAttributeContentRule
} from "../../../src/rules";

new RuleTester({
	parser: require.resolve("@angular-eslint/template-parser")
} satisfies TSESLint.RuleTesterConfig).run(
	`[Angular] ${SORT_ATTRIBUTE_CONTENT_NAME}`,
	sortAttributeContentRule,
	{
		// TODO
		valid: [{ code: "", options: [[{ attributes: "" }]] }],

		invalid: []
	} satisfies TSESLint.RunTests<SortAttributeContentMessagesId, [SortAttributeContentOptions]>
);
