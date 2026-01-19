import { Wrapper } from "./Wrapper.js"

export namespace ValueMappings {
	export function LiteralToString(n: Wrapper): string {
		return n.term.value
	}
}
