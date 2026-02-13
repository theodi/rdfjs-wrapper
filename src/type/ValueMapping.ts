import type { TermWrapper } from "../TermWrapper.js"


export interface ValueMapping<T> {
    (termWrapper: TermWrapper): T
}
