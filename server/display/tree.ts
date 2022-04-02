import type Expression from "$cas/expressions/Expression";
import type DisplayExpression from "./DisplayExpression";
import { exprToDisplayExpr } from "./DisplayExpression";
import { FrontendExpression, toFrontExpr } from "./FrontendExpression";

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

export function calcTreeSpacing(expr: Expression): FrontendExpression {
	const dExpr = exprToDisplayExpr(expr);

	return toFrontExpr(dExpr);
}
