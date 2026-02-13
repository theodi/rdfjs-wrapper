import { getter, GetterArity, setter, SetterArity, TermMappings, TermWrapper, ValueMappings } from "rdfjs-wrapper"
import { Vocabulary } from "../Vocabulary.js"

export class ChildDecorated extends TermWrapper {
    @getter(Vocabulary.hasName, GetterArity.Singular, ValueMappings.literalToString)
    public get hasName(): string{
        throw new Error
    }

    @setter(Vocabulary.hasName, SetterArity.Overwrite, TermMappings.stringToLiteral)
    public set hasName(_: string) {
    }
}
