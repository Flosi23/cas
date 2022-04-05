import type { FrontendExpression } from "$/server/display/FrontendExpression";
import { Box, Center, Text } from "@chakra-ui/react";
import Connector from "./Connector";

export default function TreeNode({ node }: { node: FrontendExpression }) {
	const width = 80;
	const height = 50;
	const vGap = 20;
	const hGap = 20;

	const getType = (i: number, children: number) => {
		const mid = (children - 1) / 2;

		if (i === mid) return 0;

		return i < mid ? -1 : 1;
	};

	return (
		<Box>
			<Center
				className="node"
				border="2px"
				borderColor="brand.500"
				position="absolute"
				top={`${node.yUnits * height + vGap * node.yUnits}px`}
				left={`${node.xUnits * width + hGap * node.xUnits}px`}
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
					animation-delay: ${node.yUnits * 0.5}s;
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
				<TreeNode node={child} key={i} />
			))}
		</Box>
	);
}
