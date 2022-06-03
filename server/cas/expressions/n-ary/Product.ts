import type { Expression } from "../Expression";
import { ExprType } from "$cas/expressions/types";

import Operator from "../Operator";
import Int from "../atomic/Int";
import { isRationalNumber, RationalNumber } from "../types/RNE";

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

	public factor(): RationalNumber {
		const firstOperand = this.operands[0];

		if (isRationalNumber(firstOperand)) {
			return firstOperand;
		}

		return new Int(1);
	}

	public rest(): Expression | undefined {
		const firstOperand = this.operands[0];

		if (isRationalNumber(firstOperand)) {
			if (this.operands.length === 2) {
				return this.operands[1];
			}

			return new Product(this.operands.slice(1));
		}

		return this;
	}
}
