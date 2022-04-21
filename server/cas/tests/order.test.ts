import Int from "$cas/expressions/atomic/Int";
import Symbol from "$cas/expressions/atomic/Symbol";
import Fraction from "$cas/expressions/compound/Fraction";
import Product from "$cas/expressions/compound/Product";
import Sum from "$cas/expressions/compound/Sum";
import { uSmallerV } from "$cas/order";

test("Integers are ordered numerically --> 2 < 3", () => {
	return expect(uSmallerV(new Int(2), new Int(3))).toBe(true);
});

test("Integers and Fractions can be compared --> 3/5 < 2", () => {
	const u = new Fraction(new Int(3), new Int(5));
	const v = new Int(2);

	return expect(uSmallerV(u, v)).toBe(true);
});

test("Symbols are ordered alphabetically --> a < x", () => {
	const u = new Symbol("a");
	const v = new Symbol("x");

	return expect(uSmallerV(u, v)).toBe(true);
});

describe("Products and Sums", () => {
	test("are sorted depending on their last operand --> a + b < a + c", () => {
		const u = new Sum([new Symbol("a"), new Symbol("b")]);
		const v = new Sum([new Symbol("a"), new Symbol("c")]);

		return expect(uSmallerV(u, v)).toBe(true);
	});

	test("if last operand is equal, the other operands are compared --> a + c + d < b + c + d", () => {
		const u = new Product([
			new Symbol("a"),
			new Symbol("c"),
			new Symbol("d"),
		]);

		const v = new Product([
			new Symbol("b"),
			new Symbol("c"),
			new Symbol("d"),
		]);

		return expect(uSmallerV(u, v)).toBe(true);
	});

	describe("if all operands are equal, the shorter expr is smaller", () => {
		test("u is shorter than v --> c + d < b + c + d", () => {
			const u = new Sum([new Symbol("c"), new Symbol("d")]);
			const v = new Sum([
				new Symbol("b"),
				new Symbol("c"),
				new Symbol("d"),
			]);

			return expect(uSmallerV(u, v)).toBe(true);
		});

		test("v is shorter than u --> b + c + d > c + d", () => {
			const u = new Sum([
				new Symbol("b"),
				new Symbol("c"),
				new Symbol("d"),
			]);
			const v = new Sum([new Symbol("c"), new Symbol("d")]);

			return expect(uSmallerV(u, v)).toBe(false);
		});
	});
});

export {};
