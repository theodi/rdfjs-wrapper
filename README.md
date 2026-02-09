# RDF/JS Wrapper

[![Test Workflow](https://github.com/theodi/rdfjs-wrapper/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/theodi/rdfjs-wrapper/actions/workflows/ci.yml?query=branch%3Amain)
[![npm](https://img.shields.io/npm/v/rdfjs-wrapper)](https://www.npmjs.com/package/rdfjs-wrapper)

An [RDF/JS](https://rdf.js.org/data-model-spec/) object mapping library.


## Purpose

The purpose of the RDF/JS Wrapper library is to enable idiomatic JavaScript object-oriented programming over RDF with type system support (TypeScript compatible).

In other words, [RDF data](https://en.wikipedia.org/wiki/Resource_Description_Framework) is abstracted away and developers can define standard mapping classes to program over it.

Additionally, standard mapping classes can be defined and reused in any number of context where they are relevant (see for example [@solid/object](https://github.com/solid/object)).


## Background

RDF/JS Wrapper uses the interfaces described in the [RDF/JS](https://rdf.js.org/) specifications.

Practically, to map RDF to objects, you need to:
1. Write a class or use an existing class that extends TermWrapper
1. Each class needs a Term, a Dataset, and a DataFactory to be instantiated
1. Each class property will have an associated RDF Property (a string, generally a URL, that is defined by an ontology/vocabulary)
1. Each class property depending on its type can have:
    1. a corresponding ValueMapping to get values, that is translating RDF Terms to JavaScript [primitive values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures#primitive_values) (string, number, boolean...)
    1. a corresponding TermMapping to set values, that is translating Javascript primitive values to RDF Terms
    1. a corresponding ValueMapping and TermMapping for sets of primitive values
    1. a corresponding TermWrapper for properties returning a class
    1. two corresponding TermWrappers (generally the same) for sets of classes
1. Each class mutates the underlying Dataset that is passed to it for instantiation


## Usage

### Wrapping Datasets

Dataset Wrapper allows you to instantiate classes from existing data in a graph.


### Wrapping Terms

Term Wrapper allows to manipulate data in a graph via class properties.


## See also

- [RDF](https://en.wikipedia.org/wiki/Resource_Description_Framework)
- [Knowledge Graph](https://en.wikipedia.org/wiki/Knowledge_graph)


## License

This work is dual-licensed under MIT and Apache 2.0.
You can choose between one of them if you use this work.

`SPDX-License-Identifier: MIT OR Apache-2.0`
