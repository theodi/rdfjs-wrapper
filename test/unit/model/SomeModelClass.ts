import { getter, GetterArity, setter, SetterArity, TermMappings, ValueMappings, TermWrapper } from "rdfjs-wrapper"

export class SomeModelClass extends TermWrapper {
    @getter("https://example.org/hasString", GetterArity.Singular, ValueMappings.literalToString)
    get p1(): string {
        throw new Error
    }

    @setter("https://example.org/hasString", SetterArity.Overwrite, TermMappings.stringToLiteral)
    set p1(_: string) {
    }
}
