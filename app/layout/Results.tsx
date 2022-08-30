import { Tabs, Tab, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import type { FrontendExpressionTree } from "$tree";
import TreeWrapper from "$app/tree/TreeWrapper";
import Debug from "$app/debug/Debug";
import type { FrontEndSpan } from "$/server/tracing/FrontendSpan";

export default function Results({
	tree,
	simplifiedTree,
	spans
}: {
	tree: FrontendExpressionTree;
	simplifiedTree: FrontendExpressionTree;
	spans: FrontEndSpan[] | null
}) {
	return (
		<Tabs align="center" variant="soft-rounded">
			<TabList>
				<Tab mx={2}>Expression Tree</Tab>
				<Tab mx={2}>Simplified Expression Tree</Tab>
				<Tab mx={2}>Debug</Tab>
			</TabList>

			<TabPanels>
				<TabPanel>
					<TreeWrapper rootNode={tree} />
				</TabPanel>
				<TabPanel>
					<TreeWrapper rootNode={simplifiedTree} />
				</TabPanel>
				<TabPanel>
					<Debug spans={spans}/>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
}
