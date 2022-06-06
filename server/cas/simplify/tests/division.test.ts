import Int from "$cas/expressions/atomic/Int";
import Symbol from "$cas/expressions/atomic/Symbol";
import Division from "$cas/expressions/binary/Division";
import Fraction from "$cas/expressions/binary/Fraction";
import Power from "$cas/expressions/binary/Power";
import Product from "$cas/expressions/n-ary/Product";
import simplifyDivision from "../division";

test("One of the operands is undefined --> undefined", () => {
	const division = new Division(undefined, undefined);
	expect(simplifyDivision(division)).toBe(undefined);
});
describe("Fraction is created when both operands are rational numbers", () => {
	test("2/3 --> 2/3", () => {
		const division = new Division(new Int(2), new Int(3));
		const result = simplifyDivision(division);
		const expected = new Fraction(new Int(2), new Int(3));
		expect(result?.equals(expected)).toBe(true);
	});
	test("New fraction is simplified 6/4 --> 3/2", () => {
		const division = new Division(new Int(6), new Int(4));
		const result = simplifyDivision(division);
		const expected = new Fraction(new Int(3), new Int(2));
		expect(result?.equals(expected)).toBe(true);
	});
});
describe("Quotient transformation is applied ", () => {
	test("u/v --> u * v^-1", () => {
		const division = new Division(new Symbol("u"), new Symbol("v"));
		const result = simplifyDivision(division);
		const expected = new Product([
			new Symbol("u"),
			new Power(new Symbol("v"), new Int(-1)),
		]);

		expect(result?.equals(expected)).toBe(true);
	});
	test("Resulting product and power are simplified", () => {
		const division = new Division(new Symbol("u"), new Symbol("u"));
		const result = simplifyDivision(division);
		const expected = new Int(1);
		expect(result?.equals(expected)).toBe(true);
	});
});
