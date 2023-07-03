import * as console from "console";
import { Rule } from "eslint";

export const SORT_ATTRIBUTE_CONTENT_NAME = "sort-attribute-content";

export const sortAttributeContentRule: Rule.RuleModule = {
	create(context: Rule.RuleContext): Rule.RuleListener {
		// TODO
		console.log(context);
		throw new Error("Not implemented yet");
	},
	meta: {
		docs: {}
	},
	schema: {
		// TODO
	}
};
