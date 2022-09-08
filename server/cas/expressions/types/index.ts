import type { Expression } from "../Expression";
import type Int from "../atomic/Int";
import type Symbol from "../atomic/Symbol";
import type Division from "../binary/Division";
import type Fraction from "../binary/Fraction";
import type Power from "../binary/Power";
import type Difference from "../n-ary/Difference";
import type Product from "../n-ary/Product";
import type Sum from "../n-ary/Sum";

export enum ExprType {
	Int,
	Fraction,
	Symbol,
	Difference,
	Sum,
	Product,
	Division,
	Power,
}

export function isFraction(expr: Expression | undefined): expr is Fraction {
	return expr?.type === ExprType.Fraction;
}

export function isOne(expr: Expression | undefined): expr is Int {
	return (
		(isFraction(expr) &&
			expr.numerator().value / expr.denominator().value === 1) ||
		(isInt(expr) && expr.value === 1)
	);
}

export function isZero(expr: Expression | undefined): expr is Int {
	return (
		(isFraction(expr) && expr.numerator().value === 0) ||
		(isInt(expr) && expr.value === 0)
	);
}

export function isInt(expr: Expression | undefined): expr is Int {
	return expr?.type === ExprType.Int;
}

export function isPositiveFraction(
	expr: Expression | undefined,
): expr is Fraction {
	return (
		isFraction(expr) &&
		expr.numerator().value * expr.denominator().value > 0
	);
}

export function isPositiveInt(expr: Expression | undefined): expr is Int {
	return isInt(expr) && expr.value > 0;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isSymbol(expr: Expression | undefined): expr is Symbol {
	return expr?.type === ExprType.Symbol;
}

export function isDifference(expr: Expression | undefined): expr is Difference {
	return expr?.type === ExprType.Difference;
}

export function isDivision(expr: Expression | undefined): expr is Division {
	return expr?.type === ExprType.Division;
}

export function isPower(expr: Expression | undefined): expr is Power {
	return expr?.type === ExprType.Power;
}

export function isProduct(expr: Expression | undefined): expr is Product {
	return expr?.type === ExprType.Product;
}

export function isSum(expr: Expression | undefined): expr is Sum {
	return expr?.type === ExprType.Sum;
}
