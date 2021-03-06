import { Tabs, Tab, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import type { FrontendExpressionTree } from "$tree";
import TreeWrapper from "$app/tree/TreeWrapper";

export default function Results({
	tree,
	simplifiedTree,
}: {
	tree: FrontendExpressionTree;
	simplifiedTree: FrontendExpressionTree;
}) {
	return (
		<Tabs align="center" variant="soft-rounded">
			<TabList>
				<Tab mx={2}>Results</Tab>
				<Tab mx={2}>Expression Tree</Tab>
				<Tab mx={2}>Simplified Expression Tree</Tab>
			</TabList>

			<TabPanels>
				<TabPanel>
					<p>Results</p>
				</TabPanel>
				<TabPanel>
					<TreeWrapper rootNode={tree} />
				</TabPanel>
				<TabPanel>
					<TreeWrapper rootNode={simplifiedTree} />
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
}
