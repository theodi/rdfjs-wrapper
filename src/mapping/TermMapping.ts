import type { DataFactory, DatasetCore } from "@rdfjs/types"

import { TermWrapper } from "../TermWrapper.js"


/*
 * Write to the RDF dataset
 * Transform JavaScript primitive types to Term Wrapper
 * Generic Term Wrapper factories
*/
export namespace TermMapping {
    export function stringToLiteral(value: string, dataset: DatasetCore, factory: DataFactory): TermWrapper | undefined {
        return new TermWrapper(factory.literal(value), dataset, factory)
    }

    // TODO: Lang string to literal

    export function dateToLiteral(value: Date, dataset: DatasetCore, factory: DataFactory): TermWrapper | undefined {
        return new TermWrapper(factory.literal(value.toISOString(), factory.namedNode("http://www.w3.org/2001/XMLSchema#date")), dataset, factory)
    }

    export function numberToLiteral(value: number, dataset: DatasetCore, factory: DataFactory): TermWrapper | undefined {
        return new TermWrapper(factory.literal(value.toString(), factory.namedNode("http://www.w3.org/2001/XMLSchema#double")), dataset, factory)
    }

    export function stringToIri(value: string, dataset: DatasetCore, factory: DataFactory): TermWrapper | undefined {
        return new TermWrapper(factory.namedNode(value), dataset, factory)
    }

    // TODO: String to blank node
}
