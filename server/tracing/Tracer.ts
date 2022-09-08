import type { Expression } from "$cas/expressions/Expression";
import toFrontSpan, { FrontEndSpan } from "./FrontendSpan";
import Span from "./Span";

export class Tracer {
	private spans: Span[];

	private counter: number;

	private activeSpan: Span | null;

	private recording: boolean;

	constructor() {
		this.spans = [];
		this.counter = 0;
		this.activeSpan = null;
		this.recording = true;
	}

	StartSpan(name: string, tree: Expression | null | undefined) {
		const span = new Span(name, this, (this.counter += 1), tree);

		if (!this.recording) {
			return span;
		}

		if (this.activeSpan == null) {
			this.spans.push(span);
			this.activeSpan = span;
			return span;
		}

		this.activeSpan?.AddChild(span);
		this.activeSpan = span;
		return span;
	}

	StartNonRecordingSpan(name: string, tree: Expression | null | undefined) {
		const span = this.StartSpan(name, tree);
		this.recording = false;
		return span;
	}

	SetActiveSpan(span: Span | null) {
		this.activeSpan = span;
	}

	SetRecording(recording: boolean) {
		this.recording = recording;
	}

	GetSpans(): null | FrontEndSpan[] {
		return this.spans.map((span) => toFrontSpan(span));
	}
}

const traceService = {
	tracer: new Tracer(),
};

export function newTracer() {
	traceService.tracer = new Tracer();
}

export function getTracer() {
	return traceService.tracer;
}
