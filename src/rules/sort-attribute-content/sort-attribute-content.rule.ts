import { AttributeNode, AttributeValueNode, TokenTypes } from "es-html-parser";
import { Rule } from "eslint";

import {
	SortAttributeContentMessageParams,
	sortAttributeContentMessages,
	SortAttributeContentMessagesId
} from "./sort-attribute-content.messages";
import {
	getOptionsWithDefaults,
	SortAttributeContentOptions
} from "./sort-attribute-content.options";
import schema from "./sort-attribute-content.options.schema.json";
import { splitString, SplitStringPart } from "../../lib/split-string";

export const sortAttributeContentRule: Rule.RuleModule = {
	create(context: Rule.RuleContext): Rule.RuleListener {
		// The comparator of values
		const comparator = (a: string, b: string) => {
			// `localCompare` messes with the upperCase
			if (a === b) {
				return 0;
			}

			return a < b ? -1 : 1;
		};

		/**
		 * @param string the string to escape
		 * @returns the escaped string
		 */
		const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

		/**
		 * @param regex the string
		 * @returns if the given string is a regex
		 */
		const isRegExpString = (regex: string) =>
			regex.length > 1 && [regex[0], regex[regex.length - 1]].every(char => char === "/");

		const ruleOptions = getOptionsWithDefaults(
			(context.options as [SortAttributeContentOptions])[0]
		);

		if (ruleOptions.length === 0) {
			throw new Error("There is no options defined for this rule.");
		}
		if (ruleOptions.some(({ attributes }) => attributes.length === 0)) {
			throw new Error("At least one of the options have no attributes");
		}
		if (ruleOptions.some(({ separator }) => separator.length === 0)) {
			throw new Error("At least one of the options have an empty separator");
		}

		/**
		 * @param content The attribute value
		 * @param options The sort options
		 * @param nodeInfo Information about the node
		 * @throws {Error} if an option is invalid
		 */
		function checkRule(
			content: string,
			options: Omit<(typeof ruleOptions)[number], "attributes">,
			nodeInfo: Pick<AttributeNode, "loc" | "range"> & { attribute: string }
		) {
			const { caseSensitive, direction, separator } = options;

			const parts = splitString(
				content,
				new RegExp(
					isRegExpString(separator) ? separator.slice(1, -1) : escapeRegExp(separator),
					"g"
				)
			).map((part, position) => ({ ...part, position }));

			if (parts.length < 3) {
				// Nothing to do if it's only a separator and a value
				return;
			}

			const sorter: typeof comparator =
				direction === "desc" ? (a, b) => comparator(b, a) : comparator;

			// The values to re-order if needed
			const values = parts.filter(({ separator }) => !separator);

			// The values to test the order against
			const toSort = caseSensitive
				? values
				: values.map(({ content, ...value }) => ({
						...value,
						content: content.toLowerCase()
				  }));

			// Look for the position on which the values are not sorted properly
			const diffIndex = toSort.findIndex(
				({ content }, i) => i !== 0 && sorter(content, toSort[i - 1].content) < 0
			);

			if (diffIndex > 0) {
				const { attribute, loc, range } = nodeInfo;

				const intruder = values[diffIndex];
				const startCol = loc.start.column + intruder.index;

				context.report({
					data: {
						after: intruder.content,
						attribute,
						previous: values[diffIndex - 1].content
					} satisfies SortAttributeContentMessageParams<"incorrect-order">,
					fix: fixer => {
						const constructFix = (
							parts: SplitStringPart[],
							sortedValues: string[]
						): string[] => {
							if (!parts.length) {
								return [];
							}

							const [part, ...rest] = parts;
							if (part.separator) {
								return [part.content, ...constructFix(rest, sortedValues)];
							}

							const [sorted, ...values] = sortedValues;
							return [sorted, ...constructFix(rest, values)];
						};

						return fixer.replaceTextRange(
							range,
							constructFix(
								parts,
								toSort
									.slice()
									.sort(({ content: a }, { content: b }) => sorter(a, b))
									.map(({ position }) => parts[position].content)
							).join("")
						);
					},
					loc: {
						end: { column: startCol + intruder.content.length, line: loc.end.line },
						start: { column: startCol, line: loc.start.line }
					},
					messageId: "incorrect-order" satisfies SortAttributeContentMessagesId
				});
			}
		}

		// if (isAngularParser) {
		// 	const { convertNodeSourceSpanToLoc } = context.parserServices as TemplateParserServices;
		//
		// 	// TODO: angular-parser
		// }

		// Default choice, use of the `@html-eslint/parser`. TODO: throw error if not set
		type HtmlNode<T, P = never> = T & { parent?: HtmlNode<P> };
		return {
			[TokenTypes.AttributeValue](nodeRaw: Rule.Node) {
				// Only to satisfy TS
				const node = nodeRaw as unknown as HtmlNode<AttributeValueNode, AttributeNode>;

				const attributeName = node.parent?.key.value;
				if (!attributeName) {
					return;
				}

				// Get an available option for the given attribute name
				const option = ruleOptions.find(({ attributes }) =>
					attributes.includes(attributeName)
				);
				if (option) {
					checkRule(node.value, option, {
						attribute: attributeName,
						...node
					});
				}
			}
		};
	},
	meta: {
		docs: {
			recommended: false
		},
		fixable: "code",
		messages: sortAttributeContentMessages,
		schema: [schema]
	},
	schema: [schema]
};
