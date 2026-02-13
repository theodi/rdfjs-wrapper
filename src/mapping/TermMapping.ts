import type { DataFactory, DatasetCore } from "@rdfjs/types"

import { TermWrapper } from "../TermWrapper.js"


/*
 * Write to the RDF dataset
 * Transform JavaScript primitive types to Term Wrapper
 * Generic Term Wrapper factories
*/
export namespace TermMapping {
    // TODO: consider not allowing null value here, should be taken care of upstream
    export function stringToLiteral(value: string | undefined, dataset: DatasetCore, factory: DataFactory): TermWrapper | undefined {
        // TODO: Check I don't think there's a way to hit this currently
        // TODO: Check, this would probably only be hit if the TermWrapper method is bogus (see overwrite nullable)
        if (value === undefined) {
            return undefined
        }

        return new TermWrapper(factory.literal(value), dataset, factory)
    }

    // TODO: consider not allowing null value here, should be taken care of upstream
    export function dateToLiteral(value: Date | undefined, dataset: DatasetCore, factory: DataFactory): TermWrapper | undefined {
        // TODO: CHeck, this would probably only be hit if the TermWrapper method is bogus (see overwrite nullable)
        if (value === undefined) {
            return undefined
        }

        return new TermWrapper(factory.literal(value.toISOString(), factory.namedNode("http://www.w3.org/2001/XMLSchema#date")), dataset, factory)
    }

    // TODO: consider not allowing null value here, should be taken care of upstream
    export function numberToLiteral(value: number | undefined, dataset: DatasetCore, factory: DataFactory): TermWrapper | undefined {
        // TODO: CHeck, this would probably only be hit if the TermWrapper method is bogus (see overwrite nullable)
        if (value === undefined) {
            return undefined
        }

        // TODO: Think about other types corresponding to number
        return new TermWrapper(factory.literal(value.toString(), factory.namedNode("http://www.w3.org/2001/XMLSchema#double")), dataset, factory)
    }

    // TODO: consider not allowing null value here, should be taken care of upstream
    export function stringToIri(value: string | undefined, dataset: DatasetCore, factory: DataFactory): TermWrapper | undefined {
        // TODO: CHeck, this would probably only be hit if the TermWrapper method is bogus (see overwrite nullable)
        if (value === undefined) {
            return undefined
        }

        return new TermWrapper(factory.namedNode(value), dataset, factory)
    }
}
