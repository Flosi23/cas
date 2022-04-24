import Int from "$cas/expressions/atomic/Int";
import Fraction from "$cas/expressions/binary/Fraction";
import Power from "$cas/expressions/binary/Power";
import Difference from "$cas/expressions/n-ary/Difference";
import Product from "$cas/expressions/n-ary/Product";
import Sum from "$cas/expressions/n-ary/Sum";
import parseExpression from "$cas/parse";
import simplifyRNE from "../RNE";

test("Input Undefined --> undefined", () => {
	expect(simplifyRNE(undefined)).toBe(undefined);
});
describe("Fractions and Integers", () => {
	test("Are returned unchanged --> 5 = 5", () => {
		const int = new Int(5);
		const result = simplifyRNE(int);
		expect(int.equals(result)).toBe(true);
	});
	test("are simplified --> 4/2 = 2", () => {
		const fraction = new Fraction(new Int(4), new Int(2));

		const expected = new Int(2);
		const result = simplifyRNE(fraction);

		expect(expected.equals(result)).toBe(true);
	});
});
describe("Invalid inputs", () => {
	test("Negative exponent --> 2+3^-2 = undefined ", () => {
		const expr = new Power(parseExpression("2+3"), new Int(-2));

		expect(simplifyRNE(expr)).toBe(undefined);
	});
	test("Non integer exponent --> 2^3/4 = undefined", () => {
		const expr = new Power(
			new Int(2),
			new Fraction(new Int(3), new Int(4)),
		);

		expect(simplifyRNE(expr)).toBe(undefined);
	});
	test("Symbol in expression --> 2*x-3 = undefined", () => {
		const expr = parseExpression("2*x-3");

		expect(simplifyRNE(expr)).toBe(undefined);
	});
});
describe("Unary Expressions", () => {
	test("Difference --> -4+5 = -9", () => {
		const expr = new Difference([new Sum([new Int(4), new Int(5)])]);

		const expected = new Int(-9);
		const result = simplifyRNE(expr);

		expect(expected.equals(result)).toBe(true);
	});
	test("Sum --> 4/3 + 0 = 4/3 (x + 0 is an unary sum)", () => {
		const expr = new Sum([new Fraction(new Int(4), new Int(3))]);

		const expected = new Fraction(new Int(4), new Int(3));
		const result = simplifyRNE(expr);

		expect(expected.equals(result)).toBe(true);
	});
	test("Product --> 2 * 1 = 2 (x * 1 is an unary product)", () => {
		const expr = new Product([new Int(2)]);

		const expected = new Int(2);
		const result = simplifyRNE(expr);

		expect(expected.equals(result)).toBe(true);
	});
});
describe("Binary Expressions", () => {
	test("Sum --> 1/2 + 1 = 3/2", () => {
		const expr = new Sum([
			new Fraction(new Int(1), new Int(2)),
			new Int(1),
		]);

		const expected = new Fraction(new Int(3), new Int(2));
		const result = simplifyRNE(expr);

		expect(expected.equals(result)).toBe(true);
	});
	test("Division --> 4 / 5 = 4/5", () => {
		const expr = parseExpression("4/5");

		const expected = new Fraction(new Int(4), new Int(5));
		const result = simplifyRNE(expr);

		expect(expected.equals(result)).toBe(true);
	});
	test("Difference --> 12-3 = 9", () => {
		const expr = parseExpression("12-3");

		const expected = new Int(9);
		const result = simplifyRNE(expr);

		expect(expected.equals(result)).toBe(true);
	});
	test("Product --> 2/5*2 = 4/5", () => {
		const expr = new Product([
			new Fraction(new Int(2), new Int(5)),
			new Int(2),
		]);

		const expected = new Fraction(new Int(4), new Int(5));
		const result = simplifyRNE(expr);

		expect(expected.equals(result)).toBe(true);
	});
	test("Power --> 2^3 = 8", () => {
		const expr = parseExpression("2^3");

		const expected = new Int(8);
		const result = simplifyRNE(expr);

		expect(expected.equals(result)).toBe(true);
	});
});
test("Complicated example involving recursion --> 2*3+4^2 = 22", () => {
	const expr = parseExpression("2*3+4^2");

	const expected = new Int(22);
	const result = simplifyRNE(expr);

	expect(expected.equals(result)).toBe(true);
});
