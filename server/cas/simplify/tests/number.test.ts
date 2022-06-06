import Int from "$cas/expressions/atomic/Int";
import Fraction from "$cas/expressions/binary/Fraction";
import { simplifyRationalNumber } from "$cas/simplify/number";

test("Integers are not changed --> 7 = 7", () => {
	const int = new Int(7);
	const expected = new Int(7);
	const result = simplifyRationalNumber(int);

	expect(expected.equals(result)).toBe(true);
});
test("Fraction is simplified correctly (gcd) --> 12/9 = 4/3", () => {
	const fraction = new Fraction(new Int(12), new Int(9));
	const expected = new Fraction(new Int(4), new Int(3));
	const result = simplifyRationalNumber(fraction);

	expect(expected.equals(result)).toBe(true);
});
test("Fraction becomes integer --> 12/6 = 2", () => {
	const fraction = new Fraction(new Int(12), new Int(6));
	const expected = new Int(2);
	const result = simplifyRationalNumber(fraction);

	expect(expected.equals(result)).toBe(true);
});
test("Negative numerator and negative denominator become positive --> -4/-3 = 4/3", () => {
	const fraction = new Fraction(new Int(-4), new Int(-3));
	const expected = new Fraction(new Int(4), new Int(3));
	const result = simplifyRationalNumber(fraction);

	expect(expected.equals(result)).toBe(true);
});
test("Negative denominator becomes negative numerator --> 8/-6 = -4/3", () => {
	const fraction = new Fraction(new Int(8), new Int(-6));
	const expected = new Fraction(new Int(-4), new Int(3));
	const result = simplifyRationalNumber(fraction);

	expect(expected.equals(result)).toBe(true);
});
test("Negative numerator stays negative numerator --> -8/6 = -4/3", () => {
	const fraction = new Fraction(new Int(-8), new Int(6));
	const expected = new Fraction(new Int(-4), new Int(3));
	const result = simplifyRationalNumber(fraction);

	expect(expected.equals(result)).toBe(true);
});
