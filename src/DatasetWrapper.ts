import { DatasetCoreBase } from "./DatasetCoreBase.js"
import type { DataFactory, DatasetCore, Term } from "@rdfjs/types"

type TermWrapperConstructor<T> = new (term: Term, dataset: DatasetCore, factory: DataFactory) => T

export class DatasetWrapper extends DatasetCoreBase {
    protected* subjectsOf<T>(termWrapper: TermWrapperConstructor<T>, predicate?: Term, object?: Term, graph?: Term): Iterable<T> {
        for (const q of this.match(undefined, predicate, object, graph)) {
            yield new termWrapper(q.subject, this, this.factory)
        }
    }

    protected* objectsOf<T>(termWrapper: TermWrapperConstructor<T>, subject?: Term, predicate?: Term, graph?: Term): Iterable<T> {
        for (const q of this.match(subject, predicate, undefined, graph)) {
            yield new termWrapper(q.object, this, this.factory)
        }
    }

    protected* objectsOfX<T>([s, p, g]: [Term?, Term?, Term?], termWrapper: TermWrapperConstructor<T>): Iterable<T> {
        for (const q of this.match(s, p, undefined, g)) {
            yield new termWrapper(q.object, this, this.factory)
        }
    }

    protected* subjectsOfX<T>([p, o, g]: [Term?, Term?, Term?], termWrapper: TermWrapperConstructor<T>): Iterable<T> {
        for (const q of this.match(undefined, p, o, g)) {
            yield new termWrapper(q.subject, this, this.factory)
        }
    }

    protected instancesOf<T>(constructor: TermWrapperConstructor<T>, classTerm: Term): Iterable<T> {
        // TODO: Vocab
        const rdfType = this.factory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type")

        return this.subjectsOf(constructor, rdfType, classTerm)
    }
}
