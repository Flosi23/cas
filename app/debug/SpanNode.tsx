import type { FrontEndSpan } from "$/server/tracing/FrontendSpan";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, HStack, useColorModeValue, VStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

export default function SpanNode({
	span,
	depth,
	selected,
	setSelected,
}: {
	span: FrontEndSpan;
	depth: number;
	selected: number;
	setSelected: Dispatch<SetStateAction<number>>;
}) {
	const [collapsed, setCollapsed] = useState(true);
	const borderColor = useColorModeValue("gray.900", "gray.100");
	const colors = [
		"red",
		"orange",
		"yellow",
		"green",
		"teal",
		"blue",
		"cyan",
		"purple",
		"pink",
	];
	const colorWeight = useColorModeValue(200, 300);
	const color = `${colors[depth % colors.length]!}.${colorWeight}`;

	return (
		<VStack alignItems="start">
			<HStack
				py={1}
				px={2}
				border={span.id === selected ? "2px" : "1px"}
				rounded="3xl"
				color="gray.900"
				borderColor={span.id === selected ? borderColor : "transparent"}
				justifyContent="space-between"
				backgroundColor={span.id === selected ? color : color}>
				<Box
					cursor="pointer"
					onClick={() => {
						setSelected(span.id);
					}}
					flex="1"
					textAlign="left">
					{span.name}
				</Box>
				{span.children.length > 0 ? (
					<Box>
						{collapsed ? (
							<ChevronRightIcon
								cursor="pointer"
								boxSize="5"
								onClick={() => {
									setCollapsed(false);
								}}
							/>
						) : (
							<ChevronDownIcon
								cursor="pointer"
								boxSize="5"
								onClick={() => {
									setCollapsed(true);
								}}
							/>
						)}
					</Box>
				) : (
					""
				)}
			</HStack>
			{span.children.length > 0 && !collapsed ? (
				<VStack pl={6} alignItems="start" position="relative">
					<Box
						position="absolute"
						backgroundColor={borderColor}
						left="10px"
						width="2px"
						height="100%"
					/>
					{span.children.map((childSpan) => (
						<SpanNode
							depth={depth + 1}
							key={childSpan.id}
							span={childSpan}
							selected={selected}
							setSelected={setSelected}
						/>
					))}
				</VStack>
			) : (
				""
			)}
		</VStack>
	);
}
