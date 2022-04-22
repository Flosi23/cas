import type Int from "../atomic/Int";
import ExprType, { isInt } from "../ExprType";
import Operator from "./Operator";

export default class Fraction extends Operator {
	public declare children: Int[];

	public type = ExprType.Fraction;

	constructor(numerator: Int, denominator: Int) {
		super([numerator, denominator]);
	}

	/**
	 * Returns the numerator of the fraction. By convention this is the first
	 * child
	 */
	public numerator(): Int {
		return this.children[0]!;
	}

	/**
	 * Return the denominator of the fraction. By convention, this if the
	 * second child
	 */
	public denominator(): Int {
		return this.children[1]!;
	}

	public multiply(number: Fraction | Int) {
		if (isInt(number)) {
			this.numerator().multiply(number);
		} else {
			this.numerator().multiply(number.numerator());
			this.denominator().multiply(number.denominator());
		}
	}
}
