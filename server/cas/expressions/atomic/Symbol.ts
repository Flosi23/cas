import ExprType from "../ExprType";
import Expression from "../Expression";

export default class Symbol extends Expression {
	public value: string;

	public type = ExprType.Symbol;

	constructor(value: string) {
		super();
		this.value = value;
	}

	override equals(expr: Expression | undefined): boolean {
		if (!expr) {
			return false;
		}
		if (isSymbol(expr) && expr.value !== this.value) {
			return false;
		}
		return super.equals(expr);
	}
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isSymbol(expr: Expression): expr is Symbol {
	return expr.type === ExprType.Symbol;
}
