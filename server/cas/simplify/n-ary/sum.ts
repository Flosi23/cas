import type { Expression } from "$cas/expressions/Expression";
import { getTracer } from "$/server/tracing/Tracer";
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

	const span = getTracer().StartSpan("Simplify Sum").SetTree(sum);

	// Associative Transformation
	operands = operands.flatMap((operand) =>
		isSum(operand) ? operand.operands : operand,
	);

	getTracer()
		.StartSpan("Associative Transformation")
		.SetTree(new Sum(operands))
		.End();

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

	getTracer()
		.StartSpan("Numeric Transformation")
		.SetTree(new Sum(operands))
		.End();

	const newOperands: (Product | undefined)[] = [];

	const dSpan = getTracer().StartSpan("Distributive Transformation");
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

	dSpan.SetTree(new Sum(operands)).End();

	// Identity Transformation (U + 0 --> U)
	operands = operands.filter((operand) => !isZero(operand));

	getTracer()
		.StartSpan("Identity Transformation 1")
		.SetTree(new Sum(operands))
		.End();

	// Identity transformation (U + undefined --> undefined)
	if (!operands.every((operand) => operand !== undefined)) {
		span.End();
		return undefined;
	}

	// Commutative Transformation
	operands = sort(operands);

	getTracer()
		.StartSpan("Commutative Transformation")
		.SetTree(new Sum(operands))
		.End();

	if (operands.length === 0) {
		span.End();
		return new Int(0);
	}

	if (operands.length === 1) {
		span.End();
		return operands[0];
	}

	span.End();

	return new Sum(operands);
}
