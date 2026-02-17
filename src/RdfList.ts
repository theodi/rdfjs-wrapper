import { TermWrapper } from "./TermWrapper.js"
import type { IValueMapping } from "./type/IValueMapping.js"
import type { ITermMapping } from "./type/ITermMapping.js"
import { IndexerInterceptor } from "./IndexerInterceptor.js"
import { ListItem } from "./ListItem.js"

export class RdfList<T> implements Array<T> {
    constructor(private readonly anchor: TermWrapper, private readonly valueMapping: IValueMapping<T>, private readonly termMapping: ITermMapping<T>) {
        // TODO: Singleton interceptor?
        return new Proxy(this, new IndexerInterceptor<T>)
    }

    // Never invoked, intercepted by proxy
    [n: number]: T

    get [Symbol.unscopables](): { [K in keyof any[]]?: boolean } {
        throw new Error("not implemented")
    }

    get length(): number {
        return [...this.items].length
    }

    set length(_: number) {
        throw new Error("this array is based on an RDF Collection. Its length cannot be modified like this.")
    }

    [Symbol.iterator](): ArrayIterator<T> {
        return this.values()
    }

    at(index: number): T | undefined {
        // TODO: Don't materialize all, only up to index
        return [...this.items].at(index)?.first
    }

    concat(...items: Array<ConcatArray<T> | T>): T[] {
        throw new Error("not implemented")
    }

    copyWithin(target: number, start: number, end?: number): this {
        throw new Error("not implemented")
    }

    entries(): ArrayIterator<[number, T]> {
        // TODO: Don't materlialize all upfront
        return [...this].entries()
    }

    every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[] {
        return [...this].every(predicate, thisArg)
    }

    fill(value: T, start?: number, end?: number): this {
        throw new Error("not implemented")
    }

    filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[] {
        return [...this].filter(predicate, thisArg)
    }

    find<S extends T>(predicate: (value: T, index: number, obj: T[]) => value is S, thisArg?: any): S | undefined {
        return [...this].find(predicate, thisArg)
    }

    findIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number {
        return [...this].findIndex(predicate, thisArg)
    }

    flat<A, D extends number = 1>(depth?: D): FlatArray<A, D>[] {
        throw new Error("not implemented")
    }

    flatMap<U, This = undefined>(callback: (this: This, value: T, index: number, array: T[]) => (ReadonlyArray<U> | U), thisArg?: This): U[] {
        return [...this].flatMap(callback, thisArg)
    }

    forEach(callback: (value: T, index: number, array: T[]) => void, thisArg?: any): void {
        [...this].forEach(callback, thisArg)
    }

    includes(searchElement: T, fromIndex?: number): boolean {
        return [...this].includes(searchElement, fromIndex)
    }

    indexOf(searchElement: T, fromIndex?: number): number {
        return [...this].indexOf(searchElement, fromIndex)
    }

    join(separator?: string): string {
        return [...this].join(separator)
    }

    keys(): ArrayIterator<number> {
        // TODO: Don't materialize all upfront
        return [...this.items].keys()
    }

    lastIndexOf(searchElement: T, fromIndex?: number): number {
        return [...this].lastIndexOf(searchElement, fromIndex)
    }

    map<U>(callback: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] {
        return [...this].map(callback, thisArg)
    }

    pop(): T | undefined {
        return [...this.items].at(-1)?.pop()
    }

    push(...items: T[]): number {
        if (this.length === 0) {
            throw new Error("Adding to empty is not implemented yet")
        }

        return [...this.items].at(-1)!.push(...items)
    }

    reduce<U>(callback: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue?: U): U {
        throw new Error("not implemented")
    }

    reduceRight<U>(callback: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue?: U): U {
        throw new Error("not implemented")
    }

    reverse(): T[] {
        throw new Error("not implemented")
    }

    shift(): T | undefined {
        for (const item of this.items) {
            return item.shift()
        }

        return undefined
    }

    slice(start?: number, end?: number): T[] {
        // TODO: Probably no need to materialize all
        return [...this].slice(start, end)
    }

    some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean {
        return [...this].some(predicate, thisArg)
    }

    sort(compareFn?: (a: T, b: T) => number): this {
        throw new Error("not implemented")
    }

    splice(start: number, deleteCount?: number, ...items: T[]): T[] {
        throw new Error("not implemented")
    }

    unshift(...items: T[]): number {
        throw new Error("not implemented")
    }

    * values(): ArrayIterator<T> {
        for (const item of this.items) {
            yield item.first
        }
    }

    private get items(): Iterable<ListItem<T>> {
        return new ListItem(this.anchor, this.valueMapping, this.termMapping).items()
    }
}
