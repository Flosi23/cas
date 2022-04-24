import type { Expression } from "../Expression";
import Operator from "../Operator";
import { ExprType } from "../types";

export default class Difference<
	Child extends Expression = Expression,
> extends Operator<Child> {
	public readonly type = ExprType.Difference;
}
