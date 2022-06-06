import Int from "$cas/expressions/atomic/Int";
import Fraction from "$cas/expressions/binary/Fraction";
import {
	add,
	divide,
	exponentiate,
	multiply,
	subtract,
} from "$cas/simplify/evaluate";

describe("Divide", () => {
	test("2/3 : 4/5 --> 10/12", () => {
		const dividend = new Fraction(new Int(2), new Int(3));
		const divisor = new Fraction(new Int(4), new Int(5));

		const expected = new Fraction(new Int(10), new Int(12));
		const result = divide(dividend, divisor);

		return expect(expected.equals(result)).toBe(true);
	});
	test("4 : 5 --> 4/5", () => {
		const dividend = new Int(4);
		const divisor = new Int(5);

		const expected = new Fraction(new Int(4), new Int(5));
		const result = divide(dividend, divisor);

		return expect(expected.equals(result)).toBe(true);
	});
});
describe("Multiply", () => {
	test("-2/3 * 2", () => {
		const factorOne = new Fraction(new Int(-2), new Int(3));
		const factorTwo = new Int(2);

		const expected = new Fraction(new Int(-4), new Int(3));
		const result = multiply(factorOne, factorTwo);

		return expect(expected.equals(result)).toBe(true);
	});
});
describe("Add", () => {
	test("4/5 + 7/2 = 43/10", () => {
		const addendOne = new Fraction(new Int(4), new Int(5));
		const addendTwo = new Fraction(new Int(7), new Int(2));

		const expected = new Fraction(new Int(43), new Int(10));
		const result = add(addendOne, addendTwo);

		return expect(expected.equals(result)).toBe(true);
	});
});
describe("Subtract", () => {
	test("3/4 - 1/2 = 2/8", () => {
		const minuend = new Fraction(new Int(3), new Int(4));
		const subtrahend = new Fraction(new Int(1), new Int(2));

		const expected = new Fraction(new Int(2), new Int(8));
		const result = subtract(minuend, subtrahend);

		return expect(expected.equals(result)).toBe(true);
	});
});
describe("Exponentiate (Power)", () => {
	test("3/2 ^ 3", () => {
		const base = new Fraction(new Int(3), new Int(2));
		const exponent = new Int(3);

		const expected = new Fraction(new Int(27), new Int(8));
		const result = exponentiate(base, exponent);

		return expect(expected.equals(result)).toBe(true);
	});
	test("1/9 ^ -4", () => {
		const base = new Fraction(new Int(1), new Int(9));
		const exponent = new Int(-4);

		return expect(exponentiate(base, exponent)).toBe(undefined);
	});
});
