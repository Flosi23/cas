import Expression from "../Expression";

export default class Symbol extends Expression {
	public value: string;

	constructor(value: string) {
		super();
		this.value = value;
	}

	setDisplayValue(): void {
		this.displayValue = this.value;
	}
}
