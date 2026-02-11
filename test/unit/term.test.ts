import { DataFactory } from "n3"
import assert from "node:assert"
import { describe, it } from "node:test"
import { ParentDataset } from "./model/ParentDataset.js"
import { Child } from "./model/Child.js"
import { datasetFromRdf } from "./datasetFromRdf.js"


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
    it("Example test", () => {
        const parentDataset = new ParentDataset(datasetFromRdf(rdf), DataFactory)

        for (const p of parentDataset.subjectsOfHasChild) {
            assert.equal("o1", p.hasString)
            assert.equal("name", p.hasChild.hasName)
            for (const c of p.hasChildSet) {
                // TODO: assertions
                console.log("p.hasChildSet.hasName", c.hasName);
            }

            p.hasString = "x"
            assert.equal("x", p.hasString)

            const newNode = DataFactory.namedNode("example.com/s")
            const newChild = new Child(newNode, parentDataset, DataFactory)
            newChild.hasName = "new name"
            p.hasChild = newChild

            assert.equal("new name", p.hasChild.hasName)

            p.hasChildSet.add(newChild)
            for (const c of p.hasChildSet) {
                // TODO: assertions
                console.log("p.hasChildSet.hasName modified", c.hasName);
            }
        }
    })
})
