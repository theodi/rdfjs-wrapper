import { TermWrapper } from "./TermWrapper.js"
import type { Term } from "@rdfjs/types"
import { ValueMapping } from "./mapping/ValueMapping.js"
import { TermMapping } from "./mapping/TermMapping.js"
import { RDF } from "./vocabulary/RDF.js"
import type { IValueMapping } from "./type/IValueMapping"
import type { ITermMapping } from "./type/ITermMapping.js"

export class ListItem<T> extends TermWrapper {
    constructor(term: TermWrapper, private readonly valueMapping: IValueMapping<T>, private readonly termMapping: ITermMapping<T>) {
        super(term.term, term.dataset, term.factory)
    }

    private get firstRaw(): Term | undefined {
        return this.singularNullable(RDF.first, ValueMapping.asIs)
    }

    private set firstRaw(value: Term | undefined) {
        this.overwriteNullable(RDF.first, value, TermMapping.asIs)
    }

    private get restRaw(): Term | undefined {
        return this.singularNullable(RDF.rest, ValueMapping.asIs)
    }

    private set restRaw(value: Term | undefined) {
        this.overwriteNullable(RDF.rest, value, TermMapping.asIs)
    }

    public get isListItem(): boolean {
        return this.firstRaw !== undefined && this.restRaw !== undefined
    }

    public get first(): T {
        return this.singular(RDF.first, this.valueMapping)
    }

    public set first(value: T) {
        this.overwrite(RDF.first, value, this.termMapping)
    }

    public get rest(): ListItem<T> {
        return this.singular(RDF.rest, w => new ListItem(w, this.valueMapping, this.termMapping))
    }

    public pop(): T {
        try {
            return this.first
        } finally {
            this.firstRaw = undefined
            this.restRaw = this.factory.namedNode(RDF.nil)
        }
    }

    public push(...items: T[]) {
        let current: ListItem<T> = this

        for (const item of items) {
            current.restRaw = this.factory.blankNode()

            current.rest.first = item
            current.rest.restRaw = this.factory.namedNode(RDF.nil)

            current = current.rest
        }

        return items.length
    }

    public* items(): Iterable<ListItem<T>> {
        if (!this.isListItem) {
            return
        }

        yield this

        for (const more of this.rest.items()) {
            yield more
        }
    }

    shift(): T | undefined {
        const rest = this.rest
        if (!rest.isListItem) {
            throw new Error("?")
        }

        const shifted = this.first
        const nextFirst = rest.firstRaw
        const nextRest = rest.restRaw

        rest.firstRaw = undefined
        rest.restRaw = undefined

        this.firstRaw = nextFirst
        this.restRaw = nextRest

        return shifted
    }
}
