import ExprType, { isInt } from "../ExprType";
import Expression from "../Expression";

export default class Int extends Expression {
	public value: number;

	public type = ExprType.Int;

	constructor(value: number) {
		super();
		this.value = value;
	}

	override equals(expr: Expression): boolean {
		if (isInt(expr) && expr.value !== this.value) {
			return false;
		}
		return super.equals(expr);
	}
}
