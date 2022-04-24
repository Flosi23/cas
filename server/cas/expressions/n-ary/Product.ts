import type { Expression } from "../Expression";
import { ExprType } from "$cas/expressions/types";
import Operator from "../Operator";

export default class Product<
	Operand extends Expression = Expression,
> extends Operator<Operand> {
	public readonly type = ExprType.Product;
}
