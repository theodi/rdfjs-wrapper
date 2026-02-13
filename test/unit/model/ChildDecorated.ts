import { getter, GetterArity, setter, SetterArity, TermMappings, TermWrapper, ValueMappings } from "rdfjs-wrapper"
import { Example } from "../vocabulary/Example.js"

export class ChildDecorated extends TermWrapper {
    @getter(Example.hasName, GetterArity.Singular, ValueMappings.literalToString)
    public get hasName(): string{
        throw new Error
    }

    @setter(Example.hasName, SetterArity.Overwrite, TermMappings.stringToLiteral)
    public set hasName(_: string) {
    }
}
