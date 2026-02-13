import { DatasetWrapper } from "rdfjs-wrapper"
import { Parent } from "./Parent.js"
import { Child } from "./Child.js"
import { Vocabulary } from "../Vocabulary.js"

export class ParentDataset extends DatasetWrapper {
    public get instancesOfParent(): Iterable<Parent> {
        return this.instancesOf(Vocabulary.Parent, Parent)
    }

    public get subjectsOfHasChild(): Iterable<Parent> {
        return this.subjectsOf(Vocabulary.hasChild, Parent)
    }

    public get matchSubjectsOfAnythingParent(): Iterable<Parent> {
        return this.matchSubjectsOf(Parent, undefined, Vocabulary.Parent, undefined)
    }

    public get objectsOfHasChild(): Iterable<Child> {
        return this.objectsOf(Vocabulary.hasChild, Child)
    }
}
