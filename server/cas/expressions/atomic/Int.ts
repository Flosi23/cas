import Expression from "../Expression";
import ExprType, { isInt } from "../types";

export default class Int extends Expression {
	public value: number;

	public type = ExprType.Int;

	constructor(value: number) {
		super();
		this.value = value;
	}

	override equals(expr: Expression | undefined): boolean {
		if (!expr) {
			return false;
		}

		if (isInt(expr) && expr.value !== this.value) {
			return false;
		}
		return super.equals(expr);
	}
}
