// TODO: Remove or implement

@node
class x {
    p = "v"

    @property("sss")
    get p1(): string { throw new Error }

    set p1(value: string) { }
}

function property(predicate: string): any {
    console.log("property annotation", predicate)

    return function (
        target: any,
        context: ClassGetterDecoratorContext
    ): any {
        console.log("property factory")
        console.log(target)
        console.log(context)

        context.addInitializer(function (this: unknown) {
            console.log("property initializer", this instanceof Object /*GraphWrapperNode*/)
        })

        return function (this: unknown /*GraphWrapperNode*/) {
            console.log("property replacer")
            return "replaced value"
        }
    }
}
function node(target: any, context: ClassDecoratorContext): any {
    console.log("node factory")
    console.log(target)
    console.log(context)
    target.wrap = function () { }

    context.addInitializer(function (this: abstract new (...args: any) => any) {
        console.log("node initializer", this)
    })

    return function () {
        console.log("node replacer")
        const a = new target
        a.prototype=0
        a.xxx = "yyy"
        return a
    }
}

console.log("before instantiation");
const xx = new x
console.log("after instantiation, before invocation");
console.log(xx);
const xxp1 = xx.p1
console.log("after invocation");
console.log(xxp1);
