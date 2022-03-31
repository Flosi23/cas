import type ExprType from "../ExprType";
import Expression from "../Expression";

export default abstract class Operator extends Expression {
	public children: Expression[];

	public abstract override type: ExprType;

	constructor(children: Expression[]) {
		super();

		if (children.length < 2) {
			throw new Error("An Operator must have at least 2 children");
		}

		this.children = children;
		// set new parent of children
		for (let i = 0; i < this.children.length; i += 1) {
			const child = this.children[i];
			if (child) child.parent = this;
		}
	}
}
