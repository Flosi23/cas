import type Expression from "$cas/expressions/Expression";
import { Box, Center, Text } from "@chakra-ui/react";
import Operator, { isOperator } from "$cas/expressions/compound/Operator";
import Connector from "./Connector";

export default function TreeNode({ node }: { node: Expression | Operator }) {
	const width = 80;
	const height = 50;
	const vGap = 30;

	const getType = (i: number, children: number) => {
		const mid = (children - 1) / 2;

		if (i === mid) return 0;

		return i < mid ? -1 : 1;
	};

	const getDepth = (parentNode: Expression): number => {
		if (isOperator(parentNode)) {
			return Math.max(
				...parentNode.children.map((child) => getDepth(child) + 1),
			);
		}
		return 1;
	};

	const getOverlaps = (parentNode: Operator): number => {
		let overlaps = 0;
		let secondChildren = 0;

		parentNode.children.forEach((child) => {
			secondChildren += isOperator(child) ? child.children.length : 0;
		});

		if (secondChildren > parentNode.children.length) {
			overlaps = getDepth(parentNode) - 3;
		}

		return overlaps;
	};

	const calcSpacing = (parentNode: Operator): number => {
		let hGap = 0;

		hGap += getOverlaps(parentNode) * width;

		return hGap;
	};

	const spacing = (i: number, parentNode: Operator): number => {
		const type = getType(i, parentNode.children.length);

		const eqSpacing = calcSpacing(parentNode);

		if (type === -1) return -eqSpacing;
		if (type === 1) return eqSpacing;
		return 0;
	};

	return (
		<Box position="relative">
			<Center
				border="2px"
				borderColor="brand.500"
				w={`${width}px`}
				h={`${height}px`}
				borderRadius="lg">
				<Text fontWeight="bold" fontSize="lg">
					{node.displayValue} O:{" "}
					{isOperator(node) ? getOverlaps(node) : 0}
				</Text>
			</Center>

			{isOperator(node) &&
				node.children.map((child, i) => (
					<Box key={i}>
						<Connector
							spacing={calcSpacing(node)}
							height={vGap}
							nodeWidth={width}
							type={getType(i, node.children.length)}
						/>
						<Box
							marginTop={`${vGap}px`}
							position="absolute"
							left={`${
								i * width - width / 2 + spacing(i, node)
							}px`}>
							<TreeNode node={child} />
						</Box>
					</Box>
				))}
		</Box>
	);
}
