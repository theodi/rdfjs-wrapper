import { ObjectMapping, TermMapping, TermWrapper, ValueMapping } from "rdfjs-wrapper"
import { Child } from "./Child.js"
import { Example } from "../vocabulary/Example.js"

export class Parent extends TermWrapper {
    public get hasString(): string {
        return this.singular(Example.hasString, ValueMapping.literalToString)
    }

    public set hasString(value: string ) {
        this.overwrite(Example.hasString, value, TermMapping.stringToLiteral)
    }

    public get hasNoSingularString(): string {
        return this.singular(Example.hasNoSingularString, ValueMapping.literalToString)
    }

    public get hasTooManySingularString(): string {
        return this.singular(Example.hasTooManySingularString, ValueMapping.literalToString)
    }

    public get hasNullableString(): string | undefined {
        return this.singularNullable(Example.hasNullableString, ValueMapping.literalToString)
    }

    public set hasNullableString(value: string | undefined ) {
        this.overwriteNullable(Example.hasNullableString, value, TermMapping.stringToLiteral)
    }

    public get hasDate(): Date {
        return this.singular(Example.hasDate, ValueMapping.literalToDate)
    }

    public set hasDate(value: Date ) {
        this.overwrite(Example.hasDate, value, TermMapping.dateToLiteral)
    }

    public get hasNumber(): number {
        return this.singular(Example.hasNumber, ValueMapping.literalToNumber)
    }

    public set hasNumber(value: number ) {
        this.overwrite(Example.hasNumber, value, TermMapping.numberToLiteral)
    }

    public get hasIri(): string {
        return this.singular(Example.hasIri, ValueMapping.iriToString)
    }

    public set hasIri(value: string ) {
        this.overwrite(Example.hasIri, value, TermMapping.stringToIri)
    }

    public get hasChild(): Child {
        return this.singular(Example.hasChild, ObjectMapping.as(Child))
    }

    public set hasChild(value: Child) {
        this.overwriteNullable(Example.hasChild, value, ObjectMapping.as(Child))
    }

    public get hasChildSet(): Set<Child> {
        return this.objects(Example.hasChildSet, ObjectMapping.as(Child), ObjectMapping.as(Child))
    }

    public get hasRecursive(): Parent {
        return this.singular(Example.hasRecursive, ObjectMapping.as(Parent))
    }
}
