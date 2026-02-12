import type { DataFactory, DatasetCore } from "@rdfjs/types"
import { TermWrapper } from "./TermWrapper.js"

export namespace TermMappings {
    export function stringToLiteral(v: string | undefined, d: DatasetCore, f: DataFactory): TermWrapper | undefined {
        if (v === undefined) {
            return undefined
        }

        return new TermWrapper(f.literal(v), d, f)
    }

    export function dateToLiteral(v: Date | undefined, d: DatasetCore, f: DataFactory): TermWrapper | undefined {
        if (v === undefined) {
            return undefined
        }

        return new TermWrapper(f.literal(v.toISOString(), f.namedNode("http://www.w3.org/2001/XMLSchema#date")), d, f)
    }

    export function stringToIri(v: string | undefined, d: DatasetCore, f: DataFactory): TermWrapper | undefined {
        if (v === undefined) {
            return undefined
        }

        return new TermWrapper(f.namedNode(v), d, f)
    }
}
