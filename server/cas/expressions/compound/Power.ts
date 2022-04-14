import type Expression from "../Expression";
import ExprType from "../ExprType";
import Operator from "./Operator";

export default class Power extends Operator {
	public type = ExprType.Power;
}

export function isPower(expr: Expression): expr is Power {
	return expr.type === ExprType.Power;
}
