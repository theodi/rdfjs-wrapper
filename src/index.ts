import { Parent } from "./model/Parent.js"
import { Child } from "./model/Child.js"
import { Parser, Store, DataFactory } from "n3"

const rdf = `
prefix : <https://example.org/>
<x>
  :hasString "o1" ;
  :hasChild [
    :hasName "name" ;
  ] ;
  :hasChildSet [
    :hasName "1" ;
  ], [
    :hasName "2" ;
  ] .
`;

const dataset = new Store();
dataset.addQuads(new Parser().parse(rdf));
const x = DataFactory.namedNode("x")

const p = Parent.wrap(x, dataset, DataFactory)

console.log("p.hasString", p.hasString);
console.log("p.hasChild.hasName", p.hasChild.hasName);
for (const c of p.hasChildSet) {
  console.log("p.hasChildSet.hasName", c.hasName);
}

p.hasString = "x"
console.log("p.hasString modified", p.hasString);

const newNode = DataFactory.namedNode("example.com/s")
const newChild = Child.wrap(newNode, dataset, DataFactory)
newChild.hasName = "new name"
p.hasChild = newChild

console.log("p.hasChild.hasName modified", p.hasChild.hasName);

p.hasChildSet.add(newChild)
for (const c of p.hasChildSet) {
    console.log("p.hasChildSet.hasName modified", c.hasName);
}
