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
	Tabs,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
} from "@chakra-ui/react";
import { useState } from "react";
import { trpc } from "$/lib/trpc";
import Debug from "$app/debug/Debug";
import ErrorScreen from "$app/error/ErrorScreen";
import Container from "$app/layout/Container";
import TreeWrapper from "$app/tree/TreeWrapper";

export default function Index() {
	const { colorMode, toggleColorMode } = useColorMode();
	const [expr, setExpr] = useState("");
	const treeMutation = trpc.useMutation(["tree"]);
	const simplifiedTreeMutation = trpc.useMutation(["simplifiedTree"]);

	function handleCalc() {
		treeMutation.mutate({ expr });
		simplifiedTreeMutation.mutate({ expr });
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
					Simplify Terms
				</Text>
				<HStack w="100%">
					<Input
						onChange={(e) => {
							setExpr(e.target.value);
						}}
						value={expr}
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
						Simplify
					</Button>
				</HStack>
			</VStack>
			<Tabs align="center" variant="soft-rounded">
				<TabList>
					<Tab mx={2}>Expression Tree</Tab>
					<Tab mx={2}>Simplified Expression Tree</Tab>
					<Tab mx={2}>Debug</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						{treeMutation.data && (
							<TreeWrapper
								rootNode={treeMutation.data}
								animate={false}
							/>
						)}
						{treeMutation.error && (
							<ErrorScreen message={treeMutation.error.message} />
						)}
					</TabPanel>
					<TabPanel>
						{simplifiedTreeMutation.data?.tree && (
							<TreeWrapper
								rootNode={simplifiedTreeMutation.data.tree}
								animate={false}
							/>
						)}
						{simplifiedTreeMutation.error && (
							<ErrorScreen
								message={simplifiedTreeMutation.error.message}
							/>
						)}
					</TabPanel>
					<TabPanel>
						{simplifiedTreeMutation.data?.spans && (
							<Debug spans={simplifiedTreeMutation.data.spans} />
						)}
						{simplifiedTreeMutation.error && (
							<ErrorScreen
								message={simplifiedTreeMutation.error.message}
							/>
						)}
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Container>
	);
}
