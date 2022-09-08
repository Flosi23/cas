import type { RationalNumber } from "$cas/expressions/types/RNE";
import Int from "$cas/expressions/atomic/Int";
import Fraction from "$cas/expressions/binary/Fraction";
import { isInt } from "$cas/expressions/types";

export function simplifyRationalNumber(
	number: RationalNumber,
): RationalNumber | undefined {
	if (isInt(number)) {
		return number;
	}

	const numerator = number.numerator().value;
	const denominator = number.denominator().value;

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

function greatestCommonDivisor(a: number, b: number): number {
	if (b === 0) {
		return a;
	}

	return greatestCommonDivisor(b, a % b);
}
