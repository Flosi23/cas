/* eslint-disable max-classes-per-file */
/* eslint-disable max-classes-per-file */

export enum ExprType {
	Int,
	Symbol,
	Sum,
	Division,
	Product,
	Power,
	Difference,
	Fraction,
}

abstract class Expression {
	public parent: Expression | null = null;

	protected children: Expression[] = [];

	public abstract type: ExprType;
}

abstract class GenericExpression<
	Child extends Expression | never,
> extends Expression {
	public override children: Child[] = [];
}

abstract class Operator<
	Child extends Expression | never,
> extends GenericExpression<Child> {
	constructor(children: Child[]) {
		super();

		if (children.length < 1) {
			throw new Error("Operator must have at least 1 Operand");
		}

		this.children = children;
		// set new parent of children
		for (let i = 0; i < this.children.length; i += 1) {
			if (this.children[i]) {
				this.children[i]!.parent = this;
			}
		}
	}
}

abstract class BinaryOperator<
	Child extends Expression | never,
> extends Operator<Child> {
	constructor(children: Child[]) {
		super(children);

		if (children.length !== 2) {
			throw new Error("Operator must have 2 Operands");
		}
	}
}

abstract class Power<
	Base extends Expression,
	Exponent extends Expression,
> extends BinaryOperator<Base | Exponent> {
	public static type: ExprType = ExprType.Power;

	constructor(base: Base, exponent: Exponent) {
		super([base, exponent]);
	}

	/**
	 * Returns the base of the Power. By convention, the base
	 * is the first element of the children array
	 */
	public base(): Base | undefined {
		return this.children[0] as Base;
	}

	/**
	 * Returns the exponent of the Power. By convention, the exponent
	 * is the first element of the children array
	 */
	public exponent(): Exponent | undefined {
		return this.children[1] as Exponent;
	}
}

class Int extends GenericExpression<never> {
	public static type: ExprType = ExprType.Int;

	public value: number;

	constructor(value: number) {
		super();
		this.value = value;
	}
}
