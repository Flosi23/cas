import type Expression from "$/server/cas/expressions/Expression";
import { Tabs, Tab, TabList, TabPanel, TabPanels } from "@chakra-ui/react";

export default function Results({ tree }: { tree: Expression }) {
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
					<p>Expression Tree</p>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
}
