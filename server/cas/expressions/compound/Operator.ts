import Expression from "../Expression";

export default abstract class Operator extends Expression {
	constructor(children: Expression[]) {
		super();

		if (children.length < 2) {
			throw new Error("An Operator must have at least 2 children");
		}

		this.children = children;
		// set new parent of children
		for (let i = 0; i < this.children.length; i += 1) {
			this.children[i]!.parent = this;
		}
	}
}
