import ExprType from "../ExprType";
import Operator from "./Operator";

export default class Add extends Operator {
	public type = ExprType.Add;
}
