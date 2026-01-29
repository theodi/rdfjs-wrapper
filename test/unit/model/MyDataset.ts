import { DatasetWrapper } from "rdfjs-wrapper"
import { Parent } from "./Parent.js"
import { Vocabulary } from "../Vocabulary.js"

export class MyDataset extends DatasetWrapper {
    public get parents(): Iterable<Parent> {
        return this.subjectsOf(Parent, Vocabulary.hasChild)
    }
}
