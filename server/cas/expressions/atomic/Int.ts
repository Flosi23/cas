import { Expression, GenericExpression } from "../Expression";
import { ExprType, isInt } from "../types";

export default class Int extends GenericExpression<never> {
	public readonly type: ExprType = ExprType.Int;

	public value: number;

	constructor(value: number) {
		super();
		this.value = value;
	}

	override equals(expr: Expression | undefined): boolean {
		if (isInt(expr) && expr.value === this.value) {
			return true;
		}
		return false;
	}

	public base(): Expression | undefined {
		return this;
	}

	// eslint-disable-next-line class-methods-use-this
	public exponent(): Expression | undefined {
		return new Int(1);
	}
}
