# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Build
```sh
npm run build
```
Compiles to `dist/` (both `dist/esm/` and `dist/types/`). A `postbuild` step runs `config/copy` and `config/fix-imports`. Must build before running tests since the test package references `file:../../dist`.

### Lint
```sh
npm run lint
```
ESLint with TypeScript plugin, jsdoc plugin, prefer-arrow plugin. Config is `eslint.config.mjs`.

### Tests
Tests live in `tests/unittests/` and have their own `package.json`. Run from there:
```sh
cd tests/unittests && npm test
```
To run a single test file:
```sh
cd tests/unittests && npx jest --testPathPattern=Where
```
Tests require a prior `npm run build` from the root since they depend on `dist/`.

### Docs
```sh
npm run doc
```
Generates TypeDoc docs to `doc/`. Excludes `_private/` and `_ordered/` folders.

## Architecture

This library is a TypeScript port of .NET LINQ. It provides three parallel enumerable types, each implementing the same set of operators:

- **`IEnumerable<T>`** — synchronous, implements `Iterable<T>`. Backed by `BasicEnumerable<T>` (generator-based) or `ArrayEnumerable<T>` (extends `Array<T>` with array-optimized overrides).
- **`IAsyncEnumerable<T>`** — async, implements `AsyncIterable<T>`. Backed by `BasicAsyncEnumerable<T>`.
- **`IParallelEnumerable<T>`** — parallel async, implements `AsyncIterable<T>`. Backed by `BasicParallelEnumerable<T>` with three generator strategies (`ParallelGeneratorType`).

### Source layout

```
src/
  types/           # Interfaces: IEnumerable, IAsyncEnumerable, IParallelEnumerable, IOrderedXxx, comparers
  sync/
    _private/      # One file per operator (all, where, select, …) — standalone functions
    _ordered/      # Internal helpers for sorting
    static/        # from, empty, range, repeat, flatten, enumerateObject
    BasicEnumerable.ts
    ArrayEnumerable.ts
    OrderedEnumerable.ts
  async/           # Same structure as sync/
  parallel/        # Same structure as sync/
  shared/          # Exception types (InvalidOperationException, ArgumentOutOfRangeException) and comparers
  initializer/
    bindLinq.ts         # Binds all sync operators to a prototype
    bindLinqAsync.ts    # Binds all async operators
    bindLinqParallel.ts # Binds all parallel operators
    bindArray.ts        # Binds to Array and typed array prototypes
    bindString.ts       # Binds to String prototype
    initializeLinq.ts   # Calls all bind* functions for native JS types
    initializer.ts      # Entry point — runs binds at module load time for Basic* classes
  index.ts         # Public API re-exports
```

### How operators are attached to classes

Every operator (e.g. `where`) lives as a standalone function in `_private/` taking the source as its first argument: `where(source: IEnumerable<T>, predicate: ...) => IEnumerable<T>`.

`bindLinq` (and its async/parallel counterparts) wrap each of these functions so that `this` becomes the first argument, then assigns the wrapped function to the class prototype. This avoids circular import chains between the class files and operator files.

The `Basic*` classes use a TypeScript pattern to get both a concrete class and an interface without redeclaring members:
```ts
export class BasicEnumerable<T> { /* iterator only */ }
export interface BasicEnumerable<T> extends IEnumerable<T> { }
```
This works because the methods are injected at runtime by `bindLinq`. TypeScript merges the class and interface declarations for type checking.

`initializer.ts` runs the binds at module load time for `BasicEnumerable`, `BasicAsyncEnumerable`, `BasicParallelEnumerable`, and `ArrayEnumerable`. For native types (Array, Map, Set, String, typed arrays), consumers must call `initializeLinq()` manually.

### Two usage modes

1. **Wrapper** — use `from(array).where(...).toArray()`. No prototype modification needed.
2. **Extension methods** — call `initializeLinq()` once at startup and declare the global augmentations; then `[1,2,3].where(...)` works directly.

### Naming differences from .NET LINQ

Some method names differ to avoid conflicts with built-in JS methods:
- `Concat` → `concatenate` (avoids `Array.prototype.concat`)
- `Join` → `joinByKey` (avoids `Array.prototype.join`)
- `ToDictionary` → `toMap`
- `ToHashSet` → `toSet`

### Async naming convention

Any method that accepts an async predicate/selector is named with the `Async` suffix (e.g. `whereAsync`, `selectAsync`). These return `IAsyncEnumerable` or `Promise<T>` rather than the synchronous type, even when called on `IEnumerable`.

### Test helpers

`tests/unittests/TestHelpers.ts` provides wrapper functions that automatically run each test against all three enumerable implementations (ArrayEnumerable, BasicEnumerable, and plain Array with prototype extension):
- `itEnumerable` / `itEnumerableAsync` — runs against sync enumerables
- `itAsync` — single async test
- `itParallel` — runs against all three `ParallelGeneratorType` variants
