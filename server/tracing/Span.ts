import type { Expression } from "$cas/expressions/Expression";
import type FrontendExpressionTree from "../tree/FrontendExpressionTree";
import type { Tracer } from "./Tracer";
import { calcTreeSpacing } from "../tree/tree";

export default class Span {
	public children: Span[];

	public tree: FrontendExpressionTree | null;

	public name: string;

	public id: number;

	private parent: Span | null;

	private tracer: Tracer;

	constructor(
		name: string,
		tracer: Tracer,
		id: number,
		tree: Expression | undefined | null,
	) {
		this.children = [];
		this.tree = tree ? calcTreeSpacing(tree) : null;
		this.name = name;
		this.tracer = tracer;
		this.id = id;
		this.parent = null;
	}

	AddChild(span: Span) {
		span.parent = this;
		this.children.push(span);
	}

	End() {
		this.tracer.SetActiveSpan(this.parent);
		this.tracer.SetRecording(true);
	}
}
