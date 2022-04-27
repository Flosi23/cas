import type { RnExpression } from "../RnExpression/types";
import { Expression, GenericExpression } from "../Expression";
// eslint-disable-next-line import/no-cycle
import Fraction from "../binary/Fraction";
import { ExprType, isInt, RationalNumber } from "../types";

export default class Int
	extends GenericExpression<never>
	implements RnExpression, RationalNumber
{
	public readonly type: ExprType = ExprType.Int;

	public value: number;

	constructor(value: number) {
		super();
		this.value = value;
	}

	override equals(expr: Expression | undefined): boolean {
		if (isInt(expr) && expr.value === this.value) {
			return true;
		}
		return false;
	}

	public evaluate(): RationalNumber | undefined {
		return this;
	}

	public simplify(): RationalNumber {
		return this;
	}

	public toFraction(): Fraction {
		return new Fraction(this, new Int(1));
	}
}
