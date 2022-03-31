import type DisplayExpression from "$/server/display/DisplayExpression";
import { Box, Center, Text } from "@chakra-ui/react";
import Connector from "./Connector";

export default function TreeNode({
	node,
	depth,
}: {
	node: DisplayExpression;
	depth: number;
}) {
	const width = 80;
	const height = 50;
	const vGap = 30;

	const getType = (i: number, children: number) => {
		const mid = (children - 1) / 2;

		if (i === mid) return 0;

		return i < mid ? -1 : 1;
	};

	const getDepth = (parentNode: DisplayExpression): number => {
		return Math.max(
			...parentNode.children.map((child) => getDepth(child) + 1),
		);
	};

	const getOverlaps = (parentNode: DisplayExpression): number => {
		let overlaps = 0;
		let secondChildren = 0;

		parentNode.children.forEach((child) => {
			secondChildren += child.children.length;
		});

		if (secondChildren > parentNode.children.length) {
			overlaps = getDepth(parentNode) - 3;
		}

		return overlaps;
	};

	const calcSpacing = (parentNode: DisplayExpression): number => {
		let hGap = 30;

		hGap += getOverlaps(parentNode) * width;

		return hGap;
	};

	const spacing = (i: number, parentNode: DisplayExpression): number => {
		const type = getType(i, parentNode.children.length);

		const eqSpacing = calcSpacing(parentNode);

		if (type === -1) return -eqSpacing;
		if (type === 1) return eqSpacing;
		return 0;
	};

	return (
		<Box position="relative">
			<Center
				className="node"
				border="2px"
				borderColor="brand.500"
				w={`${width}px`}
				h={`${height}px`}
				borderRadius="lg">
				<Text fontWeight="bold" fontSize="lg">
					{node.displayValue}
				</Text>
			</Center>

			<style jsx>{`
				.node {
					opacity: 0;
					animation: changeOpac 0.5s linear forwards;
					animation-delay: ${depth * 0.5}s;
				}

				@keyframes changeOpac {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}
			`}</style>

			{node.children.map((child, i) => (
				// eslint-disable-next-line react/no-array-index-key
				<Box key={i}>
					<Connector
						depth={depth}
						spacing={calcSpacing(node)}
						height={vGap}
						nodeWidth={width}
						type={getType(i, node.children.length)}
					/>
					<Box
						marginTop={`${vGap}px`}
						position="absolute"
						left={`${i * width - width / 2 + spacing(i, node)}px`}>
						<TreeNode depth={depth + 1} node={child} />
					</Box>
				</Box>
			))}
		</Box>
	);
}
