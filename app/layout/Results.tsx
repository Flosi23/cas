import { Tabs, Tab, TabList, TabPanel, TabPanels, Box } from "@chakra-ui/react";
import type { FrontendExpressionTree } from "$tree";
import TreeNode from "$app/tree/TreeNode";

export default function Results({ tree }: { tree: FrontendExpressionTree }) {
	return (
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
					<Box my={10} w="min-content" position="relative">
						<TreeNode node={tree} />
					</Box>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
}
