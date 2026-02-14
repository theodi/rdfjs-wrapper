import { TermMapping, TermWrapper, ValueMapping } from "rdfjs-wrapper"
import { Example } from "../vocabulary/Example.js"

export class Child extends TermWrapper {
    public get hasString(): string | undefined {
        return this.getSingularNullable(Example.hasString, ValueMapping.literalToString)
    }

    public set hasString(value: string | undefined) {
        this.setSingularNullable(Example.hasString, value, TermMapping.stringToLiteral)
    }
}
