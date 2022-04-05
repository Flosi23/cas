import type Expression from "$cas/expressions/Expression";
import { groupByToArray } from "$lib/array";
import { exprToDisplayExpr } from "./DisplayExpression";
import { FrontendExpression, toFrontExpr } from "./FrontendExpression";

export function calcTreeSpacing(expr: Expression): FrontendExpression {
	const dExpr = exprToDisplayExpr(expr);

	dExpr.setDefaultCoordinates();

	for (let i = dExpr.getMaxDepth(); i >= 0; i -= 1) {
		const row = dExpr.getRow(i);

		const groups = groupByToArray(row, (ele) => ele.parent);
		const parents = [];

		for (let j = 0; j < groups.length; j += 1) {
			const group = groups[j]!;
			const { parent } = group[0]!;
			if (!parent) break;

			parents.push(parent);
			// the position in the middle of the group
			const delta = (group.at(-1)!.xUnits - group.at(0)!.xUnits) / 2;

			parent.xUnits = group.at(0)!.xUnits + delta;

			// move next group delta in x direction
			if (j + 1 < groups.length) {
				groups[j + 1]!.forEach((ele) => ele.shift(delta));
			}
		}

		// only calculate the position of the parent nodes if the row has a parent row
		if (parents.length > 0) {
			const parentRow = dExpr.getRow(i - 1);

			const leftParentIndex = parentRow.indexOf(parents[0]!);
			// positions left of the parents
			for (let j = leftParentIndex - 1; j >= 0; j -= 1) {
				parentRow[j]!.xUnits =
					parents[0]!.xUnits - (leftParentIndex - j);
			}

			// positions between the parents
			parents.reduceRight((previous, current) => {
				const previousIndex = parentRow.indexOf(previous);
				const currentIndex = parentRow.indexOf(current);

				for (
					let j = currentIndex + 1;
					j >= 0 && j < previousIndex;
					j += 1
				) {
					const x =
						(previous.xUnits - current.xUnits) /
						(previousIndex - currentIndex);

					parentRow[j]!.xUnits =
						current.xUnits + (j - currentIndex) * x;
				}

				return current;
			}, parents.at(-1)!);

			// positions right of the parents
			const rightParentIndex = parentRow.indexOf(parents.at(-1)!);

			for (let j = rightParentIndex + 1; j < parentRow.length; j += 1) {
				parentRow[j]!.xUnits =
					parentRow[rightParentIndex]!.xUnits +
					(j - rightParentIndex);
			}
		}
	}

	return toFrontExpr(dExpr);
}
