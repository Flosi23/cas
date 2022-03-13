import Operator from "./Operator";

export default class Sub extends Operator {
	override setDisplayValue(): void {
		super.setDisplayValue();
		this.displayValue = "-";
	}
}
