import Int from "$cas/expressions/atomic/Int";
import Fraction from "$cas/expressions/binary/Fraction";
import { isPositiveInt, RationalNumber, isInt } from "$cas/expressions/types";

function toFraction(rn: RationalNumber): Fraction {
	if (isInt(rn)) {
		return new Fraction(rn, new Int(1));
	}
	return rn;
}

export function divide(
	dividend: RationalNumber,
	divisor: RationalNumber,
): Fraction {
	dividend = toFraction(dividend);
	divisor = toFraction(divisor);

	return new Fraction(
		new Int(dividend.numerator().value * divisor.denominator().value),
		new Int(dividend.denominator().value * divisor.numerator().value),
	);
}

export function multiply(
	factorOne: RationalNumber,
	factorTwo: RationalNumber,
): Fraction {
	factorOne = toFraction(factorOne);
	factorTwo = toFraction(factorTwo);

	return new Fraction(
		new Int(factorOne.numerator().value * factorTwo.numerator().value),
		new Int(factorOne.denominator().value * factorTwo.denominator().value),
	);
}

export function add(
	addendOne: RationalNumber,
	addendTwo: RationalNumber,
): Fraction {
	addendOne = toFraction(addendOne);
	addendTwo = toFraction(addendTwo);

	return new Fraction(
		new Int(
			addendOne.numerator().value * addendTwo.denominator().value +
				addendTwo.numerator().value * addendOne.denominator().value,
		),
		new Int(addendOne.denominator().value * addendTwo.denominator().value),
	);
}

export function subtract(
	minuend: RationalNumber,
	subtrahend: RationalNumber,
): Fraction {
	subtrahend = toFraction(subtrahend);

	return add(
		minuend,
		new Fraction(
			new Int(subtrahend.numerator().value * -1),
			subtrahend.denominator(),
		),
	);
}

export function exponentiate(
	base: RationalNumber,
	exponent: Int,
): Fraction | undefined {
	base = toFraction(base);

	if (!isPositiveInt(exponent)) {
		return undefined;
	}

	return new Fraction(
		new Int(base.numerator().value ** exponent.value),
		new Int(base.denominator().value ** exponent.value),
	);
}
