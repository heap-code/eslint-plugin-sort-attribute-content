import { TSESLint } from "@typescript-eslint/utils";
import { RuleTester } from "eslint";

import {
	SORT_ATTRIBUTE_CONTENT_NAME,
	SortAttributeContentMessagesId,
	SortAttributeContentOptions,
	sortAttributeContentRule,
} from "../../../src/rules";

const getReactTests = (typescript: boolean) => {
	const wrapReact = (html: string) =>
		typescript
			? `
type MyProps = unknown;
function component(props: MyProps) {
	return (
		<div a={1} b="2" c={props.value}>
${html}
		</div>
	);
}`
			: `
function component(props) {
	return (
		<div a={1} b="2" c={props.value}>
${html}
		</div>
	);
}`;

	return {
		valid: [
			{
				code: wrapReact(`<div></div>`),
				name: "Nothing to do",
				options: [[{ attributes: "className" }]],
			},
			{
				code: wrapReact(`<div className="B ">text</div>`),
				name: "Nothing to sort",
				options: [[{ attributes: "className" }]],
			},
			{
				code: wrapReact(`<div className="B D a c">text</div>`),
				name: "Default order 1",
				options: [[{ attributes: "className" }]],
			},
			{
				code: wrapReact(`<div className="B Da Da c">text</div>`),
				name: "Default order 2",
				options: [[{ attributes: "className" }]],
			},
			{
				code: wrapReact(`<div className="a B c D">text</div>`),
				name: "Un-sensitive order",
				options: [[{ attributes: "className", caseSensitive: false }]],
			},
			{
				code: wrapReact(`<div className="c a D B">text</div>`),
				name: "Reverse order",
				options: [[{ attributes: "className", direction: "desc" }]],
			},
			{
				code: wrapReact(`<div dataClass="B|D|a|c">text</div>`),
				name: "Custom separator (simple)",
				options: [[{ attributes: "dataClass", separator: "|" }]],
			},
			{
				code: wrapReact(`<div dataClass="-B||D|a|-|c">text</div>`),
				name: "Custom separator (RegExp)",
				options: [[{ attributes: "dataClass", separator: "/[\\|-]+/" }]],
			},
			{
				code: wrapReact(`<div className="B D a c" dataClass="E  F g h ">text</div>`),
				name: "Default order (multiple attributes)",
				options: [[{ attributes: ["class", "dataClass"] }]],
			},
			{
				code: wrapReact(
					`<div className="B-D-a-c"><span dataClass="h g F E">Test</span></div>`,
				),
				name: "2 different attributes with options",
				options: [
					[
						{ attributes: "className", separator: "-" },
						{ attributes: "dataClass", direction: "desc" },
					],
				],
			},
			{
				code: wrapReact(`<div className="B-D||a--c">text</div>`),
				name: "multiple separators",
				options: [[{ attributes: "className", separator: "/[-|]+/" }]],
			},
		],

		invalid: [
			{
				code: wrapReact(`<div className="a D B  c">text</div>`),
				errors: [{ column: 18, endColumn: 19, messageId: "incorrect-order" }],
				name: "[Fix] Default order",
				options: [[{ attributes: "className" }]],
				output: wrapReact(`<div className="B D a  c">text</div>`),
			},
			{
				code: wrapReact(`<div className="B D a c">text</div>`),
				errors: [{ column: 20, endColumn: 21, messageId: "incorrect-order" }],
				name: "[Fix] Un-sensitive order",
				options: [[{ attributes: "className", caseSensitive: false }]],
				output: wrapReact(`<div className="a B c D">text</div>`),
			},
			{
				code: wrapReact(`<div className="a D B c">text</div>`),
				errors: [{ column: 22, endColumn: 23, messageId: "incorrect-order" }],
				name: "[Fix] Reverse order",
				options: [[{ attributes: "className", direction: "desc" }]],
				output: wrapReact(`<div className="c a D B">text</div>`),
			},
			{
				code: wrapReact(`<div dataClass="a|D|B|c">text</div>`),
				errors: [{ messageId: "incorrect-order" }],
				name: "[Fix] Custom separator (simple)",
				options: [[{ attributes: "dataClass", separator: "|" }]],
				output: wrapReact(`<div dataClass="B|D|a|c">text</div>`),
			},
			{
				code: wrapReact(`<div dataClass="-D||c|a|-|B">text</div>`),
				errors: [{ messageId: "incorrect-order" }],
				name: "[Fix] Custom separator (RegExp)",
				options: [[{ attributes: "dataClass", separator: "/[\\|-]+/" }]],
				output: wrapReact(`<div dataClass="-B||D|a|-|c">text</div>`),
			},
			{
				code: wrapReact(
					`<div className="B a D c"><span dataClass="E F g h">Test</span></div>`,
				),
				errors: [{ messageId: "incorrect-order" }],
				name: "[Fix] Default order (multiple attributes) 1",
				options: [[{ attributes: ["className", "dataClass"] }]],
				output: wrapReact(
					`<div className="B D a c"><span dataClass="E F g h">Test</span></div>`,
				),
			},
			{
				code: wrapReact(
					`<div className="B a D c"><span dataClass="h E g F">Test</span></div>`,
				),
				errors: [{ messageId: "incorrect-order" }, { messageId: "incorrect-order" }],
				name: "[Fix] Default order (multiple attributes) 2",
				options: [[{ attributes: ["className", "dataClass"] }]],
				output: wrapReact(
					`<div className="B D a c"><span dataClass="E F g h">Test</span></div>`,
				),
			},
			{
				code: wrapReact(`<div className="a-D-B-c" dataClass="F h  g E">text</div>`),
				errors: [{ messageId: "incorrect-order" }, { messageId: "incorrect-order" }],
				name: "[Fix] 2 different attributes with options",
				options: [
					[
						{ attributes: "className", separator: "-" },
						{ attributes: "dataClass", direction: "desc" },
					],
				],
				output: wrapReact(`<div className="B-D-a-c" dataClass="h g  F E">text</div>`),
			},
			{
				code: wrapReact(`<div className="D-a||c--B">text</div>`),
				errors: [{ messageId: "incorrect-order" }],
				name: "multiple separators",
				options: [[{ attributes: "className", separator: "/[-|]+/" }]],
				output: wrapReact(`<div className="B-D||a--c">text</div>`),
			},
		],
	} satisfies TSESLint.RunTests<SortAttributeContentMessagesId, [SortAttributeContentOptions]>;
};

for (const typescript of [false, true]) {
	const tests = getReactTests(typescript);
	const filename = `file.${typescript ? "t" : "j"}sx`;

	new RuleTester({
		parser: typescript && require.resolve("@typescript-eslint/parser"),
		parserOptions: {
			ecmaFeatures: {
				jsx: true,
			},
		},
	}).run(
		`[React ${typescript ? "t" : "j"}sx] ${SORT_ATTRIBUTE_CONTENT_NAME}`,
		sortAttributeContentRule,
		{
			invalid: tests.invalid.map(test => ({ ...test, filename })),
			valid: tests.valid.map(test => ({ ...test, filename })),
		},
	);
}
