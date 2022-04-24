import { Expression, GenericExpression } from "../Expression";
import { ExprType, isSymbol } from "../types";

export default class Symbol extends GenericExpression<never> {
	public readonly type: ExprType = ExprType.Symbol;

	public value: string;

	constructor(value: string) {
		super();
		this.value = value;
	}

	override equals(expr: Expression | undefined): boolean {
		if (isSymbol(expr) && expr.value === this.value) {
			return true;
		}
		return false;
	}
}
