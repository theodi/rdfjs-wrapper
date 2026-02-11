import { getter, GetterArity, setter, SetterArity, TermMappings, TermWrapper, ValueMappings } from "@rdfjs/wrapper"
import { Vocabulary } from "../Vocabulary.js"
import { ChildDecorated } from "./ChildDecorated.js"

export class ParentDecorated extends TermWrapper {
    // TODO: Getter arity singular nullable??
    @getter(Vocabulary.hasString, GetterArity.Singular, ValueMappings.literalToString)
    public get hasString(): string {
        throw new Error
    }

    @setter(Vocabulary.hasString, SetterArity.Overwrite, TermMappings.stringToLiteral)
    public set hasString(_: string) {
    }

    @getter(Vocabulary.hasChild, GetterArity.Singular, TermWrapper.as(ChildDecorated))
    public get hasChild(): ChildDecorated {
        throw new Error
    }

    @setter(Vocabulary.hasChild, SetterArity.Overwrite, TermWrapper.as(ChildDecorated))
    public set hasChild(_: ChildDecorated) {
        throw new Error
    }
}
