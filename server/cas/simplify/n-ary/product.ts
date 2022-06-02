import type { Expression } from "$cas/expressions/Expression";
import Int from "$cas/expressions/atomic/Int";
import Power from "$cas/expressions/binary/Power";
import Product from "$cas/expressions/n-ary/Product";
import Sum from "$cas/expressions/n-ary/Sum";
import { isZero, isOne, isProduct } from "$cas/expressions/types";
import { isRationalNumber } from "$cas/expressions/types/RNE";
import simplifyRNE from "../RNE";
import { uSmallerV } from "../order";
// eslint-disable-next-line import/no-cycle
import simplifyPower from "../power";
import mergeNaryExprs from "./merge";
import simplifySum from "./sum";

export default function simplifyProduct(
	product: Product,
): Expression | undefined {
	if (!product.operands.every((operand) => operand !== undefined)) {
		return undefined;
	}
	if (product.operands.find((operand) => isZero(operand))) {
		return new Int(0);
	}

	if (product.operands.length === 1) {
		return product.operands[0];
	}

	const result = simplifyProductRec(product.operands as Expression[]);

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
	operands: (Expression | undefined)[],
): (Expression | undefined)[] | undefined {
	if (operands.length === 1) {
		return [operands[0]];
	}
	if (operands.length === 2) {
		const factorOne = operands[0];
		const factorTwo = operands[1];

		if (!factorOne || !factorTwo) {
			return undefined;
		}

		if (isRationalNumber(factorOne) && isRationalNumber(factorTwo)) {
			const result = simplifyRNE(new Product([factorOne, factorTwo]));

			if (!result) {
				return undefined;
			}

			if (isOne(result)) {
				return [];
			}

			return [result];
		}
		// If one of the two factors is 1, return the other one
		if (isOne(factorOne)) {
			return [factorTwo];
		}
		if (isOne(factorTwo)) {
			return [factorOne];
		}
		if (factorOne.base()?.equals(factorTwo.base())) {
			// simplify the sum of the exponents, then simplify the new power
			const exponentSum = simplifySum(
				new Sum([factorOne.exponent(), factorTwo.exponent()]),
			);

			if (!exponentSum) {
				return undefined;
			}

			const power = simplifyPower(
				new Power(factorOne.base()!, exponentSum),
			);

			if (isOne(power)) {
				return [];
			}

			return [power];
		}
		if (uSmallerV(factorTwo, factorOne)) {
			return simplifyProductRec([factorTwo, factorOne]);
		}

		if (isProduct(factorOne) && isProduct(factorTwo)) {
			return mergeNaryExprs(
				factorOne.operands,
				factorTwo.operands,
				simplifyProductRec,
			);
		}
		if (isProduct(factorOne) && !isProduct(factorTwo)) {
			return mergeNaryExprs(
				factorOne.operands,
				[factorTwo],
				simplifyProductRec,
			);
		}
		if (!isProduct(factorOne) && isProduct(factorTwo)) {
			return mergeNaryExprs(
				[factorOne],
				factorTwo.operands,
				simplifyProductRec,
			);
		}

		return operands;
	}

	const firstOperand = operands.shift();

	const rest = simplifyProductRec(operands);

	if (!rest) {
		return undefined;
	}

	if (isProduct(firstOperand)) {
		return mergeNaryExprs(firstOperand.operands, rest, simplifyProductRec);
	}

	return mergeNaryExprs([firstOperand], rest, simplifyProductRec);
}
