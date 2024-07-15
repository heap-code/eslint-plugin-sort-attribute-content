interface MessagesParameter {
	"incorrect-order": { after: string; attribute: string; previous: string };
}

/** The possible message ids */
export type SortAttributeContentMessagesId = keyof MessagesParameter;

export const sortAttributeContentMessages = {
	"incorrect-order": `Expected content of the attribute '{{${
		"attribute" satisfies keyof MessagesParameter["incorrect-order"]
	}}}' to be in sorted order. \`{{${
		"after" satisfies keyof MessagesParameter["incorrect-order"]
	}}}\` should be before \`{{${
		"previous" satisfies keyof MessagesParameter["incorrect-order"]
	}}}\`.`,
} as const satisfies Record<SortAttributeContentMessagesId, string>;

export type SortAttributeContentMessageParams<Id extends SortAttributeContentMessagesId> =
	MessagesParameter[Id];
