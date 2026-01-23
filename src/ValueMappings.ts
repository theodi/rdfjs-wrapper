import { Wrapper } from "./Wrapper.js"

export namespace ValueMappings {
	export function literalToString(n: Wrapper): string {
		return n.term.value
	}
}
