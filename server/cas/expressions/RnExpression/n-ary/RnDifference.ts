import type { RNE, RnExpression } from "../types";
import Difference from "$cas/expressions/n-ary/Difference";
import { isInt, RationalNumber } from "$cas/expressions/types";

export default class RnDifference
	extends Difference<RnExpression>
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

	evaluate(): RationalNumber | undefined {
		const result: RationalNumber;

		if (this.operands.length === 1) {
			const operand = this.operands[0].evaluate();

			if (!operand) {
				return undefined;
			}

			// new RnProduct().evaluate();
		} else {
			let minuend = this.operands[0].evaluate();
			let subtrahend = this.operands[1].evaluate();

			if (!minuend || !subtrahend) {
				return undefined;
			}

			minuend = isInt(minuend) ? minuend.toFraction() : minuend;
			subtrahend = isInt(subtrahend)
				? subtrahend.toFraction()
				: subtrahend;

			// return new Add
		}
	}
}
