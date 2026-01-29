import type { ValueMapping } from "./ValueMapping.js"
import type { TermMapping } from "./TermMapping.js"
import { WrappingSet } from "./WrappingSet.js"
import type { DataFactory, DatasetCore, Quad_Object, Quad_Predicate, Quad_Subject, Term } from "@rdfjs/types"

export class TermWrapper {
    public constructor(public readonly term: Term, public readonly dataset: DatasetCore, public readonly factory: DataFactory) {
    }

    public static as<T>(constructor: new (term: Term, dataset: DatasetCore, factory: DataFactory) => T): ValueMapping<T> {
        return (n: TermWrapper) => new constructor(n.term, n.dataset, n.factory)
    }

    protected singular<T>(p: Quad_Predicate, valueMapping: ValueMapping<T>): T {
        return valueMapping(
            new TermWrapper(
                [...this.dataset.match(this.term, p)][0]!.object,
                this.dataset,
                this.factory
            )
        )
    }

    protected singularNullable<T>(p: Quad_Predicate, valueMapping: ValueMapping<T>): T | undefined {
        for (const q of this.dataset.match(this.term, p)) {
            return valueMapping(new TermWrapper(q.object, this.dataset, this.factory))
        }

        return
    }

    protected objects<T>(p: Quad_Predicate, valueMapping: ValueMapping<T>, termMapping: TermMapping<T>): Set<T> {
        return new WrappingSet(this, p, valueMapping, termMapping)
    }

    protected overwriteNullable<T>(p: Quad_Predicate, value: T | undefined, termMapping: TermMapping<T>): void {
        for (const q of this.dataset.match(this.term, p)) {
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

        const q = this.factory.quad(this.term, p, o.term)
        this.dataset.add(q)
    }

    protected overwrite<T>(p: Quad_Predicate, value: T, nodeMapping: TermMapping<T>): void {
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
