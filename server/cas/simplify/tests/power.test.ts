import Int from "$cas/expressions/atomic/Int";
import Symbol from "$cas/expressions/atomic/Symbol";
import Fraction from "$cas/expressions/binary/Fraction";
import Power from "$cas/expressions/binary/Power";
import Product from "$cas/expressions/n-ary/Product";
import simplifyPower from "../power";

describe("Base or exponent is undefined --> undefined", () => {
	test("Base is undefined", () => {
		const power = new Power(undefined, new Int(1));
		expect(simplifyPower(power)).toBe(undefined);
	});
	test("Exponent is undefined", () => {
		const power = new Power(new Int(1), undefined);
		expect(simplifyPower(power)).toBe(undefined);
	});
});
describe("Base is zero", () => {
	test("Exponent is a positive number 0 ^ 2/3 --> 0", () => {
		const power = new Power(
			new Int(0),
			new Fraction(new Int(3), new Int(2)),
		);
		const result = simplifyPower(power);
		const expected = new Int(0);
		expect(result?.equals(expected)).toBe(true);
	});
	test("Exponent is a negative number 0 ^ -1 --> undefined", () => {
		const power = new Power(new Int(0), new Int(-1));
		expect(simplifyPower(power)).toBe(undefined);
	});
	test("Exponent is not a number 0 ^ a --> undefined", () => {
		const power = new Power(new Int(0), new Symbol("a"));
		expect(simplifyPower(power)).toBe(undefined);
	});
});
test("Base and exponent are positive integers 2 ^ 3 --> 8", () => {
	const power = new Power(new Int(2), new Int(3));
	const result = simplifyPower(power);
	const expected = new Int(8);
	expect(result?.equals(expected)).toBe(true);
});
test("Exponent is zero a ^ 0 --> 1", () => {
	const power = new Power(new Symbol("a"), new Int(0));
	const result = simplifyPower(power);
	const expected = new Int(1);
	expect(result?.equals(expected)).toBe(true);
});
test("Exponent is one a ^ 1 --> a", () => {
	const power = new Power(new Symbol("a"), new Int(1));
	const result = simplifyPower(power);
	const expected = new Symbol("a");
	expect(result?.equals(expected)).toBe(true);
});
describe("Nested powers", () => {
	test("are turned into products a ^ b ^ 2 --> a ^ (b * 2)", () => {
		const power = new Power(
			new Power(new Symbol("a"), new Symbol("b")),
			new Int(2),
		);
		const result = simplifyPower(power);
		const expected = new Power(
			new Symbol("a"),
			new Product([new Int(2), new Symbol("b")]),
		);
		expect(result?.equals(expected)).toBe(true);
	});
	test("are turned into products and simplified a ^ 6 ^ 2", () => {
		const power = new Power(
			new Power(new Symbol("a"), new Int(6)),
			new Int(2),
		);
		const result = simplifyPower(power);
		const expected = new Power(new Symbol("a"), new Int(12));
		expect(result?.equals(expected)).toBe(true);
	});
});
test("Base is a product (2 * a)^2 --> 4 * a^2", () => {
	const power = new Power(
		new Product([new Int(2), new Symbol("a")]),
		new Int(2),
	);
	const result = simplifyPower(power);
	const expected = new Product([
		new Int(4),
		new Power(new Symbol("a"), new Int(2)),
	]);
	expect(result?.equals(expected)).toBe(true);
});
