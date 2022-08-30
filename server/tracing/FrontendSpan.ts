import type FrontendExpressionTree from "../tree/FrontendExpressionTree"
import type Span from "./Span"

export interface FrontEndSpan {
    children: FrontEndSpan[]
    tree: FrontendExpressionTree
    name: string
    id: number
}

export default function toFrontSpan(span: Span) : FrontEndSpan{
    const {tree, name, id} = span
    const children = span.children.map((child) => toFrontSpan(child))
    return {children, tree, name, id}
}