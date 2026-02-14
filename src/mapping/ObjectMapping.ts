import type { DataFactory, DatasetCore, Term } from "@rdfjs/types"
import type { IValueMapping } from "../type/IValueMapping.js"
import type { TermWrapper } from "../TermWrapper.js"


/*
 * Read and write the RDF dataset
 * Map RDF to Term Wrapper instances
 * Map Term Wrappers instances to RDF
 *
 * A self-invoking Value Mapping that returns a Term Wrapper
 * and therefore can be used as a Value and a Term Mapping
 *
 * This essentially works because reading writing the graph will only materialise when hitting a property
 *
*/
export namespace ObjectMapping {
    export function as<T>(constructor: new (term: Term, dataset: DatasetCore, factory: DataFactory) => T): IValueMapping<T> {
        return (termWrapper: TermWrapper) => new constructor(termWrapper.term, termWrapper.dataset, termWrapper.factory)
    }
}
