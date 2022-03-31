import type Expression from "../Expression";
import ExprType from "../ExprType";
import Operator from "./Operator";

export default class Sub extends Operator {
	public type = ExprType.Sub;
}

export function isSub(expr: Expression): expr is Sub {
	return expr.type === ExprType.Sub;
}
