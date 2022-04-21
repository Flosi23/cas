import type Expression from "../Expression";
import ExprType from "../ExprType";
import Integer from "../atomic/Integer";
import Operator from "./Operator";

export default class Power extends Operator {
	public type = ExprType.Power;

	/**
	 * Returns the base of the Power. By convention, the base
	 * is the first element of the children array
	 */
	public base(): Expression {
		return this.children[0]!;
	}

	/**
	 * Returns the exponent of the Power. By convention, the exponent
	 * is the first element of the children array
	 */
	public exponent(): Expression {
		return this.children[1] ?? new Integer(1);
	}
}
