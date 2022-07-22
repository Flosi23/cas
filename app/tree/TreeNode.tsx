import {
	Box,
	Center,
	Text,
	keyframes,
	useColorModeValue,
} from "@chakra-ui/react";
import type { FrontendExpressionTree } from "$tree";
import Connector from "./Connector";

export default function TreeNode({ node }: { node: FrontendExpressionTree }) {
	const width = 80;
	const height = 50;
	const hGap = 10;
	const vGap = 20;
	const nodeAnimDuration = 0.05;
	const pathAnimDuration = 0.1;

	const calcLeft = (n: FrontendExpressionTree) => {
		return n.xUnits * width + hGap * n.xUnits - width / 2;
	};

	const calcTop = (n: FrontendExpressionTree) => {
		return n.yUnits * height + vGap * n.yUnits;
	};

	const getType = (i: number) => {
		const childX = node.children[i]!.xUnits;
		const parentX = node.xUnits;

		return childX - parentX;
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
				borderColor={useColorModeValue("brand.500", "brand.300")}
				position="absolute"
				top={`${calcTop(node)}px`}
				left={`${calcLeft(node)}px`}
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
				<Box key={i}>
					<Connector
						depth={node.yUnits}
						type={getType(i)}
						height={vGap}
						top={calcTop(node) + height}
						left={
							getType(i) >= 0
								? calcLeft(node) + width / 2
								: calcLeft(child) + width / 2
						}
						width={Math.abs(calcLeft(node) - calcLeft(child))}
						nodeAnimDuration={nodeAnimDuration}
						pathAnimDuration={pathAnimDuration}
					/>
					<TreeNode node={child} />
				</Box>
			))}
		</Box>
	);
}
