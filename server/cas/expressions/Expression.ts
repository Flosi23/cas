import type ExprType from "./ExprType";
import type Operator from "./compound/Operator";

export default abstract class Expression {
	public parent: Operator | null;

	public children: Expression[];

	public abstract type: ExprType;

	constructor() {
		this.children = [];
		this.parent = null;
	}
}
