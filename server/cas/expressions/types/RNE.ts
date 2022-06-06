import type { Expression } from "../Expression";
import type Int from "../atomic/Int";
import type Fraction from "../binary/Fraction";
import { isFraction, isInt } from ".";

export type RationalNumber = Fraction | Int;

export function isRationalNumber(
	expr: Expression | undefined,
): expr is RationalNumber {
	return isFraction(expr) || isInt(expr);
}
