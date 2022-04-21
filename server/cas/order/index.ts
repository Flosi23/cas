import type Expression from "$cas/expressions/Expression";
import Int from "$cas/expressions/atomic/Int";
import Fraction from "$cas/expressions/compound/Fraction";
import Power from "$cas/expressions/compound/Power";
import Product from "$cas/expressions/compound/Product";
import Sum from "$cas/expressions/compound/Sum";
import {
	isSum,
	isProduct,
	isPower,
	isInt,
	isSymbol,
	isConstant,
} from "../expressions/ExprType";

export function uSmallerV(u: Expression, v: Expression): boolean {
	// if U is a integer and V is not, it must be smaller than V
	if (isConstant(u) && !isConstant(v)) {
		return true;
	}
	// if both are fractions or integers, their order is their value (numerical order)
	if (isConstant(u) && isConstant(v)) {
		/*
		In order to simplify the comparison between integers and fractions, every Integer is converted
		to a fraction
		*/
		const uFrac = isInt(u) ? new Fraction(u, new Int(1)) : u;
		const vFrac = isInt(v) ? new Fraction(v, new Int(1)) : v;

		// 2/3 < 4/5 --> 2 * 5 < 4 * 3
		return (
			uFrac.numerator().value * vFrac.denominator().value <
			vFrac.numerator().value * uFrac.denominator().value
		);
	}
	// if both are symbols their order is dependent on their value (alphabetical order)
	if (isSymbol(u) && isSymbol(v)) {
		return u.value.localeCompare(v.value) === -1;
	}
	if ((isProduct(u) && isProduct(v)) || (isSum(u) && isSum(v))) {
		/**
		 * Begin at the end of the arrays and compare the indexes of them.
		 * If they are equal, go to the next index,
		 * if every index was compared, and they are all equal compare the length of the expressions
		 */
		for (
			let i = 1;
			i <= Math.min(v.children.length, u.children.length);
			i += 1
		) {
			const uIndex = u.children.length - i;
			const vIndex = v.children.length - i;

			if (!u.children[uIndex]!.equals(v.children[vIndex]!)) {
				return uSmallerV(u.children[uIndex]!, v.children[vIndex]!);
			}
		}
		//

		return u.children.length < v.children.length;
	}
	if (isPower(u) && isPower(v)) {
		// compare powers using their base unless the base is equal
		if (!u.base().equals(v.base())) {
			return uSmallerV(u.base(), v.base());
		}
		return uSmallerV(u.exponent(), v.exponent());
	}
	if (isProduct(u) && (isSum(v) || isPower(v) || isSymbol(v))) {
		// the order is determined by viewing both expressions as products
		return uSmallerV(u, new Product([v]));
	}
	if (isPower(u) && (isSum(v) || isSymbol(v))) {
		// the order is determined by viewing both expression as powers
		return uSmallerV(u, new Power([v]));
	}
	if (isSum(u) && isSymbol(v)) {
		return uSmallerV(u, new Sum([v]));
	}
	return !uSmallerV(v, u);
}
