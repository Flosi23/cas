/* eslint-disable import/no-cycle */
import type { Expression } from "$cas/expressions/Expression";
import type Difference from "$cas/expressions/n-ary/Difference";
import Int from "$cas/expressions/atomic/Int";
import Product from "$cas/expressions/n-ary/Product";
import Sum from "$cas/expressions/n-ary/Sum";
import { getTracer } from "$tracing/Tracer";
import simplify from "./simplify";

export default function simplifyDifference(
	difference: Difference,
): Expression | undefined {
	const { operands } = difference;

	if (operands.find((o) => o === undefined)) {
		return undefined;
	}

	let expression;

	if (operands.length === 1) {
		expression = new Product([new Int(-1), operands[0]]);
	} else {
		expression = new Sum([
			operands[0],
			new Product([new Int(-1), operands[1]]),
		]);
	}

	getTracer().StartSpan("Difference-Transformation", expression).End();

	return simplify(expression);
}
