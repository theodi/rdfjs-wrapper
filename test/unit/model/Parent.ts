import { TermMappings, TermWrapper, ValueMappings } from "@rdfjs/wrapper"
import { Child } from "./Child.js"
import { Vocabulary } from "../Vocabulary.js"

export class Parent extends TermWrapper {
    public get hasString(): string {
        return this.singular(Vocabulary.hasString, ValueMappings.literalToString)
    }

    public set hasString(value: string ) {
        this.overwrite(Vocabulary.hasString, value, TermMappings.stringToLiteral)
    }

    public get hasDate(): Date {
        return this.singular(Vocabulary.hasDate, ValueMappings.literalToDate)
    }

    public set hasDate(value: Date ) {
        this.overwrite(Vocabulary.hasDate, value, TermMappings.dateToLiteral)
    }

    public get hasIri(): string {
        return this.singular(Vocabulary.hasIri, ValueMappings.iriToString)
    }

    public set hasIri(value: string ) {
        this.overwrite(Vocabulary.hasIri, value, TermMappings.stringToIri)
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

    public get hasRecursive(): Parent {
        return this.singular(Vocabulary.hasRecursive, TermWrapper.as(Parent))
    }
}
