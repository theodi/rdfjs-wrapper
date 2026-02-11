import { TermMappings, TermWrapper, ValueMappings } from "@rdfjs/wrapper"
import { Vocabulary } from "../Vocabulary.js"

export class Child extends TermWrapper {
    public get hasName(): string | undefined {
        return this.singularNullable(Vocabulary.hasName, ValueMappings.literalToString)
    }

    public set hasName(value: string | undefined) {
        this.overwriteNullable(Vocabulary.hasName, value, TermMappings.stringToLiteral)
    }
}
