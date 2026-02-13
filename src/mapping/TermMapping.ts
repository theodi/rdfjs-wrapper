import type { DataFactory, DatasetCore } from "@rdfjs/types"

import { TermWrapper } from "../TermWrapper.js"


/*
 * Write to the RDF dataset
 * Transform JavaScript primitive types to Term Wrapper
 * Generic Term Wrapper factories
*/
export namespace TermMapping {
    export function stringToLiteral(value: string | undefined, dataset: DatasetCore, factory: DataFactory): TermWrapper | undefined {
        // TODO: Check setting of undefined values
        if (value === undefined) {
            return undefined
        }

        return new TermWrapper(factory.literal(value), dataset, factory)
    }

    export function dateToLiteral(value: Date | undefined, dataset: DatasetCore, factory: DataFactory): TermWrapper | undefined {
        if (value === undefined) {
            return undefined
        }

        return new TermWrapper(factory.literal(value.toISOString(), factory.namedNode("http://www.w3.org/2001/XMLSchema#date")), dataset, factory)
    }

    export function numberToLiteral(value: number | undefined, dataset: DatasetCore, factory: DataFactory): TermWrapper | undefined {
        if (value === undefined) {
            return undefined
        }

        // TODO: Think about other types corresponding to number
        return new TermWrapper(factory.literal(value.toString(), factory.namedNode("http://www.w3.org/2001/XMLSchema#double")), dataset, factory)
    }

    export function stringToIri(value: string | undefined, dataset: DatasetCore, factory: DataFactory): TermWrapper | undefined {
        if (value === undefined) {
            return undefined
        }

        return new TermWrapper(factory.namedNode(value), dataset, factory)
    }
}
