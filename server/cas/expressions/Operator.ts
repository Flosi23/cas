import { Expression, GenericExpression } from "./Expression";

export default abstract class Operator<
	Child extends Expression,
> extends GenericExpression<Child> {
	constructor(children: Child[]) {
		super();

		if (children.length < 1) {
			throw new Error("Operator must have at least 1 Operand");
		}

		this._operands = children;
		// set new parent of children
		for (let i = 0; i < this.operands.length; i += 1) {
			if (this.operands[i]) {
				this.operands[i]!.parent = this;
			}
		}
	}
}
