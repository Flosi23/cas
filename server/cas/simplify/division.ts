/* eslint-disable import/no-cycle */
import type { Expression } from "$cas/expressions/Expression";
import type Division from "$cas/expressions/binary/Division";
import { getTracer } from "$/server/tracing/Tracer";
import Int from "$cas/expressions/atomic/Int";
import Power from "$cas/expressions/binary/Power";
import Product from "$cas/expressions/n-ary/Product";
import { isRationalNumber } from "$cas/expressions/types/RNE";
import simplifyRNE from "./RNE";
import simplify from "./simplify";

export default function simplifyDivision(
	division: Division,
): Expression | undefined {
	const dividend = division.dividend();
	const divisor = division.divisor();

	if (isRationalNumber(dividend) && isRationalNumber(divisor)) {
		return simplifyRNE(division);
	}

	const product = new Product([dividend, new Power(divisor, new Int(-1))]);

	getTracer().StartSpan("Quotient-Transformation", product).End();

	return simplify(product);
}
