import type { Expression } from "../Expression";
import { ExprType } from "$cas/expressions/types";
import BinaryOperator from "../BinaryOperator";

export default class Division<
	Dividend extends Expression = Expression,
	Divisor extends Expression = Expression,
> extends BinaryOperator<Dividend | Divisor> {
	public readonly type: ExprType = ExprType.Division;

	constructor(dividend: Dividend, divisor: Divisor) {
		super([dividend, divisor]);
	}

	/**
	 * Returns the dividend of the division. By convention, the
	 * dividend is the first operand
	 */
	public dividend(): Dividend | undefined {
		return this.operands[0] as Dividend | undefined;
	}

	/**
	 * Returns the divisor of the division. By convention, the
	 * divisor is the second operand
	 */
	public divisor(): Divisor | undefined {
		return this.operands[1] as Divisor | undefined;
	}
}
