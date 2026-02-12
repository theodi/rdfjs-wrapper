import type { ValueMapping } from "./ValueMapping.js"
import type { TermMapping } from "./TermMapping.js"
import { WrappingSet } from "./WrappingSet.js"
import type { DataFactory, DatasetCore, Quad_Object, Quad_Subject, Term } from "@rdfjs/types"

export class TermWrapper {
    public constructor(public readonly term: Term, public readonly dataset: DatasetCore, public readonly factory: DataFactory) {
    }

    public static as<T>(constructor: new (term: Term, dataset: DatasetCore, factory: DataFactory) => T): ValueMapping<T> {
        return (n: TermWrapper) => new constructor(n.term, n.dataset, n.factory)
    }

    protected singular<T>(p: string, valueMapping: ValueMapping<T>): T {
        const predicate = this.factory.namedNode(p)

        let object: Term | undefined;

        // Libraries such as N3.js may not immediately materialize a dataset,
        // but instead return an iterator that materializes matching quads on demand.
        // Spreading this iterator with [...this.dataset.match(this.term, predicate)]
        // would materialize all matching quads, even though we only need the first one.
        for (const q of this.dataset.match(this.term, predicate)) {
            object = q.object;
            break;
        }

        if (object === undefined) {
            throw new Error(`No value found for predicate ${p} on term ${this.term.value}`)
        }

        return valueMapping(
            new TermWrapper(
                object,
                this.dataset,
                this.factory
            )
        )
    }

    protected singularNullable<T>(p: string, valueMapping: ValueMapping<T>): T | undefined {
        const predicate = this.factory.namedNode(p)

        for (const q of this.dataset.match(this.term, predicate)) {
            return valueMapping(new TermWrapper(q.object, this.dataset, this.factory))
        }

        return
    }

    protected objects<T>(p: string, valueMapping: ValueMapping<T>, termMapping: TermMapping<T>): Set<T> {
        return new WrappingSet(this, p, valueMapping, termMapping)
    }

    protected overwriteNullable<T>(p: string, value: T | undefined, termMapping: TermMapping<T>): void {
        const predicate = this.factory.namedNode(p)

        for (const q of this.dataset.match(this.term, predicate)) {
            this.dataset.delete(q)
        }

        if (value === undefined) {
            return
        }

        if (!TermWrapper.isQuadSubject(this.term)) {
            return // TODO: throw error?
        }

        const o = termMapping(value, this.dataset, this.factory)

        if (o === undefined) {
            return // TODO: throw error?
        }

        if (!TermWrapper.isQuadObject(o.term)) {
            return // TODO: throw error?
        }

        const q = this.factory.quad(this.term, predicate, o.term)
        this.dataset.add(q)
    }

    protected overwrite<T>(p: string, value: T, nodeMapping: TermMapping<T>): void {
        if (value === undefined) {
            throw new Error("value cannot be undefined")
        }

        this.overwriteNullable(p, value, nodeMapping)
    }

    private static isQuadSubject(term: Term): term is Quad_Subject {
        return ["NamedNode", "BlankNode", "Quad", "Variable"].includes(term.termType)
    }

    private static isQuadObject(term: Term): term is Quad_Object {
        return ["NamedNode", "Literal", "BlankNode", "Quad", "Variable"].includes(term.termType)
    }
}
