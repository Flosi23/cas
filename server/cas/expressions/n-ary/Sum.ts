import type { Expression } from "../Expression";
import { ExprType } from "$cas/expressions/types";
import Operator from "../Operator";
import Int from "../atomic/Int";

export default class Sum<
	Operand extends Expression = Expression,
> extends Operator<Operand> {
	public readonly type = ExprType.Sum;

	base(): Expression | undefined {
		return this;
	}

	// eslint-disable-next-line class-methods-use-this
	exponent(): Expression | undefined {
		return new Int(1);
	}
}
