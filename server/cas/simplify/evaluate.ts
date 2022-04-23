import Int from "$cas/expressions/atomic/Int";
import Fraction from "$cas/expressions/compound/Fraction";
import { isPositiveInt, RationalNumber, isInt } from "$cas/expressions/types";

export function divide(
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

export function multiply(
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

export function add(
	addendOne: RationalNumber,
	addendTwo: RationalNumber,
): Fraction {
	addendOne = isInt(addendOne)
		? new Fraction(addendOne, new Int(1))
		: addendOne;
	addendTwo = isInt(addendTwo)
		? new Fraction(addendTwo, new Int(1))
		: addendTwo;

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
	subtrahend = isInt(subtrahend)
		? new Fraction(subtrahend, new Int(1))
		: subtrahend;

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
	base = isInt(base) ? new Fraction(base, new Int(1)) : base;

	if (!isPositiveInt(exponent)) {
		return undefined;
	}

	return new Fraction(
		new Int(base.numerator().value ** exponent.value),
		new Int(base.denominator().value ** exponent.value),
	);
}
