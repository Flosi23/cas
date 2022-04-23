import ExprType from "../types";
import BinaryOperator from "./BinaryOperator";

export default class Division extends BinaryOperator {
	public type = ExprType.Division;
}
