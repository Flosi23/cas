import type Expression from "$cas/expressions/Expression";

export default class DisplayExpression {
	public displayValue: string;

	public children: DisplayExpression[];

	constructor(displayValue: string, children: DisplayExpression[]) {
		this.displayValue = displayValue;
		this.children = children;
	}
}

export function exprToDisplayExpr(expr: Expression) {
    
}
