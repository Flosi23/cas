import type { Expression } from "$cas/expressions/Expression";
import { uSmallerV } from "./compare";

export default function sort(
	expressions: (Expression | undefined)[],
): (Expression | undefined)[] {
	return expressions.sort((a, b) => (uSmallerV(a, b) ? -1 : 1));
}
