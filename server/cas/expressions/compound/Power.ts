import Operator from "./Operator";

export default class Power extends Operator {
	override setDisplayValue(): void {
		super.setDisplayValue();
		this.displayValue = "^";
	}
}
