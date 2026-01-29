import { SetterArity } from "./setterArity.js"
import type { TermMapping } from "../TermMapping.js"
import type { TermWrapper } from "../TermWrapper.js"

export function setter(predicate: string, setterArity: SetterArity, termMapping: TermMapping<any>): any {
    return function (target: any, context: ClassSetterDecoratorContext): any {
        return function (this: TermWrapper, value: any): void {
            const p = this.factory.namedNode(predicate)

            switch (setterArity) {
                case SetterArity.Overwrite:
                    this.overwrite(p, value, termMapping)
                    break
                case SetterArity.OverwriteNullable:
                    this.overwriteNullable(p, value, termMapping)
                    break
            }
        }
    }
}
