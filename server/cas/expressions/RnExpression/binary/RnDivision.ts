import type { RnExpression } from "../types";
import Division from "$cas/expressions/binary/Division";

export default class RnDivision
	extends Division<RnExpression, RnExpression>
	implements RnExpression {}
