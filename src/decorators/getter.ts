import {GetterArity} from "./GetterArity.js"
import type {ValueMapping} from "../ValueMapping.js"
import type {TermMapping} from "../TermMapping.js"
import {TermMappings} from "../TermMappings.js"
import {Wrapper} from "../Wrapper.js"

export function getter(predicate: string, getterArity: GetterArity, valueMapping: ValueMapping<any>, termMapping: TermMapping<any> = TermMappings.StringToLiteral): any {
    return function (target: any, context: ClassGetterDecoratorContext): any {
        return function (this: Wrapper): any {
            const p = this.factory.namedNode(predicate)

            switch (getterArity) {
                case GetterArity.Singular:
                    return this.singular(p, valueMapping)
                case GetterArity.Objects:
                    return this.objects(p, valueMapping, termMapping)
            }
        }
    }
}
