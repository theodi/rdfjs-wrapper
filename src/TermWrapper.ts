import type { DatasetCore, DataFactory, Quad, Quad_Object, Quad_Subject, Term } from "@rdfjs/types"
import type { ITermMapping } from "./type/ITermMapping.js"
import type { IValueMapping } from "./type/IValueMapping.js"


export class TermWrapper {
    public readonly term: Term;
    public readonly dataset: DatasetCore;
    public readonly factory: DataFactory;

    public constructor(term: string, dataset: DatasetCore, factory: DataFactory);
    public constructor(term: Term, dataset: DatasetCore, factory: DataFactory);
    public constructor(term: string | Term, dataset: DatasetCore, factory: DataFactory) {
        if (typeof term === "string") {
            this.term = factory.namedNode(term);
        }
        else {
            this.term = term;
        }
        this.dataset = dataset;
        this.factory = factory;
    }

    protected getSingular<T>(p: string, valueMapping: IValueMapping<T>): T {
        const predicate = this.factory.namedNode(p)
        const matches = this.dataset.match(this.term, predicate)

        // TODO: Expose standard errors
        if (matches.size > 1) {
            throw new Error(`More than one value for predicate ${p} on term ${this.term.value}`)
        }

        for (const q of matches) {
            return valueMapping(new TermWrapper(q.object, this.dataset, this.factory))
        }

        throw new Error(`No value found for predicate ${p} on term ${this.term.value}`)
    }

    protected getSingularNullable<T>(p: string, valueMapping: IValueMapping<T>): T | undefined {
        const predicate = this.factory.namedNode(p)

        for (const q of this.dataset.match(this.term, predicate)) {
            return valueMapping(new TermWrapper(q.object, this.dataset, this.factory))
        }

        return
    }

    protected setSingular<T>(p: string, value: T, nodeMapping: ITermMapping<T>): void {
        if (value === undefined) {
            throw new Error("value cannot be undefined")
        }

        this.setSingularNullable(p, value, nodeMapping)
    }

    protected setSingularNullable<T>(p: string, value: T | undefined, termMapping: ITermMapping<T>): void {
        const predicate = this.factory.namedNode(p)

        for (const q of this.dataset.match(this.term, predicate)) {
            this.dataset.delete(q)
        }

        // TODO: TermMapping undefined: Return after deleting quads if undefined
        if (value === undefined) {
            return
        }

        // TODO: Do we really need to test if this.term is a Quad Subject here?
        // @Samu I imagine this is tested at instantiation time in the constructor if at all
        if (!TermWrapper.isQuadSubject(this.term)) {
            return // TODO: throw error?
        }

        // TODO: TermMapping undefined: the term mapping is not invoked if undefined
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

    protected getSet<T>(p: string, valueMapping: IValueMapping<T>, termMapping: ITermMapping<T>): Set<T> {
        return new WrappingSet(this, p, valueMapping, termMapping)
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
    public constructor(private readonly subject: TermWrapper, private readonly predicate: string, private readonly valueMapping: IValueMapping<T>, private readonly termMapping: ITermMapping<T>) {
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
