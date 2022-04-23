import type Expression from "../Expression";
import Operator from "./Operator";

export default abstract class BinaryOperator extends Operator {
	constructor(children: Expression[]) {
		super(children);

		if (children.length !== 2) {
			throw new Error("Operator must have 2 Operands");
		}
	}
}
