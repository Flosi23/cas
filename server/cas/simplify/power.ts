import type { Expression } from "$cas/expressions/Expression";
import Int from "$cas/expressions/atomic/Int";
import Power from "$cas/expressions/binary/Power";
import Product from "$cas/expressions/n-ary/Product";
import {
	isInt,
	isPositiveFraction,
	isPositiveInt,
	isPower,
	isProduct,
} from "$cas/expressions/types";
// eslint-disable-next-line import/no-cycle
import { isRationalNumber } from "$cas/expressions/types/RNE";
import simplifyRNE from "./RNE";
// eslint-disable-next-line import/no-cycle
import simplifyProduct from "./n-ary/product";

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
	base: Expression | undefined,
	exponent: Int,
): Expression | undefined {
	if (!base) {
		return undefined;
	}
	if (exponent.value === 0) {
		return new Int(1);
	}
	if (exponent.value === 1) {
		return base;
	}
	if (isRationalNumber(base)) {
		return simplifyRNE(new Power(base, exponent));
	}
	if (isPower(base)) {
		const baseExponent = base.exponent();
		const baseBase = base.base();

		if (!baseExponent || !baseBase) {
			return undefined;
		}

		const newExponent = simplifyProduct(
			new Product([baseExponent, exponent]),
		);

		if (isInt(newExponent)) {
			return simplifyIntegerPower(baseBase, newExponent);
		}
		
		return new Power(baseBase, newExponent);
	}
	if (isProduct(base)) {
		base.setOperands(
			base.operands.map((operand) =>
				simplifyIntegerPower(operand, exponent),
			),
		);

		return simplifyProduct(base);
	}
	return new Power(base, exponent);
}
