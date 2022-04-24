import type { Expression } from "../Expression";
import BinaryOperator from "../BinaryOperator";
import { ExprType } from "../types";

export default class Power<
	Base extends Expression = Expression,
	Exponent extends Expression = Expression,
> extends BinaryOperator<Base | Exponent> {
	public readonly type: ExprType = ExprType.Power;

	constructor(base: Base, exponent: Exponent) {
		super([base, exponent]);
	}

	/**
	 * Returns the base of the Power. By convention, the base
	 * is the first operand
	 */
	public base(): Base | undefined {
		return this.operands[0] as Base | undefined;
	}

	/**
	 * Returns the exponent of the Power. By convention, the exponent
	 * is the second operand
	 */
	public exponent(): Exponent | undefined {
		return this.operands[1] as Exponent | undefined;
	}
}
