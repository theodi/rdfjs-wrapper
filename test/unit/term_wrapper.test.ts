import assert from "node:assert"
import { describe, it } from "node:test"
import { DataFactory } from "n3"
import { Child } from "./model/Child.js"
import { datasetFromRdf } from "./util/datasetFromRdf.js"
import { Parent } from "./model/Parent.js"


const rdf = `
prefix : <https://example.org/>

<x>
    :hasString "o1" ;
    :hasChild [
        :hasName "child name 1" ;
    ] ;
    :hasChildSet [
        :hasName "child name 2" ;
    ], [
        :hasName "child name 3" ;
    ] ;
    :hasRecursive <x> ;
.
`;


describe("Term Wrappers", async () => {
    const dataset = datasetFromRdf(rdf)
    const parent = new Parent(DataFactory.namedNode("x"), dataset, DataFactory)
    const newChild = new Child(DataFactory.blankNode(), dataset, DataFactory)
    newChild.hasName = "child name 4"

    describe("Term Mappings", async () => {
        it("get single literal to string", () => {
            assert.equal("o1", parent.hasString)
        })

        it("get single wrapped term", () => {
            assert.equal("child name 1", parent.hasChild.hasName)
        })

        it("get set of wrapped terms", () => {
            assert.equal(2, parent.hasChildSet.size)
        })

        it("get set of wrapped terms' single literal to string", () => {
            for (const child of parent.hasChildSet) {
                assert.equal(true, ["child name 2", "child name 3"].includes(child.hasName!))
            }
        })
    })

    describe("Value Mappings", async () => {
        it("set single literal to string", () => {
            parent.hasString = "xxxxx"
            assert.equal("xxxxx", parent.hasString)
        })

        it("set single wrapped term", () => {
            parent.hasChild = newChild
            assert.equal("child name 4", parent.hasChild.hasName)
        })

        it("add to set of wrapped terms", () => {
            parent.hasChildSet.add(newChild)
            assert.equal(3, parent.hasChildSet.size)
        })
    })

    it("get recursive wrapped term", () => {
        assert.equal(true, parent.term.equals(parent.hasRecursive.hasRecursive.hasRecursive.term))
    })
})
