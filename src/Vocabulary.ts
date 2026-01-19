import type { NamedNode } from "@rdfjs/types"
import { DataFactory as n3DataFactory } from "n3"

export class Vocabulary {
	static hasString: NamedNode = n3DataFactory.namedNode("https://example.org/hasString")
	static hasChild: NamedNode = n3DataFactory.namedNode("https://example.org/hasChild")
	static hasChildSet: NamedNode = n3DataFactory.namedNode("https://example.org/hasChildSet")
	static hasName: NamedNode = n3DataFactory.namedNode("https://example.org/hasName")
}
