/* eslint-disable import/no-cycle */
import type { Expression } from "$cas/expressions/Expression";
import {
	ExprType,
	isDifference,
	isDivision,
	isFraction,
	isInt,
	isPower,
	isProduct,
	isSum,
	isSymbol,
} from "$cas/expressions/types";
import { getTracer } from "$tracing/Tracer";
import simplifyRNE from "./RNE";
import simplifyDifference from "./difference";
import simplifyDivision from "./division";
import simplifyProduct from "./n-ary/product";
import simplifySum from "./n-ary/sum";
import simplifyPower from "./power";

export default function simplify(
	expr: Expression | undefined,
): Expression | undefined {
	let result;

	if (!expr) {
		return expr;
	}
	if (isSymbol(expr) || isInt(expr)) {
		return expr;
	}

	const span = getTracer().StartSpan(
		`Simplify ${expr ? ExprType[expr.type]! : "undefined"}`,
		expr,
	);

	if (isFraction(expr)) {
		span.End();
		const r = simplifyRNE(expr);
		getTracer().StartSpan("Simplified Fraction", r).End();
		return r;
	}

	const childrenSpan = getTracer().StartSpan("Simplify children", expr);

	const operands = expr.operands.map((operand) => simplify(operand));

	childrenSpan.End();

	if (isPower(expr)) {
		expr.setOperands(operands);
		simplifiedChildrenSpan(expr);
		result = simplifyPower(expr);
	}
	if (isDivision(expr)) {
		expr.setOperands(operands);
		simplifiedChildrenSpan(expr);
		result = simplifyDivision(expr);
	}
	if (isProduct(expr)) {
		expr.setOperands(operands);
		simplifiedChildrenSpan(expr);
		result = simplifyProduct(expr);
	}
	if (isSum(expr)) {
		expr.setOperands(operands);
		simplifiedChildrenSpan(expr);
		result = simplifySum(expr);
	}
	if (isDifference(expr)) {
		expr.setOperands(operands);
		simplifiedChildrenSpan(expr);
		result = simplifyDifference(expr);
	}

	span.End();
	getTracer()
		.StartSpan(
			`Simplified ${expr ? ExprType[expr.type]! : "undefined"}`,
			result,
		)
		.End();
	return result;
}

function simplifiedChildrenSpan(expr: Expression | undefined) {
	getTracer().StartSpan("Simplified children", expr).End();
}
