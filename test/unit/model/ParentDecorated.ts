import { getter, GetterArity, setter, SetterArity, TermMappings, TermWrapper, ValueMappings } from "rdfjs-wrapper"
import { Example } from "../vocabulary/Example.js"
import { ChildDecorated } from "./ChildDecorated.js"

export class ParentDecorated extends TermWrapper {
    // TODO: Getter arity singular nullable??
    @getter(Example.hasString, GetterArity.Singular, ValueMappings.literalToString)
    public get hasString(): string {
        throw new Error
    }

    @setter(Example.hasString, SetterArity.OverwriteNullable, TermMappings.stringToLiteral)
    public set hasString(_: string) {
    }

    @getter(Example.hasChild, GetterArity.Singular, TermWrapper.as(ChildDecorated))
    public get hasChild(): ChildDecorated {
        throw new Error
    }

    @setter(Example.hasChild, SetterArity.Overwrite, TermWrapper.as(ChildDecorated))
    public set hasChild(_: ChildDecorated) {
        throw new Error
    }

    @getter(Example.hasChildSet, GetterArity.Objects, TermWrapper.as(ChildDecorated))
    public get hasChildSet(): Set<ChildDecorated> {
        throw new Error
    }
}
