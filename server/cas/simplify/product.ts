import type Expression from "$cas/expressions/Expression";
import type Product from "$cas/expressions/compound/Product";
import { isInt, isProduct } from "$cas/expressions/ExprType";
import Int from "$cas/expressions/atomic/Int";

export default function simplifyProduct(
	product: Product,
): Expression | undefined {
	if (!product.children.every((child) => child !== undefined)) {
		return undefined;
	}
	if (product.children.find((child) => isInt(child) && child.value === 0)) {
		return new Int(0);
	}
	return product;
}

function simplifyProductRec(product: Product) {
	if (
		product.children.length === 2 &&
		!isProduct(product.children[0]!) &&
		!isProduct(product.children[1]!)
	) {
		// none
	}
}
