import assert from "node:assert";
import { describe, it } from "node:test";
import { Vocabulary } from "./Vocabulary.js"

import { example } from "rdfjs-wrapper";

describe("Example", async () => {
    it("returns x", () => {
        assert.equal(example(), "x");
    })
    it("returns child", () => {
        assert.equal(Vocabulary.hasChild.value, "https://example.org/hasChild");
    })
})
