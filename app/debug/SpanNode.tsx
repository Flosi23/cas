import type { FrontEndSpan } from "$/server/tracing/FrontendSpan";
import { Box, HStack, useColorModeValue, VStack } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";

export default function SpanNode({
    span,
    selected, 
    setSelected
} : {
    span: FrontEndSpan,
    selected: number,
    setSelected: Dispatch<SetStateAction<number>>
}) {
    const bgColor = useColorModeValue("gray.100", "gray.700")

    return(
    <VStack alignItems="start">
        <HStack 
            py={1} 
            px={2} 
            border="1px" 
            rounded="3xl" 
            justifyContent="space-between"
            backgroundColor={span.id == selected ? bgColor : "transparent"}
        >
            <Box onClick={() => {setSelected(span.id)}} flex='1' textAlign='left'>
                {span.id + 1}. {span.name}
            </Box>
            {span.children.length > 0 ? 
                <></>
            : <></>}
        </HStack>
        {span.children.length > 0 ?
            <VStack pl={3} alignItems="start">
                {span.children.map((span) => 
                    <SpanNode span={span} selected={selected} setSelected={setSelected}/>
                )}
            </VStack>
        : <></>}
    </VStack>
    );
}