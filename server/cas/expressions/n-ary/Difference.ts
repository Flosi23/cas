import type { Expression } from "../Expression";
import type { RationalNumber } from "../types/RNE";
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

	// eslint-disable-next-line class-methods-use-this
	public factor(): RationalNumber {
		return new Int(1);
	}

	public rest(): Expression | undefined {
		return this;
	}
}
