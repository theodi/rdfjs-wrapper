import type { DataFactory, DatasetCore, Term } from "@rdfjs/types"
import { DatasetCoreBase } from "./DatasetCoreBase.js"
import { RDF } from "./Vocabulary.js"

type TermWrapperConstructor<T> = new (term: Term, dataset: DatasetCore, factory: DataFactory) => T

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

    protected* instancesOf<T>(classTerm: string, constructor: TermWrapperConstructor<T>): Iterable<T> {
        for (const q of this.matchSubjectsOf(constructor, RDF.type, classTerm)) {
            yield q
        }
    }
}
