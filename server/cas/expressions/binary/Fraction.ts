import type Int from "../atomic/Int";
import BinaryOperator from "../BinaryOperator";
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
}
