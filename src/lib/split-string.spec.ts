import { splitString, SplitStringPart } from "./split-string";

describe("splitString", () => {
	it("should work", () => {
		for (const [string, regexp, expected] of [
			[
				"a-b-",
				/-/g,
				[
					{ content: "a", index: 0, separator: false },
					{ content: "-", index: 1, separator: true },
					{ content: "b", index: 2, separator: false },
					{ content: "-", index: 3, separator: true }
				]
			],
			[
				"a-b",
				/-/g,
				[
					{ content: "a", index: 0, separator: false },
					{ content: "-", index: 1, separator: true },
					{ content: "b", index: 2, separator: false }
				]
			],
			[
				"a|b-",
				/[\|-]/g,
				[
					{ content: "a", index: 0, separator: false },
					{ content: "|", index: 1, separator: true },
					{ content: "b", index: 2, separator: false },
					{ content: "-", index: 3, separator: true }
				]
			],
			[
				"a--bc-",
				/-+/g,
				[
					{ content: "a", index: 0, separator: false },
					{ content: "--", index: 1, separator: true },
					{ content: "bc", index: 3, separator: false },
					{ content: "-", index: 5, separator: true }
				]
			]
		] satisfies Array<[string, RegExp, SplitStringPart[]]>) {
			expect(splitString(string, regexp)).toStrictEqual(expected);
		}
	});
});
