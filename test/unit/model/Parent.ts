import { ObjectMapping, TermMapping, TermWrapper, ValueMapping } from "rdfjs-wrapper"
import { Child } from "./Child.js"
import { Example } from "../vocabulary/Example.js"

export class Parent extends TermWrapper {
    public get hasString(): string {
        return this.getSingular(Example.hasString, ValueMapping.literalToString)
    }

    public set hasString(value: string ) {
        this.setSingular(Example.hasString, value, TermMapping.stringToLiteral)
    }

    public get hasNoSingularString(): string {
        return this.getSingular(Example.hasNoSingularString, ValueMapping.literalToString)
    }

    public get hasTooManySingularString(): string {
        return this.getSingular(Example.hasTooManySingularString, ValueMapping.literalToString)
    }

    public get hasNullableString(): string | undefined {
        return this.getSingularNullable(Example.hasNullableString, ValueMapping.literalToString)
    }

    public set hasNullableString(value: string | undefined ) {
        this.setSingularNullable(Example.hasNullableString, value, TermMapping.stringToLiteral)
    }

    public get hasDate(): Date {
        return this.getSingular(Example.hasDate, ValueMapping.literalToDate)
    }

    public set hasDate(value: Date ) {
        this.setSingular(Example.hasDate, value, TermMapping.dateToLiteral)
    }

    public get hasNumber(): number {
        return this.getSingular(Example.hasNumber, ValueMapping.literalToNumber)
    }

    public set hasNumber(value: number ) {
        this.setSingular(Example.hasNumber, value, TermMapping.numberToLiteral)
    }

    public get hasIri(): string {
        return this.getSingular(Example.hasIri, ValueMapping.iriToString)
    }

    public set hasIri(value: string ) {
        this.setSingular(Example.hasIri, value, TermMapping.stringToIri)
    }

    public get hasChild(): Child {
        return this.getSingular(Example.hasChild, ObjectMapping.as(Child))
    }

    public set hasChild(value: Child) {
        this.setSingularNullable(Example.hasChild, value, ObjectMapping.as(Child))
    }

    public get hasChildSet(): Set<Child> {
        return this.getSet(Example.hasChildSet, ObjectMapping.as(Child), ObjectMapping.as(Child))
    }

    public get hasRecursive(): Parent {
        return this.getSingular(Example.hasRecursive, ObjectMapping.as(Parent))
    }

    public set hasRecursive(value: string | undefined) {
        this.setSingularNullable(Example.hasRecursive, value, TermMapping.stringToIri)
    }
}
