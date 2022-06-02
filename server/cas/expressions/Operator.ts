import { Expression, GenericExpression } from "./Expression";

export default abstract class Operator<
	Operand extends Expression,
> extends GenericExpression<Operand> {
	constructor(operands: (Operand | undefined)[]) {
		super();

		if (operands.length < 1) {
			throw new Error("Operator must have at least 1 Operand");
		}

		this._operands = operands;
		// set new parent of operands
		for (let i = 0; i < this.operands.length; i += 1) {
			if (this.operands[i]) {
				this.operands[i]!.parent = this;
			}
		}
	}

	setOperands(operands: (Operand | undefined)[]) {
		this._operands = operands;

		for (let i = 0; i < operands.length; i += 1) {
			const operand = this.operands[i];
			if (operand) {
				operand.parent = this;
			}
		}
	}
}
