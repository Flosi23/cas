import ExprType from "../ExprType";
import Operator from "./Operator";

export default class Power extends Operator {
	public type = ExprType.Pow;
}
