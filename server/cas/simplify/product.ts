import type { Expression } from "$cas/expressions/Expression";
import Int from "$cas/expressions/atomic/Int";
import Product from "$cas/expressions/n-ary/Product";
import {
	isInt,
	isPower,
	isProduct,
	isRationalNumber,
} from "$cas/expressions/types";
import simplifyRNE from "./RNE";
import { uSmallerV } from "./order";

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

	const result = simplifyProductRec(product.operands);

	if (!result) {
		return undefined;
	}

	if (result.length === 0) {
		return new Int(1);
	}
	if (result.length === 1) {
		return result[0];
	}

	return new Product(result as Expression[]);
}

function simplifyProductRec(
	operands: readonly (Expression | undefined)[],
): readonly (Expression | undefined)[] | undefined {
	if (operands.length === 2) {
		const factorOne = operands[0];
		const factorTwo = operands[1];

		if (!factorOne || !factorTwo) {
			return undefined;
		}

		if (!isProduct(factorOne) && !isProduct(factorTwo)) {
			if (isRationalNumber(factorOne) && isRationalNumber(factorTwo)) {
				const result = simplifyRNE(new Product([factorOne, factorTwo]));

				if (!result) {
					return undefined;
				}

				if (isInt(result) && result.value === 1) {
					return [];
				}

				return [result];
			}
			// If one of the two factors is 1, return the other one
			if (isInt(factorOne) && factorOne.value === 1) {
				return [factorOne];
			}
			if (isInt(factorTwo) && factorTwo.value === 1) {
				return [factorTwo];
			}
			if (
				isPower(factorOne) &&
				isPower(factorTwo) &&
				factorOne.base()?.equals(factorTwo.base())
			) {
				// simplify the sum of the exponents, then simplify the new power
			}
			if (uSmallerV(factorTwo, factorOne)) {
				return [factorTwo, factorOne];
			}

			return operands;
		}

		if (isProduct(factorOne) && isProduct(factorTwo)) {
			return mergeProducts(
				factorOne.operands as Expression[],
				factorTwo.operands as Expression[],
			);
		}
		if (isProduct(factorOne) && !isProduct(factorTwo)) {
			return mergeProducts(factorOne.operands as Expression[], [
				factorTwo,
			]);
		}
		if (!isProduct(factorOne) && isProduct(factorTwo)) {
			return mergeProducts(
				[factorOne],
				factorTwo.operands as Expression[],
			);
		}
	}

	return undefined;
}

function mergeProducts(
	exprArrayOne: Expression[],
	exprArrayTwo: Expression[],
): (Expression | undefined)[] | undefined {
	if (exprArrayOne.length === 0) {
		return exprArrayTwo;
	}
	if (exprArrayTwo.length === 0) {
		return exprArrayOne;
	}

	const operandOne = exprArrayOne.shift();
	const operandTwo = exprArrayTwo.shift();

	if (!operandOne || !operandTwo) {
		return undefined;
	}

	const result = simplifyProductRec([operandOne, operandTwo]);

	if (!result) {
		return undefined;
	}

	if (result.length === 1) {
		const rest = mergeProducts(exprArrayOne, exprArrayTwo);
		return rest ? result.concat(rest) : undefined;
	}
	if (result[0]?.equals(operandOne) && result[1]?.equals(operandTwo)) {
		const rest = mergeProducts([operandTwo], exprArrayOne);
		return rest ? [result[0], ...rest] : undefined;
	}
	if (result[1]?.equals(operandOne) && result[0]?.equals(operandTwo)) {
		const rest = mergeProducts([operandOne], exprArrayTwo);
		return rest ? [result[0], ...rest] : undefined;
	}

	return undefined;
}
