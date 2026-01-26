import type { NamedNode } from "@rdfjs/types"
import { DataFactory } from "n3"

export class Vocabulary {
    static hasString: NamedNode = DataFactory.namedNode("https://example.org/hasString")
    static hasChild: NamedNode = DataFactory.namedNode("https://example.org/hasChild")
    static hasChildSet: NamedNode = DataFactory.namedNode("https://example.org/hasChildSet")
    static hasName: NamedNode = DataFactory.namedNode("https://example.org/hasName")
}
