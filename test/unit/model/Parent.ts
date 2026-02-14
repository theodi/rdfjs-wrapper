import type { ILangString } from "../../../dist/type/ILangString.js"

import { ObjectMapping, TermMapping, TermWrapper, ValueMapping } from "rdfjs-wrapper"
import { Child } from "./Child.js"
import { Example } from "../vocabulary/Example.js"

export class Parent extends TermWrapper {
    /* Value Mapping */
    public get hasBlankNode(): string {
        return this.getSingular(Example.hasBlankNode, ValueMapping.blankNodeToString)
    }

    public get hasDate(): Date {
        return this.getSingular(Example.hasDate, ValueMapping.literalToDate)
    }

    public get hasLangString(): ILangString {
        return this.getSingular(Example.hasLangString, ValueMapping.literalToLangString)
    }

    public get hasNumber(): number {
        return this.getSingular(Example.hasNumber, ValueMapping.literalToNumber)
    }

    public get hasString(): string {
        return this.getSingular(Example.hasString, ValueMapping.literalToString)
    }

    public get hasIri(): string {
        return this.getSingular(Example.hasIri, ValueMapping.iriToString)
    }


    /* Term Mapping */
    public set hasBlankNode(value: string) {
        this.setSingular(Example.hasBlankNode, value, TermMapping.stringToBlankNode)
    }

    public set hasDate(value: Date ) {
        this.setSingular(Example.hasDate, value, TermMapping.dateToLiteral)
    }

    public set hasLangString(value: ILangString ) {
        this.setSingular(Example.hasLangString, value, TermMapping.langStringToLiteral)
    }

    public set hasNumber(value: number ) {
        this.setSingular(Example.hasNumber, value, TermMapping.numberToLiteral)
    }

    public set hasString(value: string ) {
        this.setSingular(Example.hasString, value, TermMapping.stringToLiteral)
    }

    public set hasIri(value: string ) {
        this.setSingular(Example.hasIri, value, TermMapping.stringToIri)
    }


    /* Object Mapping */
    public get hasChild(): Child {
        return this.getSingular(Example.hasChild, ObjectMapping.as(Child))
    }

    public set hasChild(value: Child) {
        this.setSingularNullable(Example.hasChild, value, ObjectMapping.as(Child))
    }


    /* Arity Mapping */
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


    /* Set Mapping */
    public get hasChildSet(): Set<Child> {
        return this.getSet(Example.hasChildSet, ObjectMapping.as(Child), ObjectMapping.as(Child))
    }

    public get hasLangStringSet(): Set<ILangString> {
        return this.getSet(Example.hasLangStringSet, ValueMapping.literalToLangString, TermMapping.langStringToLiteral)
    }


    /* Recursion Mapping */
    public get hasRecursive(): Parent {
        return this.getSingular(Example.hasRecursive, ObjectMapping.as(Parent))
    }

    public set hasRecursive(value: string | undefined) {
        this.setSingularNullable(Example.hasRecursive, value, TermMapping.stringToIri)
    }
}
