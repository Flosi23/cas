import ExprType from "../ExprType";
import Expression from "../Expression";

export default class Symbol extends Expression {
	public value: string;

	public type = ExprType.Symbol;

	constructor(value: string) {
		super();
		this.value = value;
	}
}
