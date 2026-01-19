import type { Wrapper } from "./Wrapper.js"
import type { DatasetCore, DataFactory } from "@rdfjs/types"

export interface TermMapping<T> {
	(v: T, d: DatasetCore, f: DataFactory): Wrapper | undefined
}
