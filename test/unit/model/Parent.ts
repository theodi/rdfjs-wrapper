import { TermMappings, TermWrapper, ValueMappings } from "rdfjs-wrapper"
import { Child } from "./Child.js"
import { Example } from "../vocabulary/Example.js"

export class Parent extends TermWrapper {
    public get hasString(): string {
        return this.singular(Vocabulary.hasString, ValueMappings.literalToString)
    }

    public set hasString(value: string ) {
        this.overwrite(Vocabulary.hasString, value, TermMappings.stringToLiteral)
    }

    public get hasDate(): Date {
        return this.singular(Example.hasDate, ValueMappings.literalToDate)
    }

    public set hasDate(value: Date ) {
        this.overwrite(Example.hasDate, value, TermMappings.dateToLiteral)
    }

    public get hasNumber(): number {
        return this.singular(Example.hasNumber, ValueMappings.literalToNumber)
    }

    public set hasNumber(value: number ) {
        this.overwrite(Example.hasNumber, value, TermMappings.numberToLiteral)
    }

    public get hasIri(): string {
        return this.singular(Example.hasIri, ValueMappings.iriToString)
    }

    public set hasIri(value: string ) {
        this.overwrite(Example.hasIri, value, TermMappings.stringToIri)
    }

    public get hasChild(): Child {
        return this.singular(Example.hasChild, TermWrapper.as(Child))
    }

    public set hasChild(value: Child) {
        this.overwriteNullable(Example.hasChild, value, TermWrapper.as(Child))
    }

    public get hasChildSet(): Set<Child> {
        return this.objects(Example.hasChildSet, TermWrapper.as(Child), TermWrapper.as(Child))
    }

    public get hasRecursive(): Parent {
        return this.singular(Example.hasRecursive, TermWrapper.as(Parent))
    }
}
