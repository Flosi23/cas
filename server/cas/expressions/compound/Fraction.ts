import type Int from "../atomic/Int";
import ExprType from "../types";
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
}
