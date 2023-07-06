import { AttributeNode, AttributeValueNode, TokenTypes } from "es-html-parser";
import { Rule } from "eslint";

import { sortAttributeContentMessages } from "./sort-attribute-content.messages";
import {
	getOptionsWithDefaults,
	SortAttributeContentOptions
} from "./sort-attribute-content.options";
import schema from "./sort-attribute-content.options.schema.json";

export const sortAttributeContentRule: Rule.RuleModule = {
	create(context: Rule.RuleContext): Rule.RuleListener {
		const ruleOptions = getOptionsWithDefaults(
			(context.options as [SortAttributeContentOptions])[0]
		);

		/**
		 * @param content The attribute value
		 * @param options The sort options
		 * @param nodeInfo Information about the node
		 */
		function checkRule(
			content: string,
			options: Omit<(typeof ruleOptions)[number], "attributes">,
			nodeInfo: Pick<AttributeNode, "loc" | "range"> & { attribute: string }
		) {
			// TODO
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
		messages: sortAttributeContentMessages
	},
	schema: [schema]
};
