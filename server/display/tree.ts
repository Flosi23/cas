import type Expression from "$cas/expressions/Expression";
import { exprToDisplayExpr } from "./DisplayExpression";
import { FrontendExpression, toFrontExpr } from "./FrontendExpression";

export function calcTreeSpacing(expr: Expression): FrontendExpression {
	const dExpr = exprToDisplayExpr(expr);

	dExpr.setDefaultCoordinates();

	for (let i = 0; i <= dExpr.getMaxDepth(); i += 1) {
		const row = dExpr.getRow(i);

		for (let j = 0; j < row.length; j++) {
			// get father of group
		}
	}

	return toFrontExpr(dExpr);
}
