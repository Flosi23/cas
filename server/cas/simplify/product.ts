import type Expression from "$cas/expressions/Expression";
import type Product from "$cas/expressions/compound/Product";
import Int from "$cas/expressions/atomic/Int";
import {
	isInt,
	isFraction,
	isProduct,
	isPower,
	isSum,
} from "$cas/expressions/types";
import simplifyRNE from "./RNE";

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

function simplifyProductRec(product: Product): Expression | undefined {
	if (product.children.length === 2) {
		const factorOne = product.children[0];
		const factorTwo = product.children[1];

		if (isSum(factorOne)) {
			console.log("factor", factorOne);
		}
	}

	return undefined;
}
