import ExprType from "../ExprType";
import Integer from "../atomic/Integer";
import Operator from "./Operator";

export default class Fraction extends Operator {
	public declare children: Integer[];

	public type = ExprType.Fraction;

	constructor(numerator: Integer, denominator: Integer) {
		super([numerator, denominator]);
	}

	public numerator(): Integer {
		return this.children[0]!;
	}

	public denominator(): Integer {
		return this.children[1] ?? new Integer(1);
	}
}
