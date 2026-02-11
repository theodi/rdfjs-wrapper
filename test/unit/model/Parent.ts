import { TermMappings, TermWrapper, ValueMappings } from "@rdfjs/wrapper"
import { Child } from "./Child.js"
import { Vocabulary } from "../Vocabulary.js"

export class Parent extends TermWrapper {
    public get hasString(): string | undefined {
        return this.singular(Vocabulary.hasString, ValueMappings.literalToString)
    }

    public set hasString(value: string | undefined) {
        this.overwrite(Vocabulary.hasString, value, TermMappings.stringToLiteral)
    }

    public get hasChild(): Child {
        return this.singular(Vocabulary.hasChild, TermWrapper.as(Child))
    }

    public set hasChild(value: Child) {
        this.overwriteNullable(Vocabulary.hasChild, value, TermWrapper.as(Child))
    }

    public get hasChildSet(): Set<Child> {
        return this.objects(Vocabulary.hasChildSet, TermWrapper.as(Child), TermWrapper.as(Child))
    }
}
