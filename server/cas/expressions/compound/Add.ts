import type Expression from "../Expression";
import ExprType from "../ExprType";
import Operator from "./Operator";

export default class Add extends Operator {
	public type = ExprType.Add;
}

export function isAdd(expr: Expression): expr is Add {
	return expr.type === ExprType.Add;
}
