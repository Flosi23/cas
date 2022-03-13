import Expression from "../Expression";

export default class Operator extends Expression {
	public children: Expression[];

	constructor(children: Expression[]) {
		super();

		if (children.length < 2) {
			throw new Error("An Operator must have at least 2 children");
		}

		this.children = children;
	}

	setDisplayValue(): void {
		this.children.forEach((c) => c.setDisplayValue());
	}
}

export function isOperator(object: any): object is Operator {
	return "children" in object;
}
