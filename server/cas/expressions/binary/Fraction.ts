import type { Expression } from "../Expression";
import type { RationalNumber } from "../types/RNE";
import BinaryOperator from "../BinaryOperator";
import Int from "../atomic/Int";
import { ExprType } from "../types";

export default class Fraction extends BinaryOperator<Int, Int> {
	public readonly type = ExprType.Fraction;

	/**
	 * Returns the numerator of the fraction. By convention,
	 * this is the first operand
	 */
	public numerator(): Int {
		return this.operands[0]!;
	}

	/**
	 * Returns the denominator of the fraction. By convention,
	 * this is the second operand
	 */
	public denominator(): Int {
		return this.operands[1]!;
	}

	public base(): Expression | undefined {
		return this;
	}

	// eslint-disable-next-line class-methods-use-this
	public exponent(): Expression | undefined {
		return new Int(1);
	}

	// eslint-disable-next-line class-methods-use-this
	public factor(): RationalNumber {
		return new Int(1);
	}

	public rest(): Expression | undefined {
		return this;
	}
}
