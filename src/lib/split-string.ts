/** Results when splitting a string */
export interface SplitStringPart {
	/** The content part, either a separator or an included string */
	content: string;
	/** The start index from the initial string */
	index: number;
	/** Is the chunk a separator? */
	separator: boolean;
}

/**
 * Splits a string with a RegExp and returns information about all the split parts
 *
 * @param string the content to split
 * @param regexp the RegExp to split the given string
 * @returns An array of split parts
 */
export function splitString(string: string, regexp: RegExp): SplitStringPart[] {
	const splitParts = (matches: RegExpMatchArray[], index: number): SplitStringPart[] => {
		if (!matches.length) {
			// No more matches, can have a remaining string
			return index < string.length
				? [{ content: string.slice(index), index, separator: false }]
				: [];
		}

		const [match, ...rest] = matches;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Does not seem to be undefined
		const matchIndex = match.index!;

		if (matchIndex === index) {
			const [content] = match;
			return [
				{ content, index, separator: true },
				// The next index is the end of the string or the end of the separator
				...splitParts(rest, index + content.length),
			];
		}

		// Not a separator, get the next separator
		const content = string.slice(index, matchIndex);
		return [{ content, index, separator: false }, ...splitParts(matches, matchIndex)];
	};

	return splitParts(Array.from(string.matchAll(regexp)), 0);
}
