import type Span from "./Span";
import type { FrontendExpressionTree } from "$tree";

export interface FrontEndSpan {
	children: FrontEndSpan[];
	tree: FrontendExpressionTree | null | undefined;
	name: string;
	id: number;
}

export default function toFrontSpan(span: Span): FrontEndSpan {
	const { tree, name, id } = span;
	const children = span.children.map((child) => toFrontSpan(child));
	return { children, id, name, tree };
}
