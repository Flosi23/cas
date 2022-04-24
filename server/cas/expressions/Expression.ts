/* eslint-disable max-classes-per-file */
import type { ExprType } from "$cas/expressions/types";
import type Operator from "./Operator";

export abstract class Expression {
	public parent: Operator<Expression> | null = null;

	protected _operands: Expression[] = [];

	get operands(): ReadonlyArray<Expression> {
		return this._operands as ReadonlyArray<Expression>;
	}

	public abstract readonly type: ExprType;

	equals(expr: Expression | undefined): boolean {
		if (!expr) {
			return false;
		}

		if (expr.type !== this.type) {
			return false;
		}

		if (expr.operands.length !== this.operands.length) {
			return false;
		}

		for (let i = 0; i < this.operands.length; i += 1) {
			const thisChild = this.operands[i];
			const exprChild = expr.operands[i];

			if (!thisChild || !exprChild) {
				return false;
			}

			if (thisChild.equals(expr.operands[i])) {
				return true;
			}
		}

		return false;
	}
}

export abstract class GenericExpression<
	Child extends Expression | never,
> extends Expression {
	protected override _operands: Child[] = [];

	override get operands(): ReadonlyArray<Child> {
		return this._operands as ReadonlyArray<Child>;
	}
}
