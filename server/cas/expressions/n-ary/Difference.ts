import type { Expression } from "../Expression";
import Operator from "../Operator";
import { ExprType } from "../types";

export default class Difference<
	Operand extends Expression = Expression,
> extends Operator<Operand> {
	public readonly type = ExprType.Difference;
}
