import Int from "$cas/expressions/atomic/Int";
import Symbol from "$cas/expressions/atomic/Symbol";
import Difference from "$cas/expressions/n-ary/Difference";
import Product from "$cas/expressions/n-ary/Product";
import Sum from "$cas/expressions/n-ary/Sum";
import simplifyDifference from "../difference";

test("Difference has one operator u --> u", () => {
	const difference = new Difference([new Int(1)]);
	const result = simplifyDifference(difference);
	const expected = new Int(-1);
	expect(result?.equals(expected)).toBe(true);
});
test("Difference has two operators, is turned into a sum a - z --> a + z * -1", () => {
	const difference = new Difference([new Symbol("a"), new Symbol("z")]);
	const result = simplifyDifference(difference);
	const expected = new Sum([
		new Symbol("a"),
		new Product([new Int(-1), new Symbol("z")]),
	]);
	expect(result?.equals(expected)).toBe(true);
});
test("Resulting sum is simplified a - a --> 0", () => {
	const difference = new Difference([new Symbol("a"), new Symbol("a")]);
	const result = simplifyDifference(difference);
	const expected = new Int(0);
	expect(result?.equals(expected)).toBe(true);
});
