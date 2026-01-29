import type { TermWrapper } from "./TermWrapper.js"
import type { DataFactory, DatasetCore } from "@rdfjs/types"

export interface TermMapping<T> {
    (v: T, d: DatasetCore, f: DataFactory): TermWrapper | undefined
}
