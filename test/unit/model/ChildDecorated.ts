import { getter, GetterArity, setter, SetterArity, TermMapping, TermWrapper, ValueMapping } from "rdfjs-wrapper"
import { Example } from "../vocabulary/Example.js"

export class ChildDecorated extends TermWrapper {
    @getter(Example.hasName, GetterArity.Singular, ValueMapping.literalToString)
    public get hasName(): string{
        throw new Error
    }

    @setter(Example.hasName, SetterArity.Overwrite, TermMapping.stringToLiteral)
    public set hasName(_: string) {
    }
}
