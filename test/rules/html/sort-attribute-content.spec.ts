import { type TSESLint } from "@typescript-eslint/utils";
import { RuleTester } from "eslint";

import {
	SORT_ATTRIBUTE_CONTENT_NAME,
	SortAttributeContentMessagesId,
	SortAttributeContentOptions,
	sortAttributeContentRule
} from "../../../src/rules";

new RuleTester({
	parser: require.resolve("@html-eslint/parser")
} satisfies TSESLint.RuleTesterConfig).run(
	`[HTML] ${SORT_ATTRIBUTE_CONTENT_NAME}`,
	sortAttributeContentRule,
	{
		valid: [
			{
				code: `<div></div>`,
				name: "Nothing to do",
				options: [[{ attributes: "class" }]]
			},
			{
				code: `<div class="B "></div>`,
				name: "Nothing to sort",
				options: [[{ attributes: "class" }]]
			},
			{
				code: `<div class="B D a c"></div>`,
				name: "Default order 1",
				options: [[{ attributes: "class" }]]
			},
			{
				code: `<div class="B Da Da c"></div>`,
				name: "Default order 2",
				options: [[{ attributes: "class" }]]
			},
			{
				code: `<div class="a B c D"></div>`,
				name: "Un-sensitive order",
				options: [[{ attributes: "class", caseSensitive: false }]]
			},
			{
				code: `<div class="c a D B"></div>`,
				name: "Reverse order",
				options: [[{ attributes: "class", direction: "desc" }]]
			},
			{
				code: `<div data-class="B|D|a|c"></div>`,
				name: "Custom separator (simple)",
				options: [[{ attributes: "data-class", separator: "|" }]]
			},
			{
				code: `<div data-class="-B||D|a|-|c"></div>`,
				name: "Custom separator (RegExp)",
				options: [[{ attributes: "data-class", separator: "/[\\|-]+/" }]]
			},
			{
				code: `<div class="B D a c" data-class="E  F g h "></div>`,
				name: "Default order (multiple attributes)",
				options: [[{ attributes: ["class", "data-class"] }]]
			},
			{
				code: `<div class="B-D-a-c"><span data-class="h g F E">Test</span></div>`,
				name: "2 different attributes with options",
				options: [
					[
						{ attributes: "class", separator: "-" },
						{ attributes: "data-class", direction: "desc" }
					]
				]
			},
			{
				code: `<div class="B-D||a--c"></div>`,
				name: "multiple separators",
				options: [[{ attributes: "class", separator: "/[-|]+/" }]]
			}
		],

		invalid: [
			{
				code: `<div class="a D B  c"></div>`,
				errors: [{ column: 15, endColumn: 16, messageId: "incorrect-order" }],
				name: "[Fix] Default order",
				options: [[{ attributes: "class" }]],
				output: `<div class="B D a  c"></div>`
			},
			{
				code: `<div class="B D a c"></div>`,
				errors: [{ column: 17, endColumn: 18, messageId: "incorrect-order" }],
				name: "[Fix] Un-sensitive order",
				options: [[{ attributes: "class", caseSensitive: false }]],
				output: `<div class="a B c D"></div>`
			},
			{
				code: `<div class="a D B c"></div>`,
				errors: [{ column: 19, endColumn: 20, messageId: "incorrect-order" }],
				name: "[Fix] Reverse order",
				options: [[{ attributes: "class", direction: "desc" }]],
				output: `<div class="c a D B"></div>`
			},
			{
				code: `<div data-class="a|D|B|c"></div>`,
				errors: [{ messageId: "incorrect-order" }],
				name: "[Fix] Custom separator (simple)",
				options: [[{ attributes: "data-class", separator: "|" }]],
				output: `<div data-class="B|D|a|c"></div>`
			},
			{
				code: `<div data-class="-D||c|a|-|B"></div>`,
				errors: [{ messageId: "incorrect-order" }],
				name: "[Fix] Custom separator (RegExp)",
				options: [[{ attributes: "data-class", separator: "/[\\|-]+/" }]],
				output: `<div data-class="-B||D|a|-|c"></div>`
			},
			{
				code: `<div class="B a D c"><span data-class="E F g h">Test</span></div>`,
				errors: [{ messageId: "incorrect-order" }],
				name: "[Fix] Default order (multiple attributes) 1",
				options: [[{ attributes: ["class", "data-class"] }]],
				output: `<div class="B D a c"><span data-class="E F g h">Test</span></div>`
			},
			{
				code: `<div class="B a D c"><span data-class="h E g F">Test</span></div>`,
				errors: [{ messageId: "incorrect-order" }, { messageId: "incorrect-order" }],
				name: "[Fix] Default order (multiple attributes) 2",
				options: [[{ attributes: ["class", "data-class"] }]],
				output: `<div class="B D a c"><span data-class="E F g h">Test</span></div>`
			},
			{
				code: `<div class="a-D-B-c" data-class="F h  g E"></div>`,
				errors: [{ messageId: "incorrect-order" }, { messageId: "incorrect-order" }],
				name: "[Fix] 2 different attributes with options",
				options: [
					[
						{ attributes: "class", separator: "-" },
						{ attributes: "data-class", direction: "desc" }
					]
				],
				output: `<div class="B-D-a-c" data-class="h g  F E"></div>`
			},
			{
				code: `<div class="D-a||c--B"></div>`,
				errors: [{ messageId: "incorrect-order" }],
				name: "multiple separators",
				options: [[{ attributes: "class", separator: "/[-|]+/" }]],
				output: `<div class="B-D||a--c"></div>`
			}
		]
	} satisfies TSESLint.RunTests<SortAttributeContentMessagesId, [SortAttributeContentOptions]>
);
