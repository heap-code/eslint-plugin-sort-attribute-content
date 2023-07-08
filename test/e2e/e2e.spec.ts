import { parseForESLint } from "@html-eslint/parser";
import { Linter } from "eslint";

import {
	SORT_ATTRIBUTE_CONTENT_NAME,
	SortAttributeContentOptions,
	sortAttributeContentRule
} from "../../src/rules";

describe("e2e", () => {
	const parser = "@html-eslint/parser";
	const linter = new Linter();

	linter.defineParser(parser, { parseForESLint: parseForESLint as never });
	linter.defineRule(SORT_ATTRIBUTE_CONTENT_NAME, sortAttributeContentRule);

	const verify = (options: SortAttributeContentOptions) =>
		linter.verify("<div></div>", {
			parser,
			rules: {
				[SORT_ATTRIBUTE_CONTENT_NAME]: ["error", options]
			}
		});

	it("should throw an error when no option is set", () => {
		expect(() => verify([])).toThrow("no options");
	});

	it("should throw an error when `attributes` is empty", () => {
		expect(() => verify([{ attributes: [] }])).toThrow("no attributes");
	});

	it("should throw an error when the `separator` is an empty string", () => {
		expect(() => verify([{ attributes: "class", separator: "" }])).toThrow("empty separator");
	});
});
