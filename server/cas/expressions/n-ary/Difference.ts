import type { Expression } from "../Expression";
import Operator from "../Operator";
import Int from "../atomic/Int";
import { ExprType } from "../types";

export default class Difference<
	Operand extends Expression = Expression,
> extends Operator<Operand> {
	public readonly type = ExprType.Difference;

	base(): Expression | undefined {
		return this;
	}

	// eslint-disable-next-line class-methods-use-this
	exponent(): Expression | undefined {
		return new Int(1);
	}
}
