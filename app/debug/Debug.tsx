import type { FrontEndSpan } from "$/server/tracing/FrontendSpan";
import TreeWrapper from "$app/tree/TreeWrapper";
import type { FrontendExpressionTree } from "$tree";
import { Flex, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SpanNode from "./SpanNode";

export default function Debug({spans}: {spans: FrontEndSpan[] | null}) {
    const [selected, setSelected] = useState(-1)
    const [tree, setTree] = useState<FrontendExpressionTree | null | undefined>(null)

    if(spans == null || spans.length == 0){
        return <Text>No Debug Data was recorded</Text>
    }

    useEffect(() => {
        setTree(spans.map((span) => find(span, selected)).find((r) => r != null)?.tree)
    }, [selected])

    console.log(spans)

    function find(span: FrontEndSpan, id: number) : FrontEndSpan | undefined{
        if(span.id === id) {
            return span
        }

        return span.children.map((child) => find(child, id)).find((r) => r != null)
    }

    return (
        <Flex>
            <VStack alignItems="start">
                {spans.map((span) => 
                    <SpanNode span={span} selected={selected} setSelected={setSelected}/>
                )}
            </VStack>
            {tree ? 
                <TreeWrapper rootNode={tree}/>
            : <></>}
        </Flex>
    );
}