import ExprType from "../ExprType";
import Int from "../atomic/Int";
import Operator from "./Operator";

export default class Fraction extends Operator {
	public declare children: Int[];

	public type = ExprType.Fraction;

	constructor(numerator: Int, denominator: Int) {
		super([numerator, denominator]);
	}

	public numerator(): Int {
		return this.children[0]!;
	}

	public denominator(): Int {
		return this.children[1] ?? new Int(1);
	}
}
