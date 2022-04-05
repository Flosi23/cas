import type ExpressionTree from "./ExpressionTree";

export default interface FrontendExpressionTree {
	xUnits: number;
	yUnits: number;
	children: FrontendExpressionTree[];
	displayValue: string;
}

export function toFrontExpr(dExpr: ExpressionTree): FrontendExpressionTree {
	const { xUnits, yUnits, displayValue } = dExpr;
	const children = dExpr.children.map((child) => toFrontExpr(child));
	return { children, displayValue, xUnits, yUnits };
}
