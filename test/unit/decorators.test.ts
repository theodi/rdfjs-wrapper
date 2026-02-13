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
        :hasName "name" ;
    ] ;
    :hasChildSet [
        :hasName "1" ;
    ], [
        :hasName "2" ;
    ] .
`;

describe("Decorators", async () => {
    const dataset = datasetFromRdf(rdf)
    const parentDecorated = new ParentDecorated(DataFactory.namedNode("x"), dataset, DataFactory)

    it("get single literal to string", () => {
        assert.equal("o1", parentDecorated.hasString)
    })

    it("set single literal to string", () => {
        parentDecorated.hasString = "xxxxx"
        assert.equal("xxxxx", parentDecorated.hasString)
    })

    it("get single wrapped term", () => {
        assert.equal("name", parentDecorated.hasChild.hasName)
    })

    it("set single wrapped term", () => {
        const newChild = new ChildDecorated(DataFactory.blankNode(), dataset, DataFactory)
        newChild.hasName = "new name"
        parentDecorated.hasChild = newChild
        assert.equal("new name", parentDecorated.hasChild.hasName)
    })
})
