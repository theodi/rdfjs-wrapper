import { Wrapper, ValueMappings, TermMappings } from "rdfjs-wrapper"
import { Vocabulary } from "../Vocabulary.js"
import type { Term, DatasetCore, DataFactory } from "@rdfjs/types"

export class Child extends Wrapper {
	private constructor(node: Term, dataset: DatasetCore, factory: DataFactory) {
		super(node, dataset, factory)
	}

	public static wrap(node: Term, dataset: DatasetCore, factory: DataFactory): Child {
		return new Child(node, dataset, factory)
	}
	public static wrap2(node: Wrapper): Child {
		return Child.wrap(node.term, node.dataset, node.factory)
	}

	public get hasName(): string | undefined {
		return this.singular(Vocabulary.hasName, ValueMappings.LiteralToString)
	}
	public set hasName(value: string | undefined) {
		this.overwriteNullable(Vocabulary.hasName, value, TermMappings.StringToLiteral)
	}
}
