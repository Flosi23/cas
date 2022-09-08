import type { PropsWithChildren } from "react";
import { Box, ChakraProps } from "@chakra-ui/react";

export default function Container(props: PropsWithChildren<ChakraProps>) {
	return <Box my={5} px="10vw" {...props} />;
}
