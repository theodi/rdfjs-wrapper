import type { TermMapping } from "../type/TermMapping.js"
import type { TermWrapper } from "../TermWrapper.js"

import { SetterArity } from "./SetterArity.js"


export function setter(predicate: string, setterArity: SetterArity, termMapping: TermMapping<any>): any {
    return function (target: any, context: ClassSetterDecoratorContext): any {
        return function (this: TermWrapper, value: any): void {
            switch (setterArity) {
                case SetterArity.Overwrite:
                    this.overwrite(predicate, value, termMapping)
                    break
                case SetterArity.OverwriteNullable:
                    this.overwriteNullable(predicate, value, termMapping)
                    break
            }
        }
    }
}
