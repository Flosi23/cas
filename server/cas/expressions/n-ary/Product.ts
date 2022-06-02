import type { Expression } from "../Expression";
import { ExprType } from "$cas/expressions/types";

import Operator from "../Operator";
import Int from "../atomic/Int";

export default class Product<
	Operand extends Expression = Expression,
> extends Operator<Operand> {
	public readonly type = ExprType.Product;

	base(): Expression | undefined {
		return this;
	}

	// eslint-disable-next-line class-methods-use-this
	public exponent(): Expression | undefined {
		return new Int(1);
	}
}
