import { getter, GetterArity, setter, SetterArity, TermMappings, ValueMappings, Wrapper } from "rdfjs-wrapper"

export class SomeModelClass extends Wrapper {
    @getter("https://example.org/hasString", GetterArity.Singular, ValueMappings.literalToString)
    get p1(): string {
        throw new Error
    }

    @setter("https://example.org/hasString", SetterArity.Overwrite, TermMappings.stringToLiteral)
    set p1(_: string) {
    }
}
