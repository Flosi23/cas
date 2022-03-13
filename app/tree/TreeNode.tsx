import type Expression from "$cas/expressions/Expression";
import {
	Box,
	Center,
	Flex,
	Grid,
	GridItem,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import Operator, { isOperator } from "$cas/expressions/compound/Operator";
import Connector from "./Connector";

function Node({ node }: { node: Expression | Operator }) {
	return (
		<Center
			border="2px"
			borderColor="brand.500"
			w={16}
			h={12}
			borderRadius="lg">
			<Text fontWeight="bold" fontSize="lg">
				{node.displayValue}
			</Text>
		</Center>
	);
}

export default function TreeNode({ node }: { node: Expression | Operator }) {
	const currentNode = node;

	const html = <Node node={currentNode} />;

	return <Node node={node} />;
}
