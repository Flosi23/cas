import type { Expression } from "$cas/expressions/Expression";
import Int from "$cas/expressions/atomic/Int";
import Product from "$cas/expressions/n-ary/Product";
import Sum from "$cas/expressions/n-ary/Sum";
import { isOne, isSum, isZero } from "$cas/expressions/types";
import { isRationalNumber } from "$cas/expressions/types/RNE";
import simplifyRNE from "../RNE";
import { uSmallerV } from "../order";
import mergeNaryExprs from "./merge";

export default function simplifySum(sum: Sum): Expression | undefined {
	if (!sum.operands.every((operand) => operand !== undefined)) {
		return undefined;
	}

	if (sum.operands.length === 1) {
		return sum.operands[0];
	}

	const result = simplifySumRec(sum.operands);

	if (!result) {
		return undefined;
	}

	if (result.length === 0) {
		return new Int(1);
	}
	if (result.length === 1) {
		return result[0];
	}

	return new Sum(result);
}

function simplifySumRec(
	operands: (Expression | undefined)[],
): (Expression | undefined)[] | undefined {
	if (operands.length === 1) {
		return [operands[0]];
	}

	if (operands.length === 2) {
		const summandOne = operands[0];
		const summandTwo = operands[1];

		if (!summandOne || !summandTwo) {
			return undefined;
		}

		if (isRationalNumber(summandOne) && isRationalNumber(summandTwo)) {
			const result = simplifyRNE(new Sum([summandOne, summandTwo]));

			if (!result) {
				return undefined;
			}

			if (isOne(result)) {
				return [];
			}

			return [result];
		}
		if (isZero(summandOne)) {
			return [summandTwo];
		}
		if (isZero(summandTwo)) {
			return [summandOne];
		}
		if (summandOne.equals(summandTwo)) {
			return [new Product([new Int(2), summandOne])];
		}
		if (uSmallerV(summandTwo, summandOne)) {
			return [summandTwo, summandOne];
		}
		if (isSum(summandOne) && isSum(summandTwo)) {
			return mergeNaryExprs(
				summandOne.operands,
				summandTwo.operands,
				simplifySumRec,
			);
		}
		if (isSum(summandOne) && !isSum(summandTwo)) {
			return mergeNaryExprs(
				summandOne.operands,
				[summandTwo],
				simplifySumRec,
			);
		}
		if (!isSum(summandOne) && isSum(summandTwo)) {
			return mergeNaryExprs(
				[summandOne],
				summandTwo.operands,
				simplifySumRec,
			);
		}

		return operands;
	}

	const firstOperand = operands.shift();

	const rest = simplifySumRec(operands);

	if (!rest) {
		return undefined;
	}

	if (isSum(firstOperand)) {
		return mergeNaryExprs(firstOperand.operands, rest, simplifySumRec);
	}

	return mergeNaryExprs([firstOperand], rest, simplifySumRec);
}
