import type Expression from "$cas/expressions/Expression";
import type { RNE } from "$cas/expressions/types/RNE";

export default function simplifyRNE(expr: RNE) {
	const result = simplifyRneRec(expr);

	if (result === undefined) {
		return undefined;
	}

	return simplify;
}

function simplifyRneRec(expr: RNE) {}
