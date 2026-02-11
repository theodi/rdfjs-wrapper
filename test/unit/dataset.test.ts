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


describe("Dataset wrapper", async () => {
    const parentDataset = new ParentDataset(datasetFromRdf(rdf), DataFactory)

    it("gets subjects of hasChild as Parent instances", () => {
        for (const p of parentDataset.subjectsOfHasChild) {
            assert.equal("o1", p.hasString)
        }
    })
})
