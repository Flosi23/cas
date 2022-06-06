import Int from "$cas/expressions/atomic/Int";
import Symbol from "$cas/expressions/atomic/Symbol";
import Fraction from "$cas/expressions/binary/Fraction";
import Sum from "$cas/expressions/n-ary/Sum";
import parseExpression from "$cas/parse";

test("Integers 2 and 2 --> equal", () =>
	expect(new Int(2).equals(new Int(2))).toBe(true));

test("Integers 2 and -1 --> not equal", () =>
	expect(new Int(2).equals(new Int(-1))).toBe(false));

test("Symbol a and a --> equal", () =>
	expect(new Symbol("a").equals(new Symbol("a"))).toBe(true));

test("Symbol a and x --> not equal", () =>
	expect(new Symbol("a").equals(new Symbol("x"))).toBe(false));

test("Expressions of different type --> not equal", () => {
	const sum = parseExpression("2-1");
	const int = parseExpression("6");

	return expect(sum.equals(int)).toBe(false);
});

test("Expressions with different operands --> not equal", () => {
	const sumOne = parseExpression("3+5");
	const sumTwo = parseExpression("4+5");

	return expect(sumOne.equals(sumTwo)).toBe(false);
});

test("Expression with same operands in different order --> not equal", () => {
	const sumOne = parseExpression("3/2");
	const sumTwo = parseExpression("2/3");

	return expect(sumOne.equals(sumTwo)).toBe(false);
});

test("Expression to be compared with has more operands --> not equal", () => {
	const sumOne = new Sum([new Int(2), new Int(4), new Int(1)]);
	const sumTwo = new Sum([new Int(2), new Int(4)]);

	return expect(sumTwo.equals(sumOne)).toBe(false);
});

test("Expression to be compared with has less operands --> not equal", () => {
	const sumOne = new Sum([new Int(2), new Int(4), new Int(1)]);
	const sumTwo = new Sum([new Int(2), new Int(4)]);

	return expect(sumOne.equals(sumTwo)).toBe(false);
});

test("Expression has the same structure --> equal", () => {
	const powerOne = parseExpression("(2+4)^(2-3*x)");
	const powerTwo = parseExpression("(2+4)^(2-3*x)");

	return expect(powerOne.equals(powerTwo)).toBe(true);
});

test("Two fractions --> 4/3 = 4/3", () => {
	const fractionOne = new Fraction(new Int(4), new Int(3));
	const fractionTwo = new Fraction(new Int(4), new Int(3));

	return expect(fractionOne.equals(fractionTwo)).toBe(true);
});

export {};
