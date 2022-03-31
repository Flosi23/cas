import type Expression from "../Expression";
import ExprType from "../ExprType";
import Operator from "./Operator";

export default class Div extends Operator {
	public type = ExprType.Div;
}

export function isDiv(expr: Expression): expr is Div {
	return expr.type === ExprType.Div;
}
