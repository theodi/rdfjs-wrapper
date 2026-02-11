import { DatasetWrapper } from "@rdfjs/wrapper"
import { Parent } from "./Parent.js"
import { Vocabulary } from "../Vocabulary.js"

export class ParentDataset extends DatasetWrapper {
    public get subjectsOfHasChild(): Iterable<Parent> {
        return this.subjectsOf(Vocabulary.hasChild, Parent)
    }
}
