import type { Expression } from "../Expression";
import ExprType from "$cas/expressions/types";
import Operator from "../Operator";

export default class Sum<
	Child extends Expression = Expression,
> extends Operator<Child> {
	public readonly type = ExprType.Sum;
}
