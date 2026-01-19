import assert from "node:assert";
import { describe, it } from "node:test";

import { example } from "rdfjs-wrapper";

describe("Example", async () => {
    it("returns x", () => {
        assert.equal(example(), "x");
    })
})
