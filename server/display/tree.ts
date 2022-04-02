import type DisplayExpression from "./DisplayExpression";

export function getRow(
	expr: DisplayExpression,
	row: number,
	depth = 0,
): DisplayExpression[] {
	if (row === depth) {
		return [expr];
	}
	const newDepth = depth + 1;
	return expr.children.flatMap((child) => getRow(child, row, newDepth));
}
