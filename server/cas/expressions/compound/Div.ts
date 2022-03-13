import Operator from "./Operator";

export default class Div extends Operator {
	override setDisplayValue(): void {
		super.setDisplayValue();
		this.displayValue = "/";
	}
}
