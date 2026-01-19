import { Wrapper } from "./Wrapper.js"
import type { DatasetCore, DataFactory } from "@rdfjs/types"

export namespace TermMappings {
	export function StringToLiteral(v: string | undefined, d: DatasetCore, f: DataFactory): Wrapper | undefined {
		if (v === undefined) {
			return undefined
		}

		return new Wrapper(f.literal(v), d, f)
	}
}
