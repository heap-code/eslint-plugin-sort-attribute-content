/**
 * A single Option for one or many attributes
 */
export interface SortAttributeContentOption {
	/**
	 * The attribute name(s) on which this option is applied.
	 */
	attributes: string[] | string;
	/**
	 * If true, enforce properties to be in case-sensitive order.
	 *
	 * @default true
	 */
	caseSensitive?: boolean;
	/**
	 * Specify the direction of the ordering.
	 *
	 * @default "asc"
	 */
	direction?: "asc" | "desc";
	/**
	 * The separator used to split the attribute content.
	 *
	 * It uses a RegExp if it starts and ends with a `/`.
	 * Otherwise, it is only the single provided value
	 *
	 * @default "/\s+/"
	 */
	separator?: string;
}

/**
 * The ESLint options
 */
export type SortAttributeContentOptions = SortAttributeContentOption[];

/**
 * @param options the raw ESLint options
 * @returns the options with default values
 */
export function getOptionsWithDefaults(options: SortAttributeContentOption[]) {
	return options.map(
		({ attributes, ...option }) =>
			({
				caseSensitive: true,
				direction: "asc",
				separator: "/\\s+/",
				...option,
				attributes: Array.isArray(attributes) ? attributes : [attributes]
			} as const satisfies SortAttributeContentOption)
	);
}
