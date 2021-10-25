# Meaningful Names

## Use Intention-Revealing Names

Change implicit code so that its simplicity becomes explicit.

## Avoid Disinformation

Must avoid leaving false clues that obscure the meaning of the code.

## Make Meaningful Distinctions

* Number series naming (a1, a2, a3, ... aN) are not disinformative - they are non-informative.
* Noise words are another meaningless distinction. Noise words are redundant.
* Distinguish names in such a way that the reader knows what the differences offer.

## Use Pronounceable Names

If you can't pronounce it, you cannot discuss it. This matters because (development) is a social activity.

## Use Searchable Names

Single-letter names and numeric constants have a particular problem in that they are not easy to locate across a body of text.

## Avoid Encodings

## Hungarian Notation

## Member Prefixes

Classes and functions should be small enough that they are not needed.

## Interfaces and Implementations

The preference is to leave interfaces unadorned.

## Avoid Mental Mapping

This problem arises from a choice to use neither problem domain terms nor solution domain terms.

## Class Names

Classes and objects should have noun or noun phrase names.

## Method Names

Methods should have a verb or verb phrase names.

Accessors, mutators, and predicates should be named for their value and prefixed with get, set, and is.

## Don't Be Cute

Say what you mean. Mean what you say.

## Pick One Word per Concept

A consistent lexicon is a great boon to the programmers who must use your code.

## Don't Pun

Avoid using the same word for two purposes.

## Use Solution Domain Names

Use computer science terms, algorithm names, pattern names, math terms, and so forth.

## Use Problem Domain Names

The code that has more to do with problem domain concepts should have names drawn from the problem domain.

## Add Meaningful Context

There are few names which are meaningful in and of themselves - most are not. Instead, place names in context for readers by enclosing them in well-named classes, functions, or namespaces.

## Don't Add Gratuitous Context

Shorter names are generally better than longer ones, so long as they are clear. Add no more context to a name than is necessary.
