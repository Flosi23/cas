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

	public xUnits = 0;

	public yUnits = 0;

	public parent: DisplayExpression | null;

	public children: DisplayExpression[] = [];

	constructor(displayValue: string, parent: DisplayExpression | null) {
		this.displayValue = displayValue;
		this.parent = parent;
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

export function exprToDisplayExpr(
	expr: Expression,
	parent: DisplayExpression | null = null,
): DisplayExpression {
	const dExpr = new DisplayExpression(getDisplayValue(expr), parent);
	dExpr.children = expr.children.map((child) =>
		exprToDisplayExpr(child, dExpr),
	);
	return dExpr;
}
