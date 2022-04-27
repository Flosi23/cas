import type { RNE, RnExpression } from "../types";
import Sum from "$cas/expressions/n-ary/Sum";

export default class RnSum extends Sum<RnExpression> implements RnExpression {}
