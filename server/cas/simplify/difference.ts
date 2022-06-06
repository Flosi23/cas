import type { Expression } from "$cas/expressions/Expression";
import type Difference from "$cas/expressions/n-ary/Difference";
import Int from "$cas/expressions/atomic/Int";
import Product from "$cas/expressions/n-ary/Product";
import Sum from "$cas/expressions/n-ary/Sum";
import simplifyProduct from "./n-ary/product";
import simplifySum from "./n-ary/sum";

export default function simplifyDifference(
	difference: Difference,
): Expression | undefined {
	const { operands } = difference;

	if (operands.length === 1) {
		return simplifyProduct(new Product([new Int(-1), operands[0]]));
	}

	return simplifySum(
		new Sum([operands[0], new Product([new Int(-1), operands[1]])]),
	);
}
