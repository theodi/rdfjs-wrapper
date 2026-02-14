import { TermMapping, TermWrapper, ValueMapping } from "rdfjs-wrapper"
import { Example } from "../vocabulary/Example.js"

export class Child extends TermWrapper {
    public get hasName(): string | undefined {
        return this.getSingularNullable(Example.hasName, ValueMapping.literalToString)
    }

    public set hasName(value: string | undefined) {
        this.setSingularNullable(Example.hasName, value, TermMapping.stringToLiteral)
    }
}
