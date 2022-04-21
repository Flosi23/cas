import type Expression from "./Expression";
import type Integer from "./atomic/Integer";
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

export function isFraction(expr: Expression): expr is Fraction {
	return expr.type === ExprType.Fraction;
}

export function isInt(expr: Expression): expr is Integer {
	return expr.type === ExprType.Int;
}

export function isConstant(expr: Expression): expr is Integer | Fraction {
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
	return expr.type === ExprType.Difference;
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
