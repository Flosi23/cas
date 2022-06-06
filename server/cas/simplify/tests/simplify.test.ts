import Int from "$cas/expressions/atomic/Int";
import Symbol from "$cas/expressions/atomic/Symbol";
import Division from "$cas/expressions/binary/Division";
import Product from "$cas/expressions/n-ary/Product";
import Sum from "$cas/expressions/n-ary/Sum";
import simplify from "../simplify";

test("Undefined --> undefined", () => {
	expect(simplify(undefined)).toBe(undefined);
});
describe("Symbols and ints are returned as they are", () => {
	test("a --> a", () => {
		const symbol = new Symbol("a");
		const result = simplify(symbol);
		const expected = new Symbol("a");
		expect(result?.equals(expected)).toBe(true);
	});
	test("2 --> 2", () => {
		const int = new Int(2);
		const result = simplify(int);
		const expected = new Int(2);
		expect(result?.equals(expected)).toBe(true);
	});
});
describe("Operands can be in non simplified form v*u/u + v --> 2v", () => {
	const sum = new Sum([
		new Symbol("v"),
		new Division(
			new Product([new Symbol("v"), new Symbol("u")]),
			new Symbol("u"),
		),
	]);
	const result = simplify(sum);
	const expected = new Product([new Int(2), new Symbol("v")]);
	expect(result?.equals(expected)).toBe(true);
});
