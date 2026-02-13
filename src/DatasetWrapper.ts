import type { DataFactory, DatasetCore, Quad, Term } from "@rdfjs/types"
import type {TermWrapperConstructor } from "./type/TermWrapperConstructor.js"

import { RDF } from "./vocabulary/RDF.js"


abstract class DatasetCoreBase implements DatasetCore {
    public constructor(private readonly dataset: DatasetCore, protected readonly factory: DataFactory) {
    }

    public get size(): number {
        return this.dataset.size
    }

    public [Symbol.iterator](): Iterator<Quad> {
        return this.dataset[Symbol.iterator]()
    }

    public add(quad: Quad): this {
        this.dataset.add(quad)
        return this
    }

    public delete(quad: Quad): this {
        this.dataset.delete(quad)
        return this
    }

    public has(quad: Quad): boolean {
        return this.dataset.has(quad)
    }

    public match(subject?: Term, predicate?: Term, object?: Term, graph?: Term): DatasetCore {
        return this.dataset.match(subject, predicate, object, graph)
    }
}

export class DatasetWrapper extends DatasetCoreBase {
    protected* subjectsOf<T>(predicate: string, termWrapper: TermWrapperConstructor<T>): Iterable<T> {
        for (const q of this.matchSubjectsOf(termWrapper, predicate)) {
            yield q
        }
    }

    protected* matchSubjectsOf<T>(termWrapper: TermWrapperConstructor<T>, predicate?: string, object?: string, graph?: string): Iterable<T> {
        const p = predicate ? this.factory.namedNode(predicate) : undefined
        const o = object ? this.factory.namedNode(object) : undefined
        const g = graph ? this.factory.namedNode(graph) : undefined

        for (const q of this.match(undefined, p, o, g)) {
            yield new termWrapper(q.subject, this, this.factory)
        }
    }

    protected* objectsOf<T>(predicate: string, termWrapper: TermWrapperConstructor<T>): Iterable<T> {
        for (const q of this.matchObjectsOf(termWrapper, undefined, predicate)) {
            yield q
        }
    }

    protected* matchObjectsOf<T>(termWrapper: TermWrapperConstructor<T>, subject?: string, predicate?: string, graph?: string): Iterable<T> {
        const s = subject ? this.factory.namedNode(subject) : undefined
        const p = predicate ? this.factory.namedNode(predicate) : undefined
        const g = graph ? this.factory.namedNode(graph) : undefined

        for (const q of this.match(s, p, undefined, g)) {
            yield new termWrapper(q.object, this, this.factory)
        }
    }

    protected* instancesOf<T>(type: string, constructor: TermWrapperConstructor<T>): Iterable<T> {
        for (const q of this.matchSubjectsOf(constructor, RDF.type, type)) {
            yield q
        }
    }
}
