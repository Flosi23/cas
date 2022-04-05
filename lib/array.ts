/**
 * Function groups the elements in an array based on their common attributes
 * (the attribute needs to be specified).
 * Returns a new array where each group is an array in the array
 *
 * @param list the list to be grouped
 * @param getKey returns the attribute used to group the elements
 * @returns The groups as arrays in an array
 */
export const groupByToArray = <T, K>(list: T[], getKey: (item: T) => K) =>
	list.reduce((previous, currentItem) => {
		const groupIndex = previous.findIndex(
			(group) => group[0] && getKey(group[0]) === getKey(currentItem),
		);

		if (groupIndex !== -1) previous[groupIndex]?.push(currentItem);
		else previous.push([currentItem]);

		return previous;
	}, [] as T[][]);
