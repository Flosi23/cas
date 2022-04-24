import type Expression from "./Expression";
import type Int from "./atomic/Int";
import type Symbol from "./atomic/Symbol";
import type Difference from "./compound/Difference";
import type Division from "./compound/Division";
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

function isExpression(expr: Expression | undefined): expr is Expression {
	return expr !== undefined;
}

export function isRationalNumber(
	expr: Expression | undefined,
): expr is RationalNumber {
	return isFraction(expr) || isInt(expr);
}

export function isFraction(expr: Expression | undefined): expr is Fraction {
	return isExpression(expr) && expr.type === ExprType.Fraction;
}

export function isInt(expr: Expression | undefined): expr is Int {
	return isExpression(expr) && expr.type === ExprType.Int;
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
	return isExpression(expr) && expr.type === ExprType.Symbol;
}

export function isDifference(expr: Expression | undefined): expr is Difference {
	return isExpression(expr) && expr.type === ExprType.Difference;
}

export function isDivision(expr: Expression | undefined): expr is Division {
	return isExpression(expr) && expr.type === ExprType.Division;
}

export function isPower(expr: Expression | undefined): expr is Power {
	return isExpression(expr) && expr.type === ExprType.Power;
}

export function isProduct(expr: Expression | undefined): expr is Product {
	return isExpression(expr) && expr.type === ExprType.Product;
}

export function isSum(expr: Expression | undefined): expr is Sum {
	return isExpression(expr) && expr.type === ExprType.Sum;
}

export default ExprType;
