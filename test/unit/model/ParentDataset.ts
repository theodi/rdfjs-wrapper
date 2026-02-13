import { DatasetWrapper } from "rdfjs-wrapper"
import { Parent } from "./Parent.js"
import { Child } from "./Child.js"
import { Example } from "../vocabulary/Example.js"

export class ParentDataset extends DatasetWrapper {
    public get instancesOfParent(): Iterable<Parent> {
        return this.instancesOf(Example.Parent, Parent)
    }

    public get subjectsOfHasChild(): Iterable<Parent> {
        return this.subjectsOf(Example.hasChild, Parent)
    }

    public get matchSubjectsOfAnythingParent(): Iterable<Parent> {
        return this.matchSubjectsOf(Parent, undefined, Example.Parent, undefined)
    }

    public get objectsOfHasChild(): Iterable<Child> {
        return this.objectsOf(Example.hasChild, Child)
    }
}
