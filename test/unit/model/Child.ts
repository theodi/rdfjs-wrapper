import { TermMappings, TermWrapper, ValueMappings } from "rdfjs-wrapper"
import { Example } from "../vocabulary/Example.js"

export class Child extends TermWrapper {
    public get hasName(): string | undefined {
        return this.singularNullable(Example.hasName, ValueMappings.literalToString)
    }

    public set hasName(value: string | undefined) {
        this.overwriteNullable(Example.hasName, value, TermMappings.stringToLiteral)
    }
}
