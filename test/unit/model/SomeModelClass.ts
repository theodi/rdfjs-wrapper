import { getter, GetterArity, setter, SetterArity, TermMappings, ValueMappings, Wrapper } from "rdfjs-wrapper"
import type { DataFactory, DatasetCore, Term } from "@rdfjs/types"

export class SomeModelClass extends Wrapper {
    private constructor(node: Term, dataset: DatasetCore, factory: DataFactory) {
        super(node, dataset, factory)
    }

    static wrap(wrapper: Wrapper): SomeModelClass
    static wrap(n: Term, dataset: DatasetCore, factory: DataFactory): SomeModelClass
    static wrap(nodeOrWrapper: Term | Wrapper, dataset?: DatasetCore, factory?: DataFactory): SomeModelClass {
        if (dataset !== undefined && factory !== undefined) {
            return new SomeModelClass(nodeOrWrapper as Term, dataset, factory)
        } else {
            const {term, dataset, factory} = nodeOrWrapper as Wrapper
            return new SomeModelClass(term, dataset, factory)
        }
    }

    @getter("https://example.org/hasString", GetterArity.Singular, ValueMappings.literalToString)
    get p1(): string {
        throw new Error
    }

    @setter("https://example.org/hasString", SetterArity.Overwrite, TermMappings.stringToLiteral)
    set p1(_: string) {
    }
}
