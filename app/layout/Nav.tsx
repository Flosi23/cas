import type { PropsWithChildren } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
	Box,
	Text,
	Input,
	VStack,
	Flex,
	IconButton,
	useColorMode,
} from "@chakra-ui/react";

export default function Nav({
	children,
}: PropsWithChildren<Record<string, unknown>>) {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<>
			<Box px="20vw" my={5}>
				<Flex
					justifyContent="space-between"
					w="100%"
					alignItems="center">
					<IconButton
						variant="outline"
						aria-label="Toggle color mode"
						icon={
							colorMode === "light" ? <MoonIcon /> : <SunIcon />
						}
						onClick={toggleColorMode}
					/>
				</Flex>
				<VStack my={5} w="100%" spacing={12}>
					<Text
						bgGradient="linear(to-l, var(--chakra-colors-brand-700), var(--chakra-colors-brand-400))"
						bgClip="text"
						textAlign="center"
						fontWeight="extrabold"
						fontSize="6xl">
						Computer Algebra System
					</Text>
					<Input
						variant="filled"
						placeholder="Expression... (e.g 2 + 4)"
						fontWeight="bold"
						focusBorderColor="brand.500"
						size="lg"
					/>
				</VStack>
			</Box>
			{children}
		</>
	);
}
