import type { Expression } from "$cas/expressions/Expression";
import Int from "$cas/expressions/atomic/Int";
import {
	isDifference,
	isDivision,
	isFraction,
	isInt,
	isPower,
	isProduct,
	isRationalNumber,
	isSum,
	RationalNumber,
} from "$cas/expressions/types";
import { add, divide, exponentiate, multiply, subtract } from "./evaluate";
import { simplifyRationalNumber } from "./number";

export default function simplifyRNE(
	expr: Expression | undefined,
): RationalNumber | undefined {
	const result = simplifyRneRec(expr);

	if (!result) {
		return undefined;
	}

	return simplifyRationalNumber(result);
}

function simplifyRneRec(
	expr: Expression | undefined,
): RationalNumber | undefined {
	if (!expr) {
		return undefined;
	}
	if (isRationalNumber(expr)) {
		if (isFraction(expr) && expr.denominator().value === 0) {
			return undefined;
		}
		return expr;
	}
	if (expr.operands.length === 1) {
		const v = simplifyRneRec(expr.operands[0]);

		if (!v) {
			return undefined;
		}

		if (isDifference(expr)) {
			return multiply(new Int(-1), v);
		}
		return v;
	}
	if (expr.operands.length === 2) {
		if (isPower(expr)) {
			const base = simplifyRneRec(expr.base());
			const exponent = expr.exponent();
			if (!base || !exponent || !isInt(exponent)) {
				return undefined;
			}
			return exponentiate(base, exponent);
		}

		const operandOne = simplifyRneRec(expr.operands[0]);
		const operandTwo = simplifyRneRec(expr.operands[1]);

		if (!operandOne || !operandTwo) {
			return undefined;
		}

		if (isSum(expr)) {
			return add(operandOne, operandTwo);
		}
		if (isDivision(expr)) {
			return divide(operandOne, operandTwo);
		}
		if (isDifference(expr)) {
			return subtract(operandOne, operandTwo);
		}
		if (isProduct(expr)) {
			return multiply(operandOne, operandTwo);
		}
	}
	return undefined;
}
