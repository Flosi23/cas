import { Box } from "@chakra-ui/react";
import type { FrontendExpressionTree } from "$tree";
import TreeNode from "./TreeNode";

export default function TreeWrapper({
	rootNode,
}: {
	rootNode: FrontendExpressionTree;
}) {
	return (
		<Box marginLeft="50%" position="relative">
			<TreeNode node={rootNode} />
		</Box>
	);
}
