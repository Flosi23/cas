import type Expression from "$cas/expressions/Expression";
import {
	isInt,
	isPositiveFraction,
	isPositiveInt,
	isPower,
	isProduct,
} from "$cas/expressions/ExprType";
import Int from "$cas/expressions/atomic/Int";
import Power from "$cas/expressions/compound/Power";

export default function simplifyPower(power: Power): Expression | undefined {
	const base = power.base();
	const exponent = power.exponent();

	if (!base || !exponent) {
		return undefined;
	}

	if (isInt(base) && base.value === 0) {
		if (isPositiveInt(exponent) || isPositiveFraction(exponent)) {
			return new Int(0);
		}
		return undefined;
	}

	if (isInt(exponent)) {
		return simplifyIntegerPower(base, exponent);
	}

	return power;
}

function simplifyIntegerPower(
	base: Expression,
	exponent: Int,
): Expression | undefined {
	if (isInt(base)) {
		const value = base.value ** exponent.value;
		return Number.isNaN(value) ? undefined : new Int(value);
	}
	if (exponent.value === 0) {
		return new Int(1);
	}
	if (exponent.value === 1) {
		return base;
	}
	if (isPower(base)) {
		// simplify with simplify product
	}
	if (isProduct(base)) {
		base.children.map((child) => simplifyIntegerPower(child, exponent));
		// return simplify_product(base)
	}
	return new Power([base, exponent]);
}
