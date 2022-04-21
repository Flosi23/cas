import type ExprType from "./ExprType";
import type Operator from "./compound/Operator";

export default abstract class Expression {
	public parent: Operator | null;

	public children: Expression[];

	public abstract type: ExprType;

	constructor() {
		this.children = [];
		this.parent = null;
	}

	equals(expr: Expression): boolean {
		if (expr.type !== this.type) {
			return false;
		}

		for (let i = 0; i < this.children.length; i += 1) {
			if (i >= expr.children.length) {
				return false;
			}

			if (!this.children[i]!.equals(expr.children[i]!)) {
				return false;
			}
		}

		return true;
	}
}
