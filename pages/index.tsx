import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
	Text,
	Input,
	VStack,
	Flex,
	IconButton,
	useColorMode,
	HStack,
	Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { trpc } from "$/lib/trpc";
import Container from "$app/layout/Container";
import Results from "$app/layout/Results";

export default function Index() {
	const { colorMode, toggleColorMode } = useColorMode();
	const [expr, setExpr] = useState("");
	const treeMutation = trpc.useMutation(["tree"]);

	function handleCalc() {
		treeMutation.mutate({ expr });
	}

	return (
		<Container>
			<Flex justifyContent="space-between" w="100%" alignItems="center">
				<IconButton
					variant="outline"
					aria-label="Toggle color mode"
					icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
					onClick={toggleColorMode}
				/>
			</Flex>
			<VStack mt={5} mb={14} w="100%" spacing={12}>
				<Text
					bgGradient="linear(to-l, var(--chakra-colors-brand-700), var(--chakra-colors-brand-400))"
					bgClip="text"
					textAlign="center"
					fontWeight="extrabold"
					fontSize="6xl">
					Computer Algebra System
				</Text>
				<HStack w="100%">
					<Input
						onChange={(e) => {
							setExpr(e.target.value);
						}}
						variant="filled"
						placeholder="Expression... (e.g 2 + 4)"
						fontWeight="bold"
						focusBorderColor="brand.500"
						size="lg"
					/>
					<Button
						size="lg"
						isLoading={treeMutation.isLoading}
						onClick={() => {
							handleCalc();
						}}>
						Calculate
					</Button>
				</HStack>
			</VStack>
			{treeMutation.data && <Results tree={treeMutation.data} />}
		</Container>
	);
}
