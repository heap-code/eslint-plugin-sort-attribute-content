import { parseForESLint } from "@html-eslint/parser";
import { Linter } from "eslint";

import {
	SORT_ATTRIBUTE_CONTENT_NAME,
	SortAttributeContentOptions,
	sortAttributeContentRule,
} from "../../src/rules";

describe("e2e", () => {
	// The flat config is the default since ESLint 9, but must be explicitly set with ESLint 8
	const linter = new Linter({ configType: "flat" });

	const verify = (options: SortAttributeContentOptions) =>
		linter.verify("<div></div>", {
			languageOptions: { parser: { parseForESLint: parseForESLint as never } },
			plugins: {
				"sort-attribute-content": {
					rules: { [SORT_ATTRIBUTE_CONTENT_NAME]: sortAttributeContentRule },
				},
			},
			rules: {
				[`sort-attribute-content/${SORT_ATTRIBUTE_CONTENT_NAME}`]: ["error", options],
			},
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
