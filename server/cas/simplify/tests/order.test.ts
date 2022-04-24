import Int from "$cas/expressions/atomic/Int";
import Symbol from "$cas/expressions/atomic/Symbol";
import Fraction from "$cas/expressions/binary/Fraction";
import Product from "$cas/expressions/n-ary/Product";
import Sum from "$cas/expressions/n-ary/Sum";
import parseExpression from "$cas/parse";
import { uSmallerV } from "$cas/simplify/order";

/*
These tests are based on the table at page 109 of Mathematical Methods.
They test every possibility of comparing U and V
Only the diagonal, and everything above the diagonal is being tested since
everything under the diagonal will be correct if the rest works
due to Rule 13 --> u < v = !(v < u)
*/
describe("U = Undefined || V = Undefined", () => {
	test("U = Undefined, V = Expression --> undefined < expr", () => {
		return expect(uSmallerV(undefined, new Int(2))).toBe(true);
	});
	test("U = Expression, V = Undefined --> expr > undefined", () => {
		return expect(uSmallerV(new Int(2), undefined)).toBe(false);
	});
});

describe("U = Constant", () => {
	describe("V = Constant", () => {
		test("Integers are ordered numerically --> 2 < 3", () => {
			return expect(uSmallerV(new Int(2), new Int(3))).toBe(true);
		});

		test("Integers and Fractions can be compared --> 3/5 < 2", () => {
			const u = new Fraction(new Int(3), new Int(5));
			const v = new Int(2);

			return expect(uSmallerV(u, v)).toBe(true);
		});
	});
	test("V = Product --> 2/5 < 3*1", () => {
		const u = new Fraction(new Int(2), new Int(5));
		const v = parseExpression("3*1");

		return expect(uSmallerV(u, v)).toBe(true);
	});
	test("V = Power --> 1/4 < x^3", () => {
		const u = new Fraction(new Int(1), new Int(4));
		const v = parseExpression("x^3");

		return expect(uSmallerV(u, v)).toBe(true);
	});
	test("V = Sum --> 5 < 3+1", () => {
		const u = new Int(5);
		const v = parseExpression("3+1");

		return expect(uSmallerV(u, v)).toBe(true);
	});

	test("V = Symbol --> 2 < x", () => {
		const u = new Int(2);
		const v = new Symbol("x");

		return expect(uSmallerV(u, v)).toBe(true);
	});
});

describe("U = Product", () => {
	describe("V = Product", () => {
		test("are sorted depending on their last operand --> a * b < a * c", () => {
			const u = new Product([new Symbol("a"), new Symbol("b")]);
			const v = new Product([new Symbol("a"), new Symbol("c")]);

			return expect(uSmallerV(u, v)).toBe(true);
		});
		test("if last operand is equal, the other operands are compared --> a * c * d < b * c * d", () => {
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
			test("u is shorter than v --> c * d < b * c * d", () => {
				const u = new Product([new Symbol("c"), new Symbol("d")]);
				const v = new Product([
					new Symbol("b"),
					new Symbol("c"),
					new Symbol("d"),
				]);

				return expect(uSmallerV(u, v)).toBe(true);
			});
			test("v is shorter than u --> b * c * d > c * d", () => {
				const u = new Product([
					new Symbol("b"),
					new Symbol("c"),
					new Symbol("d"),
				]);
				const v = new Product([new Symbol("c"), new Symbol("d")]);

				return expect(uSmallerV(u, v)).toBe(false);
			});
		});
	});
	test("V = Power --> a * x^2 < x^3", () => {
		const u = parseExpression("a*x^2");
		const v = parseExpression("x^3");

		return expect(uSmallerV(u, v)).toBe(true);
	});
	test("V = Sum --> a*2 < x+4", () => {
		const u = parseExpression("a*2");
		const v = parseExpression("x^3");

		return expect(uSmallerV(u, v)).toBe(true);
	});
	test("V = Symbol --> 2*a < x", () => {
		const u = parseExpression("2*a");
		const v = parseExpression("x");

		return expect(uSmallerV(u, v)).toBe(true);
	});
});
describe("U = Power", () => {
	describe("V = Power", () => {
		test("are compared by their base --> (1+x)^3 < * (1 + y)^3", () => {
			const u = parseExpression("(1+x)^3");
			const v = parseExpression("(1+y)^3");

			return expect(uSmallerV(u, v)).toBe(true);
		});
		test("are compared by their exponents if the bases are equal --> (1+x)^2 < (1+x)^3", () => {
			const u = parseExpression("(1+x)^2");
			const v = parseExpression("(1+x)^3");

			return expect(uSmallerV(u, v)).toBe(true);
		});
	});
	test("V  = Sum --> (1+x)^3 < (1+y)", () => {
		const u = parseExpression("(1+x)^3");
		const v = parseExpression("(1+y)");

		return expect(uSmallerV(u, v)).toBe(true);
	});
	test("V = Symbol --> (1+a)^3 < x", () => {
		const u = parseExpression("(1+a)^3");
		const v = parseExpression("x");

		return expect(uSmallerV(u, v)).toBe(true);
	});
});
describe("U = Sum", () => {
	/* 
    because U = Sum, V = Sum works exactly the same as
    V = Product, V = Product only one test is since the details are covered
    in the U = Product, V = Product tests
    */
	test("V = Sum -> c * d < a * c * d", () => {
		const u = new Sum([new Symbol("c"), new Symbol("d")]);
		const v = new Sum([new Symbol("a"), new Symbol("c"), new Symbol("d")]);

		return expect(uSmallerV(u, v)).toBe(true);
	});
	test("V = Symbol --> 3 + a < x", () => {
		const u = parseExpression("3+a");
		const v = parseExpression("x");

		return expect(uSmallerV(u, v)).toBe(true);
	});
});
describe("U = Symbol", () => {
	test("V = Symbol --> a < x", () => {
		const u = new Symbol("a");
		const v = new Symbol("x");

		return expect(uSmallerV(u, v)).toBe(true);
	});
});
/*
There is only on test to check if Rule 13 is even applied. If not
it would result in infinite recursion.
If Rule 13 is applied then everything combination under the diagonal will be
handled correctly
*/
describe("Rule 13", () => {
	test("U = Product, V = Symbol", () => {
		const u = parseExpression("2*4");
		const v = new Int(2);

		return expect(uSmallerV(u, v)).toBe(false);
	});
});
