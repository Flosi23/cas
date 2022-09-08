import type { FrontEndSpan } from "$/server/tracing/FrontendSpan";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { FrontendExpressionTree } from "$tree";
import TreeWrapper from "$app/tree/TreeWrapper";
import SpanNode from "./SpanNode";

export default function Debug({ spans }: { spans: FrontEndSpan[] | null }) {
	const [selected, setSelected] = useState(-1);
	const [tree, setTree] = useState<FrontendExpressionTree | null | undefined>(
		null,
	);
	const [scrollPosition, setScrollPosition] = useState(0);
	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		function find(
			span: FrontEndSpan,
			id: number,
		): FrontEndSpan | undefined {
			if (span.id === id) {
				return span;
			}

			return span.children
				.map((child) => find(child, id))
				.find((r) => r != null);
		}

		setTree(
			spans?.map((span) => find(span, selected)).find((r) => r != null)
				?.tree,
		);
	}, [selected, spans]);

	if (spans == null || spans.length === 0) {
		return <Text>No Debug Data was recorded</Text>;
	}

	return (
		<Flex>
			<VStack alignItems="start">
				{spans.map((span) => (
					<SpanNode
						key={span.id}
						span={span}
						depth={0}
						selected={selected}
						setSelected={setSelected}
					/>
				))}
			</VStack>
			{tree ? (
				<Box flexGrow={1} position="relative">
					<Box
						top={`calc(${scrollPosition}px)`}
						left="50%"
						transform="translate(-50%,0)"
						position="absolute">
						<TreeWrapper rootNode={tree} animate={false} />
					</Box>
				</Box>
			) : (
				""
			)}
		</Flex>
	);
}
