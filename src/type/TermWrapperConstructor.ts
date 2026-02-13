import type { DataFactory, DatasetCore, Term } from "@rdfjs/types"


export type TermWrapperConstructor<T> = new (term: Term, dataset: DatasetCore, factory: DataFactory) => T
