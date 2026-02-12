import { DatasetCoreBase } from "./DatasetCoreBase.js"
import type { DataFactory, DatasetCore, Term } from "@rdfjs/types"

type TermWrapperConstructor<T> = new (term: Term, dataset: DatasetCore, factory: DataFactory) => T

export class DatasetWrapper extends DatasetCoreBase {
    protected* subjectsOf<T>(termWrapper: TermWrapperConstructor<T>, predicate?: string, object?: string | Term, graph?: string): Iterable<T> {
        for (const q of this.match(undefined, toTerm(predicate, this.factory), toTerm(object, this.factory), toTerm(graph, this.factory))) {
            yield new termWrapper(q.subject, this, this.factory)
        }
    }

    protected* objectsOf<T>(termWrapper: TermWrapperConstructor<T>, predicate?: string, subject?: string | Term, graph?: string): Iterable<T> {
        for (const q of this.match(toTerm(subject, this.factory), toTerm(predicate, this.factory), undefined, toTerm(graph, this.factory))) {
            yield new termWrapper(q.object, this, this.factory)
        }
    }

    protected instancesOf<T>(classTerm: string, constructor: TermWrapperConstructor<T>): Iterable<T> {
        // TODO: Vocab
        const rdfType = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"

        return this.subjectsOf(constructor, rdfType, classTerm)
    }
}

function toTerm(value: string | Term | undefined, factory: DataFactory): Term | undefined {
    return typeof value === "string" ? factory.namedNode(value) : value
}
