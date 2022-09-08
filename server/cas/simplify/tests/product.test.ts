import Int from "$cas/expressions/atomic/Int";
import Symbol from "$cas/expressions/atomic/Symbol";
import Power from "$cas/expressions/binary/Power";
import Product from "$cas/expressions/n-ary/Product";
import Sum from "$cas/expressions/n-ary/Sum";
import parseExpression from "$cas/parse";
import simplifyProduct from "../n-ary/product";

test("1 operand is undefined --> undefined", () => {
	const product = new Product([new Int(-3), undefined, new Int(2)]);

	const result = simplifyProduct(product);

	expect(result).toBe(undefined);
});
test("1 of the operands is 0 --> 0", () => {
	const product = new Product([new Int(2), new Int(0)]);
	const result = simplifyProduct(product);
	const expected = new Int(0);
	expect(result?.equals(expected)).toBe(true);
});
test("Product has only one Operand u --> u", () => {
	const product = new Product([new Int(2)]);
	const result = simplifyProduct(product);
	const expected = new Int(2);
	expect(result?.equals(expected)).toBe(true);
});
test("Product consists of two constants --> 4 * 2 = 8", () => {
	const product = new Product([new Int(2), new Int(4)]);
	const result = simplifyProduct(product);
	const expected = new Int(8);
	expect(result?.equals(expected)).toBe(true);
});
test("factors are in order: product b * a but a < b --> a * b", () => {
	const product = new Product([new Symbol("b"), new Symbol("a")]);
	const result = simplifyProduct(product);
	const expected = parseExpression("a*b");
	expect(result?.equals(expected)).toBe(true);
});
test("nested products are turned into one a * (b * c) --> a * b * c", () => {
	const product = new Product([
		new Symbol("a"),
		new Product([new Symbol("b"), new Symbol("c")]),
	]);
	const result = simplifyProduct(product);
	const expected = new Product([
		new Symbol("a"),
		new Symbol("b"),
		new Symbol("c"),
	]);
	expect(result?.equals(expected)).toBe(true);
});
test("like powers are simplified a * a --> a^2", () => {
	const product = new Product([new Symbol("a"), new Symbol("a")]);
	const result = simplifyProduct(product);
	const expected = parseExpression("a^2");
	expect(result?.equals(expected)).toBe(true);
});
test("Like terms can cancel themselves out a^-1 * a --> 1", () => {
	const product = new Product([
		new Power(new Symbol("a"), new Int(-1)),
		new Symbol("a"),
	]);
	const result = simplifyProduct(product);
	const expected = new Int(1);
	expect(result?.equals(expected)).toBe(true);
});
describe("Distributive Transformation is applied", () => {
	test("3 * (x+y) --> 3x + 3y", () => {
		const product = new Product([
			new Int(3),
			new Sum([new Symbol("x"), new Symbol("y")]),
		]);
		const result = simplifyProduct(product);
		const expected = parseExpression("3*x+3*y");
		expect(result?.equals(expected)).toBe(true);
	});
});
test("(a * c * e) * (f * c^-1) --> a * e * f", () => {
	const product = new Product([
		new Product([new Symbol("a"), new Symbol("c"), new Symbol("e")]),
		new Product([new Symbol("f"), new Power(new Symbol("c"), new Int(-1))]),
	]);
	const result = simplifyProduct(product);
	const expected = new Product([
		new Symbol("a"),
		new Symbol("e"),
		new Symbol("f"),
	]);
	expect(result?.equals(expected)).toBe(true);
});

export {};
