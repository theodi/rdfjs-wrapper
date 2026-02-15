import { describe, it } from "node:test"
import { DataFactory } from "n3"
import { datasetFromRdf } from "./util/datasetFromRdf.js"
import { ObjectMapping, TermMapping, TermWrapper, ValueMapping } from "rdfjs-wrapper"
import assert from "node:assert"

class Wrapper extends TermWrapper {
    public get list(): string[] {
        return this.singular("p", ObjectMapping.asList(ValueMapping.literalToString, TermMapping.stringToLiteral))
    }
}

describe("RDF List", () => {
    describe("general", () => {
        it("not list", () => {
            const rdf = `<s> <p> <o> .`
            const wrapper = new Wrapper("s", datasetFromRdf(rdf), DataFactory)

            assert.deepStrictEqual([...wrapper.list], [])
        })

        it("empty", () => {
            const rdf = `<s> <p> () .`
            const wrapper = new Wrapper("s", datasetFromRdf(rdf), DataFactory)

            assert.deepStrictEqual([...wrapper.list], [])
        })

        it("one item", () => {
            const rdf = `<s> <p> ( "o1" ) .`
            const wrapper = new Wrapper("s", datasetFromRdf(rdf), DataFactory)

            assert.deepStrictEqual([...wrapper.list], ["o1"])
        })

        it("two items", () => {
            const rdf = `<s> <p> ( "o1" "o2" ) .`
            const wrapper = new Wrapper("s", datasetFromRdf(rdf), DataFactory)

            assert.deepStrictEqual([...wrapper.list], ["o1", "o2"])
        })
    })

    describe("pop", () => {
        it("not list undefined", () => {
            const rdf = `<s> <p> <o> .`
            const wrapper = new Wrapper("s", datasetFromRdf(rdf), DataFactory)

            const actual = wrapper.list.pop()

            assert.strictEqual(actual, undefined)
            assert.deepStrictEqual([...wrapper.list], [])
        })

        it("empty undefined", () => {
            const rdf = `<s> <p> () .`
            const wrapper = new Wrapper("s", datasetFromRdf(rdf), DataFactory)

            const actual = wrapper.list.pop()

            assert.strictEqual(actual, undefined)
        })

        it("one returns last", () => {
            const rdf = `<s> <p> ( "o1" ) .`
            const wrapper = new Wrapper("s", datasetFromRdf(rdf), DataFactory)

            const actual = wrapper.list.pop()

            assert.strictEqual(actual, "o1")
        })

        it("one removes last", () => {
            const rdf = `<s> <p> ( "o1" ) .`
            const wrapper = new Wrapper("s", datasetFromRdf(rdf), DataFactory)
            wrapper.list.pop()

            assert.deepStrictEqual([...wrapper.list], [])
        })

        it("two returns last", () => {
            const rdf = `<s> <p> ( "o1" "o2" ) .`
            const wrapper = new Wrapper("s", datasetFromRdf(rdf), DataFactory)
            const popped = wrapper.list.pop()

            assert.strictEqual(popped, "o2")
        })

        it("two removes last", () => {
            const rdf = `<s> <p> ( "o1" "o2" ) .`
            const wrapper = new Wrapper("s", datasetFromRdf(rdf), DataFactory)
            wrapper.list.pop()

            assert.deepStrictEqual([...wrapper.list], ["o1"])
        })
    })

    describe("push", () => {
        it("not list", {skip: "not implemented yet"}, () => {
            const rdf = `<s> <p> <o> .`
            const wrapper = new Wrapper("s", datasetFromRdf(rdf), DataFactory)

            wrapper.list.push("o1")
        })

        it("empty", {skip: "not implemented yet"}, () => {
            const rdf = `<s> <p> () .`
            const wrapper = new Wrapper("s", datasetFromRdf(rdf), DataFactory)

            wrapper.list.push("o1")
        })

        it("one returns one", () => {
            const rdf = `<s> <p> ( "o1" ) .`
            const wrapper = new Wrapper("s", datasetFromRdf(rdf), DataFactory)

            const pushed = wrapper.list.push("o2")

            assert.strictEqual(pushed, 1)
        })

        it("two returns two", () => {
            const rdf = `<s> <p> ( "o1" ) .`
            const wrapper = new Wrapper("s", datasetFromRdf(rdf), DataFactory)

            const pushed = wrapper.list.push("o2", "o3")

            assert.strictEqual(pushed, 2)
        })

        it("one grows", () => {
            const rdf = `<s> <p> ( "o1" ) .`
            const wrapper = new Wrapper("s", datasetFromRdf(rdf), DataFactory)

            wrapper.list.push("o2")

            assert.deepStrictEqual([...wrapper.list], ["o1", "o2"])
        })

        it("two returns two", () => {
            const rdf = `<s> <p> ( "o1" ) .`
            const wrapper = new Wrapper("s", datasetFromRdf(rdf), DataFactory)

            wrapper.list.push("o2", "o3")

            assert.deepStrictEqual([...wrapper.list], ["o1", "o2", "o3"])
        })
    })
})
