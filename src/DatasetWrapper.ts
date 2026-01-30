import { DatasetCoreBase } from "./DatasetCoreBase.js"
import type { DataFactory, DatasetCore, Term } from "@rdfjs/types"

type TermWrapperConstructor<T> = new (term: Term, dataset: DatasetCore, factory: DataFactory) => T

export class DatasetWrapper extends DatasetCoreBase {
    protected subjectsOf<T>(predicate: string, termWrapper: TermWrapperConstructor<T>): Iterable<T> {
        return this.matchSubjectsOf(termWrapper, predicate)
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
        return this.matchObjectsOf(termWrapper, undefined, predicate)
    }

    protected* matchObjectsOf<T>(termWrapper: TermWrapperConstructor<T>, subject?: string, predicate?: string, graph?: string): Iterable<T> {
        const s = subject ? this.factory.namedNode(subject) : undefined
        const p = predicate ? this.factory.namedNode(predicate) : undefined
        const g = graph ? this.factory.namedNode(graph) : undefined

        for (const q of this.match(s, p, undefined, g)) {
            yield new termWrapper(q.object, this, this.factory)
        }
    }

    protected instancesOf<T>(classTerm: string, constructor: TermWrapperConstructor<T>): Iterable<T> {
        // TODO: Vocab
        const rdfType = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"

        return this.matchSubjectsOf(constructor, rdfType, classTerm)
    }
}
