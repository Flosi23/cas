import type DisplayExpression from "./DisplayExpression";

export interface FrontendExpression {
	xUnits: number;
	yUnits: number;
	children: FrontendExpression[];
	displayValue: string;
}

export function toFrontExpr(dExpr: DisplayExpression): FrontendExpression {
	const { xUnits, yUnits, displayValue } = dExpr;
	const children = dExpr.children.map((child) => toFrontExpr(child));
	return { children, displayValue, xUnits, yUnits };
}
