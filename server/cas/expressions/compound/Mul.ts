import type Expression from "../Expression";
import ExprType from "../ExprType";
import Operator from "./Operator";

export default class Mul extends Operator {
	public type = ExprType.Mul;
}

export function isMul(expr: Expression): expr is Mul {
	return expr.type === ExprType.Mul;
}
