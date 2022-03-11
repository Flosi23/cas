import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
	Box,
	Text,
	Input,
	VStack,
	Flex,
	IconButton,
	useColorMode,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	HStack,
	Button,
} from "@chakra-ui/react";

export default function Index() {
	const { colorMode, toggleColorMode } = useColorMode();
	const gradient =
		"linear(to-l, var(--chakra-colors-brand-700), var(--chakra-colors-brand-400))";

	return (
		<Box px="20vw" my={5}>
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
					bgGradient={gradient}
					bgClip="text"
					textAlign="center"
					fontWeight="extrabold"
					fontSize="6xl">
					Computer Algebra System
				</Text>
				<HStack w="100%">
					<Input
						variant="filled"
						placeholder="Expression... (e.g 2 + 4)"
						fontWeight="bold"
						focusBorderColor="brand.500"
						size="lg"
					/>
					<Button size="lg">Calculate</Button>
				</HStack>
			</VStack>
			<Tabs align="center" variant="soft-rounded">
				<TabList>
					<Tab mx={2}>Results</Tab>
					<Tab mx={2}>Expression Tree</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<p>Results</p>
					</TabPanel>
					<TabPanel>
						<p>Expression Tree</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
}
