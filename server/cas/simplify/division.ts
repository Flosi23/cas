import type { Expression } from "$cas/expressions/Expression";
import type Division from "$cas/expressions/binary/Division";
import Int from "$cas/expressions/atomic/Int";
import Power from "$cas/expressions/binary/Power";
import Product from "$cas/expressions/n-ary/Product";
import { isRationalNumber } from "$cas/expressions/types/RNE";
import simplifyRNE from "./RNE";
import simplifyProduct from "./n-ary/product";
import simplifyPower from "./power";

export default function simplifyDivision(
	division: Division,
): Expression | undefined {
	const dividend = division.dividend();
	const divisor = division.divisor();

	if (isRationalNumber(dividend) && isRationalNumber(divisor)) {
		return simplifyRNE(division);
	}

	const power = simplifyPower(new Power(divisor, new Int(-1)));

	return simplifyProduct(new Product([dividend, power]));
}
