import type { Expression } from "../Expression";
import type RnDifference from "./n-ary/RnDifference";
import type RnProduct from "./n-ary/RnProduct";
import type RnSum from "./n-ary/RnSum";
import { isDifference, isProduct, isSum, RationalNumber } from "../types";

export interface RnExpression extends Expression {
	evaluate(): RationalNumber | undefined;
}

function operandsAreRnExpressions(
	expr: Expression | undefined,
): expr is RnDifference | RnSum | RnProduct | RnDifference {
	return (
		expr !== undefined &&
		expr.operands.every((operand) => isRnExpression(operand))
	);
}

export function isRnExpression(
	expr: Expression | undefined,
): expr is RnExpression {
	return expr !== undefined;
}

export function isRnDifference(
	expr: Expression | undefined,
): expr is RnDifference {
	return operandsAreRnExpressions(expr) && isDifference(expr);
}

export function isRnSum(expr: Expression | undefined): expr is RnSum {
	return operandsAreRnExpressions(expr) && isSum(expr);
}

export function isRnProduct(expr: Expression | undefined): expr is RnProduct {
	return operandsAreRnExpressions(expr) && isProduct(expr);
}
