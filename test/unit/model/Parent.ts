import { Child } from "./Child.js"
import { Wrapper, ValueMappings, TermMappings } from "rdfjs-wrapper"
import { Vocabulary } from "../Vocabulary.js"
import type { Term, DatasetCore, DataFactory } from "@rdfjs/types"

export class Parent extends Wrapper {
	private constructor(node: Term, dataset: DatasetCore, factory: DataFactory) {
		super(node, dataset, factory)
	}

	public static wrap(node: Term, dataset: DatasetCore, factory: DataFactory): Parent {
		return new Parent(node, dataset, factory)
	}

	public get hasString(): string | undefined {
		return this.singular(Vocabulary.hasString, ValueMappings.LiteralToString)
	}
	public set hasString(value: string | undefined) {
		this.overwriteNullable(Vocabulary.hasString, value, TermMappings.StringToLiteral)
	}
	public get hasChild(): Child {
		return this.singular(Vocabulary.hasChild, Child.wrap2)
	}
	public set hasChild(value: Child) {
		this.overwriteNullable(Vocabulary.hasChild, value, Child.wrap2)
	}
	public get hasChildSet(): Set<Child> {
		return this.objects(Vocabulary.hasChildSet, Child.wrap2, Child.wrap2)
	}
}
