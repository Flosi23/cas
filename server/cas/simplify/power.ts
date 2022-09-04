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
import { getTracer } from "$/server/tracing/Tracer";

export default function simplifyPower(power: Power): Expression | undefined {
	const base = power.base();
	const exponent = power.exponent();

	const span = getTracer().StartSpan("Simplify Power").SetTree(new Power(base, exponent))

	if (!base || !exponent) {
		return undefined;
	}

	if (isInt(base) && base.value === 0) {
		if (isPositiveInt(exponent) || isPositiveFraction(exponent)) {
			getTracer().StartSpan("Identity Transformation 4").SetTree(new Int(0)).End()
			span.End()
			return new Int(0);
		}
		span.End()
		return undefined;
	}

	if (isInt(exponent)) {
		span.End()
		return simplifyIntegerPower(base, exponent);
	}

	span.End()

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
		getTracer().StartSpan("Identity Transformation 6").SetTree(new Int(1)).End()
		return new Int(1);
	}
	if (exponent.value === 1) {
		getTracer().StartSpan("Identity Transformation 7").SetTree(base).End()
		return base;
	}
	if (isRationalNumber(base)) {
		const r =  simplifyRNE(new Power(base, exponent));
		getTracer().StartSpan("Numeric Transformation 3").SetTree(r).End()
		return r;
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

		const pSpan = getTracer().StartSpan("Power Transformation 3")

		if (isInt(newExponent)) {
			const r =  simplifyIntegerPower(baseBase, newExponent);
			pSpan.SetTree(r).End()
			return r;
		}
		
		pSpan.SetTree(new Power(baseBase, newExponent)).End()

		return new Power(baseBase, newExponent);
	}
	if (isProduct(base)) {
		base.setOperands(
			base.operands.map((operand) =>
				simplifyIntegerPower(operand, exponent),
			),
		);

		const r = simplifyProduct(base);
		getTracer().StartSpan("Power Transformation 2").SetTree(r).End()
		return r;
	}
	return new Power(base, exponent);
}
