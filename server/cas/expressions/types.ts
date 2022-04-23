import type Expression from "./Expression";
import type Int from "./atomic/Int";
import type Symbol from "./atomic/Symbol";
import type Difference from "./compound/Difference";
import type Fraction from "./compound/Fraction";
import type Power from "./compound/Power";
import type Product from "./compound/Product";
import type Sum from "./compound/Sum";

enum ExprType {
	Int,
	Symbol,
	Sum,
	Division,
	Product,
	Power,
	Difference,
	Fraction,
}

export type RationalNumber = Int | Fraction;

export function isRationalNumber(expr: Expression): expr is RationalNumber {
	return isFraction(expr) || isInt(expr);
}

export function isFraction(expr: Expression): expr is Fraction {
	return expr.type === ExprType.Fraction;
}

export function isInt(expr: Expression): expr is Int {
	return expr.type === ExprType.Int;
}

export function isPositiveFraction(expr: Expression): expr is Fraction {
	return (
		isFraction(expr) &&
		expr.numerator().value * expr.denominator().value > 0
	);
}

export function isPositiveInt(expr: Expression): expr is Int {
	return isInt(expr) && expr.value > 0;
}

export function isConstant(expr: Expression): expr is Int | Fraction {
	return isInt(expr) || isFraction(expr);
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isSymbol(expr: Expression): expr is Symbol {
	return expr.type === ExprType.Symbol;
}

export function isDifference(expr: Expression): expr is Difference {
	return expr.type === ExprType.Difference;
}

export function isDivision(expr: Expression): expr is Difference {
	return expr.type === ExprType.Division;
}

export function isPower(expr: Expression): expr is Power {
	return expr.type === ExprType.Power;
}

export function isProduct(expr: Expression): expr is Product {
	return expr.type === ExprType.Product;
}

export function isSum(expr: Expression): expr is Sum {
	return expr.type === ExprType.Sum;
}

export default ExprType;
