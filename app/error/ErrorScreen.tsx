import { WarningIcon } from "@chakra-ui/icons";
import {
	Flex,
	Heading,
	Text,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";

export default function ErrorScreen({ message }: { message: string }) {
	return (
		<Flex width="100%" py={8} justify="center">
			<VStack
				gap={2}
				px={16}
				py={8}
				bg={useColorModeValue("red.200", "red.400")}
				rounded="xl">
				<WarningIcon boxSize={8} />
				<Heading size="sm">An Error Occurred :(</Heading>
				<Text>{message}</Text>
			</VStack>
		</Flex>
	);
}
