import type { Expression } from "../Expression";
import type { RationalNumber } from "../types/RNE";
import { ExprType } from "$cas/expressions/types";
import BinaryOperator from "../BinaryOperator";
import Int from "../atomic/Int";

export default class Division<
	Dividend extends Expression = Expression,
	Divisor extends Expression = Expression,
> extends BinaryOperator<Dividend, Divisor> {
	public readonly type: ExprType = ExprType.Division;

	/**
	 * Returns the dividend of the division. By convention, the
	 * dividend is the first operand
	 */
	public dividend(): Dividend | undefined {
		return this.operands[0];
	}

	/**
	 * Returns the divisor of the division. By convention, the
	 * divisor is the second operand
	 */
	public divisor(): Divisor | undefined {
		return this.operands[1];
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
