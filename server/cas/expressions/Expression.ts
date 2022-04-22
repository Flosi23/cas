import type Operator from "./compound/Operator";
import type ExprType from "./types";

export default abstract class Expression {
	public parent: Operator | null = null;

	public children: Expression[] = [];

	public abstract type: ExprType;

	equals(expr: Expression | undefined): boolean {
		if (!expr) {
			return false;
		}

		if (expr.type !== this.type) {
			return false;
		}

		if (expr.children.length !== this.children.length) {
			return false;
		}

		for (let i = 0; i < this.children.length; i += 1) {
			// if any of the children is undefined --> return false
			if (!this.children[i] || !expr.children[i]) {
				return false;
			}

			if (!this.children[i]!.equals(expr.children[i])) {
				return false;
			}
		}

		return true;
	}
}
