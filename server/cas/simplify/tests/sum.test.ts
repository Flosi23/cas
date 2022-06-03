import Int from "$cas/expressions/atomic/Int";
import Symbol from "$cas/expressions/atomic/Symbol";
import Product from "$cas/expressions/n-ary/Product";
import Sum from "$cas/expressions/n-ary/Sum";
import simplifySum from "../n-ary/sum";

test("1 operand is undefined --> undefined", () => {
	const sum = new Sum([new Int(2), undefined]);
	const result = simplifySum(sum);
	expect(result).toBe(undefined);
});
test("Sum has only one operand u --> u", () => {
	const sum = new Sum([new Symbol("a")]);
	const result = simplifySum(sum);
	const expected = new Symbol("a");
	expect(result?.equals(expected)).toBe(true);
});
test("Nested summands are turned into one sum a + (b + c) --> a + b + c", () => {
	const sum = new Sum([
		new Symbol("a"),
		new Sum([new Symbol("b"), new Symbol("c")]),
	]);
	const result = simplifySum(sum);
	const expected = new Sum([
		new Symbol("a"),
		new Symbol("b"),
		new Symbol("c"),
	]);
	expect(result?.equals(expected)).toBe(true);
});
test("Sum consists of 2 constants --> 3 + 4 = 7", () => {
	const sum = new Sum([new Int(4), new Int(3)]);
	const result = simplifySum(sum);
	const expected = new Int(7);
	expect(result?.equals(expected)).toBe(true);
});
test("Number are added up, variables skipped --> 3 + a + 4 = 7 + a", () => {
	const sum = new Sum([new Int(3), new Symbol("a"), new Int(4)]);
	const result = simplifySum(sum);
	const expected = new Sum([new Int(7), new Symbol("a")]);
	expect(result?.equals(expected)).toBe(true);
});
describe("One of the summands is 0 --> return the other one", () => {
	test("First summand is 0", () => {
		const sum = new Sum([new Symbol("a"), new Int(0)]);
		const result = simplifySum(sum);
		const expected = new Symbol("a");
		expect(result?.equals(expected)).toBe(true);
	});
	test("Second summand is 0", () => {
		const sum = new Sum([new Int(0), new Symbol("c")]);
		const result = simplifySum(sum);
		const expected = new Symbol("c");
		expect(result?.equals(expected)).toBe(true);
	});
});
test("Summands are not in order b + a --> a + b", () => {
	const sum = new Sum([new Symbol("b"), new Symbol("a")]);
	const result = simplifySum(sum);
	const expected = new Sum([new Symbol("a"), new Symbol("b")]);
	expect(result?.equals(expected)).toBe(true);
});
test("Like terms are collected a + a --> 2 * a", () => {
	const sum = new Sum([new Symbol("a"), new Symbol("a")]);
	const result = simplifySum(sum);
	const expected = new Product([new Int(2), new Symbol("a")]);
	expect(result?.equals(expected)).toBe(true);
});
test("Like terms cancel themselves out a + a * -1 --> 0", () => {
	const sum = new Sum([
		new Symbol("a"),
		new Product([new Int(-1), new Symbol("a")]),
	]);
	const result = simplifySum(sum);
	const expected = new Int(0);
	expect(result?.equals(expected)).toBe(true);
});
test("Like products are collected (2 * a * z) + (a * z) --> 3 * a * z", () => {
	const sum = new Sum([
		new Product([new Int(2), new Symbol("a"), new Symbol("z")]),
		new Product([new Symbol("a"), new Symbol("z")]),
	]);
	const result = simplifySum(sum);
	const expected = new Product([
		new Int(3),
		new Symbol("a"),
		new Symbol("z"),
	]);
	expect(result?.equals(expected)).toBe(true);
});
