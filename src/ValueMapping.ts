import type { Wrapper } from "./Wrapper.js"

export interface ValueMapping<T> {
    (n: Wrapper): T
}
