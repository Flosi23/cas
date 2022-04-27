import type { RationalNumber } from "$cas/expressions/types";
import type { RnExpression } from "../types";
import Int from "$cas/expressions/atomic/Int";
import Fraction from "$cas/expressions/binary/Fraction";
import Product from "$cas/expressions/n-ary/Product";

export default class RnProduct
	extends Product<RnExpression>
	implements RnExpression
{
	protected override _operands: [RnExpression] | [RnExpression, RnExpression];

	override get operands():
		| readonly [RnExpression]
		| [RnExpression, RnExpression] {
		return this._operands;
	}

	constructor(operands: [RnExpression] | [RnExpression, RnExpression]) {
		super(operands);
		this._operands = operands;
	}

	public evaluate(): RationalNumber | undefined {
		if (this.operands.length === 1) {
			return this.operands[0].evaluate()?.simplify();
		}
		if (this.operands.length === 2) {
			const fracOne = this.operands[0].evaluate()?.toFraction();
			const fracTwo = this.operands[1].evaluate()?.toFraction();

			if (!fracOne || !fracTwo) {
				return undefined;
			}

			return new Fraction(
				new Int(fracOne.numerator().value * fracTwo.numerator().value),
				new Int(
					fracOne.denominator().value * fracTwo.denominator().value,
				),
			).simplify();
		}
		return undefined;
	}
}

const product = new Product([new Int(2)]);

function isRnProduct(product: Product): product is RnProduct {
	return true;
}
