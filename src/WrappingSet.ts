import { Wrapper } from "./Wrapper.js"
import type { TermMapping } from "./TermMapping.js"
import type { ValueMapping } from "./ValueMapping.js"
import type { DatasetCore, Quad, Quad_Object, Quad_Predicate, Quad_Subject } from "@rdfjs/types"

export class WrappingSet<T> implements Set<T> {
    // TODO: Private identifiers instead?
    private subject: Wrapper
    private predicate: Quad_Predicate
    private valueMapping: ValueMapping<T>
    private termMapping: TermMapping<T>

    // TODO: Direction
    constructor(subject: Wrapper, predicate: Quad_Predicate, valueMapping: ValueMapping<T>, termMapping: TermMapping<T>) {
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

        for (const q of this.subject.dataset.match(this.subject.term, this.predicate, o)) {
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
            yield this.valueMapping(new Wrapper(q.object, this.subject.dataset, this.subject.factory))
        }
    }

    get [Symbol.toStringTag](): string {
        return `collection wrapper for subject ${this.subject} predicate ${this.predicate}` // TODO: Direction
    }

    private quad(value: T): Quad {
        const s = this.subject.term as Quad_Subject // TODO: guard
        const o = this.termMapping(value, this.subject.dataset, this.subject.factory)?.term as Quad_Object // TODO: guards
        const q = this.subject.factory.quad(s, this.predicate, o)
        return q
    }

    private get matches(): DatasetCore {
        return this.subject.dataset.match(this.subject.term, this.predicate)
    }
}
