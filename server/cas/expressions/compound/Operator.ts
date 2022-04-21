import Expression from "../Expression";

export default abstract class Operator extends Expression {
	constructor(children: Expression[]) {
		super();

		if (children.length < 1) {
			throw new Error("Operator must have at least ONE child");
		}

		this.children = children;
		// set new parent of children
		for (let i = 0; i < this.children.length; i += 1) {
			this.children[i]!.parent = this;
		}
	}
}
