import type { TermMapping } from "../type/TermMapping.js"
import type { ValueMapping } from "../type/ValueMapping.js"
import type { TermWrapper } from "../TermWrapper.js"

import { GetterArity } from "./GetterArity.js"
import { TermMappings } from "../mapping/TermMappings.js"


export function getter(predicate: string, getterArity: GetterArity, valueMapping: ValueMapping<any>, termMapping: TermMapping<any> = TermMappings.stringToLiteral): any {
    return function (target: any, context: ClassGetterDecoratorContext): any {
        return function (this: TermWrapper): any {
            switch (getterArity) {
                case GetterArity.Singular:
                    return this.singular(predicate, valueMapping)
                case GetterArity.Objects:
                    return this.objects(predicate, valueMapping, termMapping)
            }
        }
    }
}
