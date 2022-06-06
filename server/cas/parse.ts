import type { Expression } from "./expressions/Expression";
import type Operator from "./expressions/Operator";
import Int from "./expressions/atomic/Int";
import Symbol from "./expressions/atomic/Symbol";
import Division from "./expressions/binary/Division";
import Power from "./expressions/binary/Power";
import Difference from "./expressions/n-ary/Difference";
import Product from "./expressions/n-ary/Product";
import Sum from "./expressions/n-ary/Sum";

function tryOperator(
	expr: string,
	operator: string,
	callback: (left: string, right: string) => Operator<Expression> | null,
): Operator<Expression> | null {
	for (
		let i = expr.indexOf(operator);
		i !== -1;
		i = expr.indexOf(operator, i + 1)
	) {
		const expression = callback(
			expr.substring(0, i),
			expr.substring(i + 1, expr.length),
		);

		if (expression) {
			return expression;
		}
	}

	return null;
}

function isInteger(expr: string): Expression | null {
	if (expr.match(/^\d+$/gm)) {
		return new Int(parseInt(expr, 10));
	}
	return null;
}

function isSymbol(expr: string): Expression | null {
	if (expr.match(/^[a-z]$/gm)) {
		return new Symbol(expr);
	}
	return null;
}

function hasParentheses(expr: string): Expression | null {
	if (expr.startsWith("(") && expr.endsWith(")")) {
		return isExpression(expr.substring(1, expr.length - 1));
	}
	return null;
}

function isFactor(expr: string): Expression | Operator<Expression> | null {
	return hasParentheses(expr) || isInteger(expr) || isSymbol(expr);
}

function isP(expr: string): Operator<Expression> | null {
	return tryOperator(expr, "^", (left, right) => {
		const leftExpr = isFactor(left);
		if (!leftExpr) return null;

		const rightExpr = isPower(right);
		if (!rightExpr) return null;

		return new Power(leftExpr, rightExpr);
	});
}

function isPower(expr: string): Expression | Operator<Expression> | null {
	return isP(expr) || isFactor(expr);
}

function isMultiplication(expr: string): Operator<Expression> | null {
	return tryOperator(expr, "*", (left, right) => {
		const rightExpr = isPower(right);
		if (!rightExpr) return null;

		if (left.length === 0) {
			return new Product([rightExpr]);
		}

		const leftExpr = isTerm(left);
		if (!leftExpr) return null;

		return new Product([leftExpr, rightExpr]);
	});
}

function isDivision(expr: string): Operator<Expression> | null {
	return tryOperator(expr, "/", (left, right) => {
		const leftExpr = isTerm(left);
		if (!leftExpr) return null;

		const rightExpr = isTerm(right);
		if (!rightExpr) return null;

		return new Division(leftExpr, rightExpr);
	});
}

function isTerm(expr: string): Expression | Operator<Expression> | null {
	return isMultiplication(expr) || isDivision(expr) || isPower(expr);
}

function isAddition(expr: string): Operator<Expression> | null {
	return tryOperator(expr, "+", (left, right) => {
		const rightExpr = isTerm(right);
		if (!rightExpr) return null;

		if (left.length === 0) {
			return new Sum([rightExpr]);
		}

		const leftExpr = isExpression(left);
		if (!leftExpr) return null;

		return new Sum([leftExpr, rightExpr]);
	});
}

function isSubtraction(expr: string): Operator<Expression> | null {
	return tryOperator(expr, "-", (left, right) => {
		const rightExpr = isExpression(right);
		if (!rightExpr) return null;

		if (left.length === 0) {
			return new Difference([rightExpr]);
		}

		const leftExpr = isExpression(left);
		if (!leftExpr) return null;

		return new Difference([leftExpr, rightExpr]);
	});
}

function isExpression(expr: string): Operator<Expression> | Expression | null {
	return isAddition(expr) || isSubtraction(expr) || isTerm(expr);
}

export default function parseExpression(expr: string): Expression {
	const tree = isExpression(expr);

	if (!tree) {
		throw new Error("Invalid Expression!");
	}

	return tree;
}
