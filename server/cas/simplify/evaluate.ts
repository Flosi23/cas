import type { RationalNumber } from "$cas/expressions/types/RNE";
import Int from "$cas/expressions/atomic/Int";
import Fraction from "$cas/expressions/compound/Fraction";
import { isInt } from "$cas/expressions/types";

export function evaluateDivision(
	dividend: RationalNumber,
	divisor: RationalNumber,
): Fraction {
	dividend = isInt(dividend) ? new Fraction(dividend, new Int(1)) : dividend;
	divisor = isInt(divisor) ? new Fraction(divisor, new Int(1)) : divisor;

	return new Fraction(
		new Int(dividend.numerator().value * divisor.denominator().value),
		new Int(dividend.denominator().value * divisor.numerator().value),
	);
}

export function evaluateMultiplication(
	factorOne: RationalNumber,
	factorTwo: RationalNumber,
): Fraction {
	factorOne = isInt(factorOne)
		? new Fraction(factorOne, new Int(1))
		: factorOne;
	factorTwo = isInt(factorTwo)
		? new Fraction(factorTwo, new Int(1))
		: factorTwo;

	return new Fraction(
		new Int(factorOne.numerator().value * factorTwo.numerator().value),
		new Int(factorOne.denominator().value * factorTwo.denominator().value),
	);
}

export function 
