import { Box, Center, Text, keyframes } from "@chakra-ui/react";
import type { FrontendExpressionTree } from "$tree";
import Connector from "./Connector";

export default function TreeNode({ node }: { node: FrontendExpressionTree }) {
	const width = 80;
	const height = 50;
	const hGap = 20;
	const vGap = 30;
	const nodeAnimDuration = 0.1;
	const pathAnimDuration = 0.2;

	const getType = (i: number, children: number) => {
		const mid = (children - 1) / 2;

		if (i === mid) return 0;

		return i < mid ? -1 : 1;
	};

	const changeOpacity = keyframes`
		from { opacity: 0; }
		to { opacity: 1; }
	`;
	return (
		<Box>
			<Center
				className="node"
				border="2px"
				opacity="0"
				borderColor="brand.500"
				position="absolute"
				top={`${node.yUnits * height + vGap * node.yUnits}px`}
				left={`${node.xUnits * width + hGap * node.xUnits}px`}
				w={`${width}px`}
				h={`${height}px`}
				borderRadius="lg"
				style={{
					animationDelay: `${
						node.yUnits * (pathAnimDuration + nodeAnimDuration)
					}s`,
				}}
				animation={`${changeOpacity} ${nodeAnimDuration}s linear forwards`}>
				<Text fontWeight="bold" fontSize="lg">
					{node.displayValue}
				</Text>
			</Center>

			{node.children.map((child, i) => (
				// eslint-disable-next-line react/no-array-index-key
				<TreeNode node={child} key={i} />
			))}
		</Box>
	);
}
