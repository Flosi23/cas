import type { Expression } from "./Expression";
import Operator from "./Operator";

export default abstract class BinaryOperator<
	OperandOne extends Expression,
	OperandTwo extends Expression,
> extends Operator<OperandOne | OperandTwo> {
	protected override _operands: [OperandOne, OperandTwo];

	override get operands(): [OperandOne, OperandTwo] {
		return this._operands;
	}

	constructor(operandOne: OperandOne, operandTwo: OperandTwo) {
		super([operandOne, operandTwo]);
		this._operands = [operandOne, operandTwo];
	}
}
