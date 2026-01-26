import type { Wrapper } from "./Wrapper.js"
import type { DataFactory, DatasetCore } from "@rdfjs/types"

export interface TermMapping<T> {
    (v: T, d: DatasetCore, f: DataFactory): Wrapper | undefined
}
