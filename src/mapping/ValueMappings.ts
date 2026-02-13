import type { TermWrapper } from "../TermWrapper.js"


export namespace ValueMappings {
    export function literalToString(n: TermWrapper): string {
        // TODO: Check getting of undefined term
        return n.term.value
    }

    export function literalToDate(n: TermWrapper): Date {
        return new Date(n.term.value)
    }

    export function literalToNumber(n: TermWrapper): number {
        return Number(n.term.value)
    }

    export function iriToString(n: TermWrapper): string {
        return n.term.value
    }
}
