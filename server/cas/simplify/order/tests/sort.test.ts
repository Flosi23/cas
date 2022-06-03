import Symbol from "$cas/expressions/atomic/Symbol";
import Product from "$cas/expressions/n-ary/Product";
import sort from "../sort";

test("f,a,b,e --> a,b,e,f", () => {
	const array = [
		new Symbol("f"),
		new Symbol("a"),
		new Symbol("b"),
		new Symbol("e"),
	];

	const expected = [
		new Symbol("a"),
		new Symbol("b"),
		new Symbol("e"),
		new Symbol("f"),
	];

	const result = sort(array);

	const equal = new Product(result).equals(new Product(expected));

	return expect(equal).toBe(true);
});
