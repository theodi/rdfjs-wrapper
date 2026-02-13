import assert from "node:assert"
import { describe, it } from "node:test"
import { DataFactory } from "n3"
import { datasetFromRdf } from "./util/datasetFromRdf.js"
import { ParentDecorated } from "./model/ParentDecorated.js"
import { ChildDecorated } from "./model/ChildDecorated.js"


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
    ] .
`;

describe("Decorators", async () => {
    const dataset = datasetFromRdf(rdf)
    const parentDecorated = new ParentDecorated(DataFactory.namedNode("x"), dataset, DataFactory)
    const newChild = new ChildDecorated(DataFactory.blankNode(), dataset, DataFactory)
    newChild.hasName = "new name"

    describe("Term Mappings", async () => {
        it("get single literal to string", () => {
            assert.equal("o1", parentDecorated.hasString)
        })

        it("get single wrapped term", () => {
            assert.equal("child name 1", parentDecorated.hasChild.hasName)
        })

        it("get set of wrapped terms' single literal to string", () => {
            for (const child of parentDecorated.hasChildSet) {
                assert.equal(true, ["child name 2", "child name 3"].includes(child.hasName!))
            }
        })
    })

    describe("Value Mappings", async () => {
        it("set single literal to string", () => {
            parentDecorated.hasString = "xxxxx"
            assert.equal("xxxxx", parentDecorated.hasString)
        })

        it("set single wrapped term", () => {
            parentDecorated.hasChild = newChild
            assert.equal("new name", parentDecorated.hasChild.hasName)
        })
    })
})
