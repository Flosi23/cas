import type { Expression } from "./Expression";
import Operator from "./Operator";

export default abstract class BinaryOperator<
	Operand extends Expression,
> extends Operator<Operand> {
	constructor(operands: Operand[]) {
		super(operands);

		if (operands.length !== 2) {
			throw new Error("Operator must have 2 Operands");
		}
	}
}
