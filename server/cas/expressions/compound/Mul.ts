import Operator from "./Operator";

export default class Mul extends Operator {
	override setDisplayValue(): void {
		super.setDisplayValue();
		this.displayValue = "*";
	}
}
