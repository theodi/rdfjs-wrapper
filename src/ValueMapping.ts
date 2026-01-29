import type { TermWrapper } from "./TermWrapper.js"

export interface ValueMapping<T> {
    (n: TermWrapper): T
}
