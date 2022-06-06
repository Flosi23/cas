import type { Expression } from "$cas/expressions/Expression";
import {
	isDifference,
	isDivision,
	isFraction,
	isInt,
	isPower,
	isProduct,
	isSum,
	isSymbol,
} from "$cas/expressions/types";
import simplifyRNE from "./RNE";
import simplifyDifference from "./difference";
import simplifyDivision from "./division";
import simplifyProduct from "./n-ary/product";
import simplifySum from "./n-ary/sum";
import simplifyPower from "./power";

export default function simplify(
	expr: Expression | undefined,
): Expression | undefined {
	if (!expr) {
		return undefined;
	}
	if (isSymbol(expr) || isInt(expr)) {
		return expr;
	}
	if (isFraction(expr)) {
		return simplifyRNE(expr);
	}

	const operands = expr.operands.map((operand) => simplify(operand));

	if (isPower(expr)) {
		expr.setOperands(operands);
		return simplifyPower(expr);
	}
	if (isDivision(expr)) {
		expr.setOperands(operands);
		return simplifyDivision(expr);
	}
	if (isProduct(expr)) {
		expr.setOperands(operands);
		return simplifyProduct(expr);
	}
	if (isSum(expr)) {
		expr.setOperands(operands);
		return simplifySum(expr);
	}
	if (isDifference(expr)) {
		expr.setOperands(operands);
		return simplifyDifference(expr);
	}

	return undefined;
}
