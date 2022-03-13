import Operator from "./Operator";

export default class Add extends Operator {
	override setDisplayValue(): void {
		super.setDisplayValue();
		this.displayValue = "+";
	}
}
