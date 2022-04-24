import type { Expression } from "../Expression";
import ExprType from "$cas/expressions/types";
import Operator from "../Operator";

export default class Product<
	Child extends Expression = Expression,
> extends Operator<Child> {
	public readonly type = ExprType.Product;
}
