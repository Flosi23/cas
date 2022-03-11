import Expression from '../Expression';

export default class Integer extends Expression {
    public value : number;

    constructor(value: number) {
      super();
      this.value = value;
    }
}
