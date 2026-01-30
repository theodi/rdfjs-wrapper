import { DatasetCoreBase } from "./DatasetCoreBase.js"
import type { DataFactory, DatasetCore, Term } from "@rdfjs/types"

type TermWrapperConstructor<T> = new (term: Term, dataset: DatasetCore, factory: DataFactory) => T

export class DatasetWrapper extends DatasetCoreBase {
    protected subjectsOf<T>(predicate: Term, termWrapper: TermWrapperConstructor<T>): Iterable<T> {
        return this.matchSubjectsOf(termWrapper, predicate)
    }

    protected* matchSubjectsOf<T>(termWrapper: TermWrapperConstructor<T>, predicate?: Term, object?: Term, graph?: Term): Iterable<T> {
        for (const q of this.match(undefined, predicate, object, graph)) {
            yield new termWrapper(q.subject, this, this.factory)
        }
    }

    protected* objectsOf<T>(predicate: Term, termWrapper: TermWrapperConstructor<T>): Iterable<T> {
        return this.matchObjectsOf(termWrapper, undefined, predicate)
    }

    protected* matchObjectsOf<T>(termWrapper: TermWrapperConstructor<T>, subject?: Term, predicate?: Term, graph?: Term): Iterable<T> {
        for (const q of this.match(subject, predicate, undefined, graph)) {
            yield new termWrapper(q.object, this, this.factory)
        }
    }

    protected instancesOf<T>(classTerm: Term, constructor: TermWrapperConstructor<T>): Iterable<T> {
        // TODO: Vocab
        const rdfType = this.factory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type")

        return this.matchSubjectsOf(constructor, rdfType, classTerm)
    }
}
