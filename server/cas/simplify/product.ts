import type { Expression } from "$cas/expressions/Expression";
import type Product from "$cas/expressions/n-ary/Product";
import Int from "$cas/expressions/atomic/Int";
import { isInt } from "$cas/expressions/types";

export default function simplifyProduct(
	product: Product,
): Expression | undefined {
	if (!product.operands.every((operand) => operand !== undefined)) {
		return undefined;
	}
	if (
		product.operands.find(
			(operand) => isInt(operand) && operand.value === 0,
		)
	) {
		return new Int(0);
	}
	return product;
}

/* function simplifyProductRec(product: Product): Expression | undefined {
	if (product.children.length === 2) {
		const factorOne = product.children[0];
		const factorTwo = product.children[1];

		if (isProduct(factorOne)) {
			console.log("factOne", factorOne);
		}
	}

	return undefined;
} */
