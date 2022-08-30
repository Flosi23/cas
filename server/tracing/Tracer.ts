import type { Expression } from "$cas/expressions/Expression";
import { calcTreeSpacing } from "../tree/tree";
import toFrontSpan, { FrontEndSpan } from "./FrontendSpan";
import Span from "./Span";

export class Tracer {

    private spans: Span[] 
    private counter: number
    protected activeSpan: Span | null

    constructor() {
        this.spans = []
        this.counter = 0
        this.activeSpan = null
    }

    StartSpan(name: string,) {
        const span = new Span(name, this, this.counter++);
        
        if(this.activeSpan == null){
            this.spans.push(span)
            this.activeSpan = span;
            return span;
        }

        this.activeSpan?.AddChild(span)
        this.activeSpan = span
        return span;
    }

    SetActiveSpan(span: Span | null){
        this.activeSpan = span
    }

    GetSpans() : null | FrontEndSpan[]{ 
        return this.spans.map((span) => toFrontSpan(span))
    }
}

const traceService = {
    tracer: new Tracer()
}

export function newTracer(){
    traceService.tracer = new Tracer()
}

export function getTracer() {
    return traceService.tracer
}