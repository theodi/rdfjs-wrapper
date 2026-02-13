import assert from "node:assert"
import { describe, it } from "node:test"
import { DataFactory } from "n3"
import { ParentDataset } from "./model/ParentDataset.js"
import { datasetFromRdf } from "./util/datasetFromRdf.js"


const rdf = `
prefix : <https://example.org/>

<x>
    a :Parent ;
    :hasString "o1" ;
    :hasChild [
        :hasName "child name 1" ;
    ] ;
    :hasChildSet [
        :hasName "1" ;
    ], [
        :hasName "2" ;
    ] ;
.
<y>
    :hasString "o2" ;
    :hasChild <z> ;
.
<z>
    :hasName "child name 2" ;
.
`;


describe("Dataset Wrappers", async () => {
    const parentDataset = new ParentDataset(datasetFromRdf(rdf), DataFactory)

    it("get instances of Parent as Parent", () => {
        assert.equal(Array.from(parentDataset.instancesOfParent).length, 1)

        for (const parent of parentDataset.instancesOfParent) {
            assert.equal("o1", parent.hasString)
        }
    })

    it("get subjects of hasChild as Parent instances", () => {
        assert.equal(Array.from(parentDataset.subjectsOfHasChild).length, 2)

        for (const parent of parentDataset.subjectsOfHasChild) {
            assert.equal(true, ["o1", "o2"].includes(parent.hasString!))
        }
    })

    it("get matching subjects of `?s ?p :Parent ?g` as Parent instances", () => {
        assert.equal((Array.from(parentDataset.matchSubjectsOfAnythingParent).length), 1)

        for (const parent of parentDataset.matchSubjectsOfAnythingParent) {
            assert.equal("o1", parent.hasString)
        }
    })

    it("get objects of hasChild as Child instances", () => {
        assert.equal((Array.from(parentDataset.objectsOfHasChild).length), 2)

        for (const child of parentDataset.objectsOfHasChild) {
            assert.equal(["child name 1", "child name 2"].includes(child.hasName!), true)
        }
    })

    it("iterates", () => {
        assert.equal((Array.from(parentDataset).length), 11)

        for (const x of parentDataset) {
            assert.equal(x.equals(x), true)
        }
    })
})
