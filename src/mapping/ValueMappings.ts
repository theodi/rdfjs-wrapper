import type { TermWrapper } from "../TermWrapper.js"


/*
 * Read from the RDF dataset
 * Transform RDF Terms to JavaScript primitive types
*/
export namespace ValueMappings {
    export function literalToString(termWrapper: TermWrapper): string {
        return termWrapper.term.value
    }

    export function literalToDate(termWrapper: TermWrapper): Date {
        return new Date(termWrapper.term.value)
    }

    export function literalToNumber(termWrapper: TermWrapper): number {
        return Number(termWrapper.term.value)
    }

    export function iriToString(termWrapper: TermWrapper): string {
        return termWrapper.term.value
    }
}
