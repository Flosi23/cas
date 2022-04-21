/* eslint-disable @typescript-eslint/no-use-before-define */
import type Expression from "./expressions/Expression";
import type Operator from "./expressions/compound/Operator";
import Integer from "./expressions/atomic/Integer";
import Symbol from "./expressions/atomic/Symbol";
import Difference from "./expressions/compound/Difference";
import Division from "./expressions/compound/Division";
import Power from "./expressions/compound/Power";
import Product from "./expressions/compound/Product";
import Sum from "./expressions/compound/Sum";

function tryOperator(
	expr: string,
	operator: string,
	callback: (left: string, right: string) => Operator | null,
): Operator | null {
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
		return new Integer(parseInt(expr, 10));
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

function isFactor(expr: string): Expression | Operator | null {
	return hasParentheses(expr) || isInteger(expr) || isSymbol(expr);
}

function isP(expr: string): Operator | null {
	return tryOperator(expr, "^", (left, right) => {
		const leftExpr = isFactor(left);
		if (!leftExpr) return null;

		const rightExpr = isPower(right);
		if (!rightExpr) return null;

		return new Power([leftExpr, rightExpr]);
	});
}

function isPower(expr: string): Expression | Operator | null {
	return isP(expr) || isFactor(expr);
}

function isMultiplication(expr: string): Operator | null {
	return tryOperator(expr, "*", (left, right) => {
		const leftExpr = isTerm(left);
		if (!leftExpr) return null;

		const rightExpr = isPower(right);
		if (!rightExpr) return null;

		return new Product([leftExpr, rightExpr]);
	});
}

function isDivision(expr: string): Operator | null {
	return tryOperator(expr, "/", (left, right) => {
		const leftExpr = isTerm(left);
		if (!leftExpr) return null;

		const rightExpr = isTerm(right);
		if (!rightExpr) return null;

		return new Division([leftExpr, rightExpr]);
	});
}

function isTerm(expr: string): Expression | Operator | null {
	return isMultiplication(expr) || isDivision(expr) || isPower(expr);
}

function isAddition(expr: string): Operator | null {
	return tryOperator(expr, "+", (left, right) => {
		const leftExpr = isExpression(left);
		if (!leftExpr) return null;

		const rightExpr = isTerm(right);
		if (!rightExpr) return null;

		return new Sum([leftExpr, rightExpr]);
	});
}

function isSubtraction(expr: string): Operator | null {
	return tryOperator(expr, "-", (left, right) => {
		const leftExpr = isExpression(left);
		if (!leftExpr) return null;

		const rightExpr = isExpression(right);
		if (!rightExpr) return null;

		return new Difference([leftExpr, rightExpr]);
	});
}

function isExpression(expr: string): Operator | Expression | null {
	return isAddition(expr) || isSubtraction(expr) || isTerm(expr);
}

export default function parseExpression(expr: string): Operator | Expression {
	const tree = isExpression(expr);

	if (!tree) {
		throw new Error("Invalid Expression!");
	}

	return tree;
}
