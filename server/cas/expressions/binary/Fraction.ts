import type { RnExpression } from "../RnExpression/types";
import BinaryOperator from "../BinaryOperator";
// eslint-disable-next-line import/no-cycle
import Int from "../atomic/Int";
import { ExprType, RationalNumber } from "../types";

export default class Fraction
	extends BinaryOperator<Int, Int>
	implements RnExpression, RationalNumber
{
	public readonly type = ExprType.Fraction;

	/**
	 * Returns the numerator of the fraction. By convention,
	 * this is the first operand
	 */
	public numerator(): Int {
		return this.operands[0]!;
	}

	/**
	 * Returns the denominator of the fraction. By convention,
	 * this is the second operand
	 */
	public denominator(): Int {
		return this.operands[1]!;
	}

	evaluate(): RationalNumber | undefined {
		return this;
	}

	toFraction(): Fraction {
		return this;
	}

	simplify(): RationalNumber | undefined {
		const numerator = this.numerator().value;
		const denominator = this.denominator().value;

		if (denominator === 0) {
			return undefined;
		}
		if (numerator === 0) {
			return new Int(0);
		}

		const gcd = greatestCommonDivisor(
			Math.abs(numerator),
			Math.abs(denominator),
		);

		const simpleFrac = new Fraction(
			new Int(Math.abs(numerator) / gcd),
			new Int(Math.abs(denominator) / gcd),
		);

		simpleFrac.numerator().value *= denominator * numerator < 0 ? -1 : 1;

		if (simpleFrac.denominator().value === 1) {
			return simpleFrac.numerator();
		}

		return simpleFrac;
	}
}

function greatestCommonDivisor(n1: number, n2: number): number {
	const a = Math.max(n1, n2);
	const b = Math.min(n1, n2);

	if (a === b) {
		return a;
	}

	return greatestCommonDivisor(a - b, b);
}
