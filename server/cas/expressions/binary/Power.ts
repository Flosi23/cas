import type { Expression } from "../Expression";
import type { RationalNumber } from "../types/RNE";
import BinaryOperator from "../BinaryOperator";
import Int from "../atomic/Int";
import { ExprType } from "../types";

export default class Power<
	Base extends Expression = Expression,
	Exponent extends Expression = Expression,
> extends BinaryOperator<Base, Exponent> {
	public readonly type: ExprType = ExprType.Power;

	/**
	 * Returns the base of the Power. By convention, the base
	 * is the first operand
	 */
	public base(): Base | undefined {
		return this.operands[0];
	}

	/**
	 * Returns the exponent of the Power. By convention, the exponent
	 * is the second operand
	 */
	public exponent(): Exponent | undefined {
		return this.operands[1];
	}

	// eslint-disable-next-line class-methods-use-this
	public factor(): RationalNumber {
		return new Int(1);
	}

	public rest(): Expression | undefined {
		return this;
	}
}
