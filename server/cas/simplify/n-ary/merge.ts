import type { Expression } from "$cas/expressions/Expression";

export default function mergeNaryExprs(
	exprArrayOne: (Expression | undefined)[],
	exprArrayTwo: (Expression | undefined)[],
	callback: (
		operands: (Expression | undefined)[],
	) => (Expression | undefined)[] | undefined,
): (Expression | undefined)[] | undefined {
	if (exprArrayOne.length === 0) {
		return exprArrayTwo;
	}
	if (exprArrayTwo.length === 0) {
		return exprArrayOne;
	}

	const operandOne = exprArrayOne[0];
	const operandTwo = exprArrayTwo[0];

	if (!operandOne || !operandTwo) {
		return undefined;
	}

	const result = callback([operandOne, operandTwo]);

	if (!result) {
		return undefined;
	}

	if (result.length === 1) {
		exprArrayOne.shift();
		exprArrayTwo.shift();
		const rest = mergeNaryExprs(exprArrayOne, exprArrayTwo, callback);
		return rest ? result.concat(rest) : undefined;
	}
	if (result[0]?.equals(operandOne) && result[1]?.equals(operandTwo)) {
		exprArrayOne.shift();
		const rest = mergeNaryExprs(exprArrayOne, exprArrayTwo, callback);
		return rest ? [result[0], ...rest] : undefined;
	}
	if (result[1]?.equals(operandOne) && result[0]?.equals(operandTwo)) {
		exprArrayTwo.shift();
		const rest = mergeNaryExprs(exprArrayOne, exprArrayTwo, callback);
		return rest ? [result[0], ...rest] : undefined;
	}

	return undefined;
}
