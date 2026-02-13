import type { DatasetCore, DataFactory, Quad, Quad_Object, Quad_Subject, Term } from "@rdfjs/types"
import type { TermMapping } from "./type/TermMapping.js"
import type { ValueMapping } from "./type/ValueMapping.js"


export class TermWrapper {
    public constructor(public readonly term: Term, public readonly dataset: DatasetCore, public readonly factory: DataFactory) {
    }

    public static as<T>(constructor: new (term: Term, dataset: DatasetCore, factory: DataFactory) => T): ValueMapping<T> {
        return (n: TermWrapper) => new constructor(n.term, n.dataset, n.factory)
    }

    protected singular<T>(p: string, valueMapping: ValueMapping<T>): T {
        const predicate = this.factory.namedNode(p)

        return valueMapping(
            new TermWrapper(
                [...this.dataset.match(this.term, predicate)][0]!.object,
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


class WrappingSet<T> implements Set<T> {
    // TODO: Direction
    public constructor(private readonly subject: TermWrapper, private readonly predicate: string, private readonly valueMapping: ValueMapping<T>, private readonly termMapping: TermMapping<T>) {
        this.subject = subject
        this.predicate = predicate
        this.valueMapping = valueMapping
        this.termMapping = termMapping
    }

    add(value: T): this {
        this.subject.dataset.add(this.quad(value))
        return this
    }

    clear(): void {
        for (const q of this.matches) {
            this.subject.dataset.delete(q)
        }
    }

    delete(value: T): boolean {
        if (!this.has(value)) {
            return false
        }

        const o = this.termMapping(value, this.subject.dataset, this.subject.factory)?.term // TODO: guards
        const p = this.subject.factory.namedNode(this.predicate)

        for (const q of this.subject.dataset.match(this.subject.term, p, o)) {
            this.subject.dataset.delete(q)
        }

        return true
    }

    forEach(cb: (item: T, index: T, set: Set<T>) => void, thisArg?: any): void {
        for (const item of this) {
            cb.call(thisArg, item, item, this)
        }
    }

    has(value: T): boolean {
        return this.subject.dataset.has(this.quad(value))
    }

    get size(): number {
        return this.matches.size
    }

    [Symbol.iterator](): SetIterator<T> {
        return this.values()
    }

    * entries(): SetIterator<[T, T]> {
        for (const v of this) {
            yield [v, v]
        }
    }

    keys(): SetIterator<T> {
        return this.values()
    }

    * values(): SetIterator<T> {
        for (const q of this.matches) {
            yield this.valueMapping(new TermWrapper(q.object, this.subject.dataset, this.subject.factory))
        }
    }

    get [Symbol.toStringTag](): string {
        return `collection wrapper for subject ${this.subject} predicate ${this.predicate}` // TODO: Direction
    }

    private quad(value: T): Quad {
        const s = this.subject.term as Quad_Subject // TODO: guard
        const p = this.subject.factory.namedNode(this.predicate)
        const o = this.termMapping(value, this.subject.dataset, this.subject.factory)?.term as Quad_Object // TODO: guards
        const q = this.subject.factory.quad(s, p, o)
        return q
    }

    private get matches(): DatasetCore {
        const p = this.subject.factory.namedNode(this.predicate)
        return this.subject.dataset.match(this.subject.term, p)
    }
}
