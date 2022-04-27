import type Int from "$cas/expressions/atomic/Int";
import type { RnExpression } from "../types";
import Power from "$cas/expressions/binary/Power";

export default class RnPower
	extends Power<RnExpression, Int>
	implements RnExpression {}
