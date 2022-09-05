import type { Expression } from "$cas/expressions/Expression";
import Int from "$cas/expressions/atomic/Int";
import Product from "$cas/expressions/n-ary/Product";
import Sum from "$cas/expressions/n-ary/Sum";
import { isSum, isZero } from "$cas/expressions/types";
import { isRationalNumber } from "$cas/expressions/types/RNE";
import simplifyRNE from "../RNE";
import sort from "../order/sort";
// eslint-disable-next-line import/no-cycle
import simplifyProduct from "./product";

export default function simplifySum(sum: Sum): Expression | undefined {
	let { operands } = sum;

	// Associative Transformation
	operands = operands.flatMap((operand) =>
		isSum(operand) ? operand.operands : operand,
	);

	// Numeric Transformation
	operands.push(
		operands.reduceRight((value, currentOperand) => {
			if (isRationalNumber(currentOperand) && isRationalNumber(value)) {
				operands.splice(operands.indexOf(currentOperand), 1);
				return simplifyRNE(new Sum([value, currentOperand]));
			}
			return value;
		}, new Int(0)),
	);

	const newOperands: (Product | undefined)[] = [];

	// Distributive Transformation
	operands.forEach((operand) => {
		const existingRest = newOperands.find((newOp) =>
			newOp?.rest()?.equals(operand?.rest()),
		);

		if (existingRest) {
			const index = newOperands.indexOf(existingRest);

			newOperands.splice(
				index,
				1,
				new Product([
					simplifyRNE(
						new Sum([existingRest.factor(), operand?.factor()]),
					),
					existingRest.rest(),
				]),
			);
		} else {
			newOperands.push(new Product([operand?.factor(), operand?.rest()]));
		}
	});
	operands = newOperands.map((newOp) =>
		newOp ? simplifyProduct(newOp) : undefined,
	);

	// Identity Transformation (U + 0 --> U)
	operands = operands.filter((operand) => !isZero(operand));

	// Identity transformation (U + undefined --> undefined)
	if (!operands.every((operand) => operand !== undefined)) {
		return undefined;
	}

	// Commutative Transformation
	operands = sort(operands);

	if (operands.length === 0) {
		return new Int(0);
	}

	if (operands.length === 1) {
		return operands[0];
	}

	return new Sum(operands);
}
