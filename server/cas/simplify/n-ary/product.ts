import type { Expression } from "$cas/expressions/Expression";
import Int from "$cas/expressions/atomic/Int";
import Power from "$cas/expressions/binary/Power";
import Product from "$cas/expressions/n-ary/Product";
import Sum from "$cas/expressions/n-ary/Sum";
import { isOne, isProduct, isZero } from "$cas/expressions/types";
import { isRationalNumber } from "$cas/expressions/types/RNE";
import simplifyRNE from "../RNE";
import sort from "../order/sort";
// eslint-disable-next-line import/no-cycle
import simplifyPower from "../power";
// eslint-disable-next-line import/no-cycle
import simplifySum from "./sum";

export default function simplifyProduct(
	product: Product,
): Expression | undefined {
	let { operands } = product;

	// Associative transformation (a * (b * c) --> a * b * c)
	operands = operands.flatMap((operand) =>
		isProduct(operand) ? operand.operands : operand,
	);

	for (let i = 0; i < operands.length; i += 1) {
		for (let j = i + 1; j < operands.length; j += 1) {
			const result = simplifyBinaryProduct([operands[i], operands[j]]);

			if (!result) {
				return undefined;
			}

			if (result.length === 1) {
				operands.splice(i, 1);
				operands.splice(j - 1, 1);
				operands.push(result[0]);
				i = -1;
				break;
			}
		}
	}

	// Identity Transformation (U * 1 --> U)
	operands = operands.filter((operand) => !isOne(operand));

	operands = sort(operands);

	// Identity transformation (U * undefined --> undefined)
	if (!operands.every((operand) => operand !== undefined)) {
		return undefined;
	}

	// Identity transformation (U * 0 --> 0)
	if (operands.find((operand) => isZero(operand))) {
		return new Int(0);
	}

	if (operands.length === 0) {
		return new Int(1);
	}

	if (operands.length === 1) {
		return operands[0];
	}

	return new Product(operands);
}

function simplifyBinaryProduct(
	operands: [Expression | undefined, Expression | undefined],
): (Expression | undefined)[] | undefined {
	const factorOne = operands[0];
	const factorTwo = operands[1];

	if (!factorOne || !factorTwo) {
		return undefined;
	}

	if (isRationalNumber(factorOne) && isRationalNumber(factorTwo)) {
		const result = simplifyRNE(new Product(operands));

		if (!result) {
			return undefined;
		}

		return [result];
	}

	if (factorOne.base()?.equals(factorTwo.base())) {
		// simplify the sum of the exponents, then simplify the new power
		const exponentSum = simplifySum(
			new Sum([factorOne.exponent(), factorTwo.exponent()]),
		);

		if (!exponentSum) {
			return undefined;
		}

		const power = simplifyPower(new Power(factorOne.base(), exponentSum));

		return [power];
	}

	return operands;
}
