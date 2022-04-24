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

		let allChildrenEqual = true;

		for (let i = 0; i < this.operands.length; i += 1) {
			const thisChild = this.operands[i];
			const exprChild = expr.operands[i];

			if (!thisChild || !exprChild) {
				return false;
			}

			if (allChildrenEqual && !thisChild.equals(exprChild)) {
				allChildrenEqual = false;
				break;
			}
		}

		return allChildrenEqual;
	}
}

export abstract class GenericExpression<
	Operand extends Expression | never,
> extends Expression {
	protected override _operands: Operand[] = [];

	override get operands(): ReadonlyArray<Operand> {
		return this._operands as ReadonlyArray<Operand>;
	}
}
