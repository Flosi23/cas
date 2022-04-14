import type Expression from "$cas/expressions/Expression";
import { isInt } from "$cas/expressions/atomic/Integer";
import { isSymbol } from "$cas/expressions/atomic/Symbol";
import { isAdd } from "$cas/expressions/compound/Add";
import { isDiv } from "$cas/expressions/compound/Div";
import { isMul } from "$cas/expressions/compound/Mul";
import { isPower } from "$cas/expressions/compound/Power";
import { isSub } from "$cas/expressions/compound/Sub";

export default class ExpressionTree {
	public displayValue: string;

	public xUnits = 0;

	public yUnits = 0;

	public parent: ExpressionTree | null;

	public children: ExpressionTree[] = [];

	constructor(displayValue: string, parent: ExpressionTree | null) {
		this.displayValue = displayValue;
		this.parent = parent;
	}

	shift(x: number) {
		this.xUnits += x;
		this.children.forEach((child) => child.shift(x));
	}

	getRow(row: number, depth = 0): ExpressionTree[] {
		if (row === depth) {
			return [this];
		}
		const newDepth = depth + 1;
		return this.children.flatMap((child) => child.getRow(row, newDepth));
	}

	getMaxDepth(depth = 0): number {
		if (this.children.length === 0) {
			return depth;
		}
		const newDepth = depth + 1;
		return Math.max(
			...this.children.map((child) => child.getMaxDepth(newDepth)),
		);
	}

	setDefaultCoordinates() {
		for (let i = 0; i <= this.getMaxDepth(); i += 1) {
			const row = this.getRow(i);

			for (let j = 0; j < row.length; j += 1) {
				row[j]!.xUnits = j;
				row[j]!.yUnits = i;
			}
		}
	}

	center() {
		this.shift(0 - this.xUnits);
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
	parent: ExpressionTree | null = null,
): ExpressionTree {
	const dExpr = new ExpressionTree(getDisplayValue(expr), parent);
	dExpr.children = expr.children.map((child) =>
		exprToDisplayExpr(child, dExpr),
	);
	return dExpr;
}
