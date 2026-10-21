import type { TSESLint } from "@typescript-eslint/utils";

import {
	SortAttributeContentMessagesId,
	SortAttributeContentOptions,
	sortAttributeContentRule,
} from "../src/rules";

/** The rule with the types expected by `@typescript-eslint/rule-tester` (the sources use the ESLint types) */
export const rule = sortAttributeContentRule as unknown as TSESLint.RuleModule<
	SortAttributeContentMessagesId,
	[SortAttributeContentOptions]
>;

/**
 * @param parseForESLint the `parseForESLint` function of a parser
 * @returns the parser for the flat configuration
 */
export const toParser = (parseForESLint: unknown): TSESLint.FlatConfig.Parser => ({
	parseForESLint: parseForESLint as never,
});
