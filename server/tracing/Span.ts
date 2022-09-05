import type { Expression } from "$cas/expressions/Expression"
import type FrontendExpressionTree from "../tree/FrontendExpressionTree"
import { calcTreeSpacing } from "../tree/tree"
import type {Tracer} from "./Tracer"

export default class Span {

    public children: Span[]
    public tree: FrontendExpressionTree | null | undefined
    public name: string
    public id: number
    private parent: Span | null
    private tracer: Tracer


    constructor(name: string, tracer: Tracer, id: number) {
        this.children = []
        this.tree = null
        this.name = name
        this.tracer = tracer
        this.id = id
        this.parent = null
    } 

    SetTree(expr: Expression | undefined | null) : Span {
        if(!expr){
            return this;
        }

        this.tree = calcTreeSpacing(expr)
        return this;
    }

    AddChild(span: Span) {
        span.parent = this
        this.children.push(span)
    }


    End() {
        this.tracer.SetActiveSpan(this.parent)
    }
}