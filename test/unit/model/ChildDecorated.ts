import { getter, GetterArity, setter, SetterArity, TermMapping, TermWrapper, ValueMapping } from "rdfjs-wrapper"
import { Example } from "../vocabulary/Example.js"

export class ChildDecorated extends TermWrapper {
    @getter(Example.hasName, GetterArity.SingularNullable, ValueMapping.literalToString)
    public get hasName(): string | undefined {
        throw new Error
    }

    @setter(Example.hasName, SetterArity.SingularNullable, TermMapping.stringToLiteral)
    public set hasName(_: string | undefined) {
    }
}
