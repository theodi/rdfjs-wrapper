import { DataFactory, Parser, Store } from "n3"
import assert from "node:assert"
import { describe, it } from "node:test"
import { MyDataset } from "./model/MyDataset.js"
import { Child } from "./model/Child.js"
import { SomeModelClass } from "./model/SomeModelClass.js"

describe("Example suite", async () => {
    it("Example test", () => {
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

        const store = new Store()
        store.addQuads(new Parser().parse(rdf));
        const dataset = new MyDataset(store, DataFactory)

        for (const p of dataset.parents) {
            assert.equal("o1", p.hasString)
            assert.equal("name", p.hasChild.hasName)
            for (const c of p.hasChildSet) {
                // TODO: assertions
                console.log("p.hasChildSet.hasName", c.hasName);
            }

            p.hasString = "x"
            assert.equal("x", p.hasString)

            const newNode = DataFactory.namedNode("example.com/s")
            const newChild = new Child(newNode, dataset, DataFactory)
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

    it("decorators", () => {
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

        const dataset = new Store()
        dataset.addQuads(new Parser().parse(rdf))
        const x = DataFactory.namedNode("x")

        const someModelClass = new SomeModelClass(x, dataset, DataFactory)

        assert.equal("o1", someModelClass.p1)

        someModelClass.p1 = "xxxxx"
        assert.equal("xxxxx", someModelClass.p1)
    })
})
