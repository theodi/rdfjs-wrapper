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
    :hasTooManySingularString "o3", "o4" ;
    :hasNullableString "o2" ;
    :hasDate "1969-01-01" ;
    :hasNumber "1" ;
    :hasIri <https://example.org> ;
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


describe("Term Wrapper", async () => {
    const dataset = datasetFromRdf(rdf)
    const parent = new Parent(DataFactory.namedNode("x"), dataset, DataFactory)
    const newChild = new Child(DataFactory.blankNode(), dataset, DataFactory)
    newChild.hasName = "child name 4"


    describe("Term Mapping", async () => {
        it("get single literal to string", () => {
            assert.equal(parent.hasString, "o1")
        })

        it("get single date to date", () => {
            assert.equal(parent.hasDate.toISOString(), "1969-01-01T00:00:00.000Z")
        })

        it("get single iri to string", () => {
            assert.equal(parent.hasIri, "https://example.org")
        })

        it("get single number to number", () => {
            assert.equal(parent.hasNumber, 1)
        })
    })


    describe("Value Mapping", async () => {
        it("set string to literal", () => {
            parent.hasString = "o1 edited"
            assert.equal(parent.hasString, "o1 edited")
        })

        it("set date to literal", () => {
            parent.hasDate = new Date("1970-01-01")
            assert.equal(parent.hasDate.toISOString(), "1970-01-01T00:00:00.000Z")
        })

        it("set number to literal", () => {
            parent.hasNumber = 2
            assert.equal(parent.hasNumber, 2)
        })

        it("set string to iri", () => {
            parent.hasIri = "x"
            assert.equal(parent.hasIri, "x")
        })
    })


    describe("Object Mapping", async () => {
        it("get wrapped term", () => {
            assert.equal(parent.hasChild.hasName, "child name 1")
        })

        it("set wrapped term", () => {
            parent.hasChild = newChild
            assert.equal(parent.hasChild.hasName, "child name 4")
        })
    })


    describe("Arrity Mapping", async () => {
        describe("Singular", async () => {
            it("get singular arrity throws if more than 1", () => {
                // TODO: Test for specific errors
                assert.throws(() => parent.hasTooManySingularString)
            })

            it("get singular arrity throws if no value", () => {
                // TODO: Test for specific errors
                assert.throws(() => parent.hasNoSingularString)
            })

            it("set singular arrity to undefined throws", () => {
                assert.throws(() => { parent.hasString = undefined as any })
            })
        })


        describe("Singular Nullable", async () => {
            it("get nullable", () => {
                assert.equal(parent.hasNullableString, "o2")
            })

            it("set nullable to undefined", () => {
                assert.equal(parent.dataset.size, 15)
                parent.hasNullableString = undefined
                assert.equal(parent.hasNullableString, undefined)
                assert.equal(parent.dataset.size, 14)
            })

            it("set nullable to string", () => {
                parent.hasNullableString = "o2 edited"
                assert.equal(parent.hasNullableString, "o2 edited")
            })

            // TODO: Test nullable object
        })

        // TODO: Set Arrity
    })


    describe("Set Mapping", async () => {
        // TODO: test primitive types wrapping set

        it("get set of wrapped terms", () => {
            assert.equal(2, parent.hasChildSet.size)
        })

        it("add to set of wrapped terms", () => {
            parent.hasChildSet.add(newChild)
            assert.equal(3, parent.hasChildSet.size)
        })

        it("get set of wrapped terms' single literal to string", () => {
            for (const child of parent.hasChildSet) {
                assert.equal(true, ["child name 2", "child name 3", "child name 4"].includes(child.hasName!))
            }
        })
    })


    describe("Recursion Mapping", async () => {
        it("get recursive wrapped term", () => {
            assert.equal(parent.term.equals(parent.hasRecursive.hasRecursive.hasRecursive.term), true)
        })

        it("set recursive property", () => {
            assert.equal(parent.dataset.size, 16)
            parent.hasRecursive = undefined
            assert.equal(parent.dataset.size, 15)
            // TODO: check for typed error singular no value
            assert.throws(() => parent.hasRecursive)
            parent.hasRecursive = "x"
            assert.equal("x", parent.hasRecursive.hasRecursive.hasRecursive.term.value)
        })

        // TODO: test recursion in wrapping set
    })
})
