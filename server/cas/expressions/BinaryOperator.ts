import type { Expression } from "./Expression";
import Operator from "./Operator";

export default abstract class BinaryOperator<
	OperandOne extends Expression,
	OperandTwo extends Expression,
> extends Operator<OperandOne | OperandTwo> {
	protected override _operands: [
		OperandOne | undefined,
		OperandTwo | undefined,
	];

	override get operands(): [OperandOne | undefined, OperandTwo | undefined] {
		return this._operands;
	}

	constructor(
		operandOne: OperandOne | undefined,
		operandTwo: OperandTwo | undefined,
	) {
		super([operandOne, operandTwo]);
		this._operands = [operandOne, operandTwo];
	}
}
