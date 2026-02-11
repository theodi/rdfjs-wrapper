import { DataFactory } from "n3"
import assert from "node:assert"
import { describe, it } from "node:test"
import { Child } from "./model/Child.js"
import { datasetFromRdf } from "./util/datasetFromRdf.js"
import { Parent } from "./model/Parent.js"


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
    ] .
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
})
