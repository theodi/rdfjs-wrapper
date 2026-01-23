import { Wrapper } from "./Wrapper.js"
import type { DatasetCore, DataFactory } from "@rdfjs/types"

export namespace TermMappings {
	export function stringToLiteral(v: string | undefined, d: DatasetCore, f: DataFactory): Wrapper | undefined {
		if (v === undefined) {
			return undefined
		}

		return new Wrapper(f.literal(v), d, f)
	}

    export function dateToLiteral(v: Date | undefined, d: DatasetCore, f: DataFactory): Wrapper | undefined {
        if (v === undefined) {
            return undefined
        }

        return new Wrapper(f.literal(v.toISOString(), f.namedNode("http://www.w3.org/2001/XMLSchema#date")), d, f)
    }

    export function stringToIri(v: string | undefined, d: DatasetCore, f: DataFactory): Wrapper | undefined {
        if (v === undefined) {
            return undefined
        }

        return new Wrapper(f.namedNode(v), d, f)
    }
}
