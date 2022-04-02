import type Expression from "$cas/expressions/Expression";
import { isInt } from "$cas/expressions/atomic/Integer";
import { isSymbol } from "$cas/expressions/atomic/Symbol";
import { isAdd } from "$cas/expressions/compound/Add";
import { isDiv } from "$cas/expressions/compound/Div";
import { isMul } from "$cas/expressions/compound/Mul";
import { isPower } from "$cas/expressions/compound/Power";
import { isSub } from "$cas/expressions/compound/Sub";

export default class DisplayExpression {
	public displayValue: string;

	public xUnits: number;

	public yUnits: number;

	public children: DisplayExpression[];

	constructor(displayValue: string) {
		this.displayValue = displayValue;
		this.children = [];
		this.xUnits = 0;
		this.yUnits = 0;
	}
}

function getDisplayValue(expr: Expression): string {
	if (isInt(expr)) return expr.value.toString();
	if (isSymbol(expr)) return expr.value;
	if (isAdd(expr)) return "+";
	if (isSub(expr)) return "-";
	if (isDiv(expr)) return "/";
	if (isMul(expr)) return "*";
	if (isPower(expr)) return "^";
	return "";
}

export function exprToDisplayExpr(expr: Expression): DisplayExpression {
	const dExpr = new DisplayExpression(getDisplayValue(expr));
	dExpr.children = expr.children.map((child) => exprToDisplayExpr(child));
	return dExpr;
}
