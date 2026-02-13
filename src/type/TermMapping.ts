import type { DatasetCore, DataFactory } from "@rdfjs/types"
import type { TermWrapper } from "../TermWrapper.js"


export interface TermMapping<T> {
    (v: T, d: DatasetCore, f: DataFactory): TermWrapper | undefined
}
