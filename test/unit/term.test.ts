import assert from "node:assert"
import { describe, it } from "node:test"
import { DataFactory } from "n3"
import { Child } from "./model/Child.js"
import { datasetFromRdf } from "./util/datasetFromRdf.js"
import { Parent } from "./model/Parent.js"
import { Vocabulary } from "./Vocabulary.js"


const rdf = `
prefix : <https://example.org/>
<x>
    :hasString "o1" ;
    :hasChild [
        :hasName "name" ;
    ] ;
    :hasChildSet [
        :hasName "1" ;
    ], [
        :hasName "2" ;
    ] ;
    :hasRecursive <x> ;
.
`;


describe("Term wrapper", async () => {
    const dataset = datasetFromRdf(rdf)
    const parent = new Parent(DataFactory.namedNode("x"), dataset, DataFactory)
    const newChild = new Child(DataFactory.blankNode(), dataset, DataFactory)
    newChild.hasName = "new name"

    it("gets single literal to string", () => {
        assert.equal("o1", parent.hasString)
    })

    it("sets single literal to string", () => {
        parent.hasString = "xxxxx"
        assert.equal("xxxxx", parent.hasString)
    })

    it("gets single wrapped term", () => {
        assert.equal("name", parent.hasChild.hasName)
    })

    it("sets single wrapped term", () => {
        parent.hasChild = newChild
        assert.equal("new name", parent.hasChild.hasName)
    })

    it("gets set of wrapped terms", () => {
        assert.equal(2, parent.hasChildSet.size)
    })

    it("adds to set of wrapped terms", () => {
        parent.hasChildSet.add(newChild)
        assert.equal(3, parent.hasChildSet.size)
    })

    it("gets to set of wrapped terms' single literal to string", () => {
        for (const child of parent.hasChildSet) {
            assert.equal(true, ["1", "2", "new name"].includes(child.hasName!))
        }
    })

    it("gets recursive wrapped term", () => {
        assert.equal(true, parent.term.equals(parent.hasRecursive.hasRecursive.hasRecursive.term))
    })

    it("throws on singular when no value is found", () => {
        const empty = datasetFromRdf(`prefix : <https://example.org/>\n<y> :hasString "only" .`)
        const orphan = new Parent(DataFactory.namedNode("y"), empty, DataFactory)
        assert.throws(() => orphan.hasChild, {
            message: `No value found for predicate ${Vocabulary.hasChild} on term y`,
        })
    })

    it("returns undefined on singularNullable when no value is found", () => {
        const empty = datasetFromRdf(`prefix : <https://example.org/>\n<y> :hasString "only" .`)
        const child = new Child(DataFactory.namedNode("y"), empty, DataFactory)
        assert.equal(undefined, child.hasName)
    })
})
