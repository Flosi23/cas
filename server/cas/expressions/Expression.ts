export default abstract class Expression {
	displayValue: string;

	constructor() {
		this.displayValue = "";
	}

	abstract setDisplayValue(): void;
}
