import ExprType from "../ExprType";
import Expression from "../Expression";

export default class Integer extends Expression {
	public value: number;

	public type = ExprType.Int;

	constructor(value: number) {
		super();
		this.value = value;
	}
}

export function isInt(expr: Expression): expr is Integer {
	return expr.type === ExprType.Int;
}
