import { getter, GetterArity, setter, SetterArity, TermMappings, TermWrapper, ValueMappings } from "@rdfjs/wrapper"
import { Vocabulary } from "../Vocabulary.js"

export class ChildDecoratedNullable extends TermWrapper {
    @getter(Vocabulary.hasName, GetterArity.SingularNullable, ValueMappings.literalToString)
    public get hasName(): string | undefined {
        throw new Error
    }

    @setter(Vocabulary.hasName, SetterArity.OverwriteNullable, TermMappings.stringToLiteral)
    public set hasName(_: string | undefined) {
    }
}
