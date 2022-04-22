import type { RNE } from ".";
import Operator from "../compound/Operator";

export default abstract class RNOperator extends Operator {
	public override children: RNE[] = [];
}
