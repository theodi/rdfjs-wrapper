import { Wrapper } from "./Wrapper.js"

export namespace ValueMappings {
	export function literalToString(n: Wrapper): string {
		return n.term.value
	}

    export function literalToDate(n: Wrapper): Date {
        return new Date(n.term.value)
    }

    export function iriToString(n: Wrapper): string {
        return n.term.value
    }
}
