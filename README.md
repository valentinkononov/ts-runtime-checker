# ts-stronger-types

[![Build Status](https://travis-ci.org/valentinkononov/ts-runtime-checker.svg?branch=master)](https://travis-ci.org/valentinkononov/ts-runtime-checker)
[![codecov](https://codecov.io/gh/valentinkononov/ts-runtime-checker/branch/master/graph/badge.svg)](https://codecov.io/gh/valentinkononov/ts-runtime-checker)
![npm](https://img.shields.io/npm/v/ts-stronger-types)
![npm bundle size](https://img.shields.io/bundlephobia/min/ts-stronger-types?label=bundle-size)
![npm](https://img.shields.io/npm/dm/ts-stronger-types)
![NPM](https://img.shields.io/npm/l/ts-stronger-types)

Allows to emulate *stronger* types for Typescript in runtime by adding checks for actual type.
With it you can rely on your Typescript code more in most cases.
Throws error if passed type is different from what you expect (like in C# or similar languages), making your Typescript application behaves similar to application written in strong typed language.
Current version supports checking primitive types (String, Number) and Objects for type name equality. 

> If you tried this, please leave some feedback as issue in [repo](https://github.com/valentinkononov/ts-runtime-checker/issues).  

## Contents

 * [Mission](#mission)
 * [Installation](#installation)
 * [Usage](#usage)
 * [Motivation](#motivation)
 * [Performance Overhead](#performance-overhead)
 * [Plans](#plans)
 * [Release Notes](#release-notes)
 * [Issues](#issues)
 
## Mission

Typescript gives huge benefit of compilation and static code analysis. But in runtime we still have pure Javascript. As Language itself it serves for its purpose, and it's very fast nowadays. 
But when we design complicated systems, we need to have better sense of code! Like we do in languages like C# (which obviously has a own drawbacks and complexities).
The mission and the most important idea of this project is to make Typescript / Javascript programming more predictable and runtime safer, make it closer to strong typed languages, functioning at the junction of flexibility and type strength.
This will allow to rely on the code more, even when you write library which will be used by other projects, and you don't know how.

## Installation

```shell script
    npm install ts-stronger-types --save
```

> this lib will be used in runtime, so add to 'dependencies', NOT 'devDependencies'

> you need to have Typescript in your project with enabled decorators 

## Usage

In current version there is `@Typed()` decorator, applicable for functions. Just apply it to your function as first decorator in the sequence

```typescript
    @Typed()
    public multiplyChecked(num: number, num2: number): number {
        return  num * num2;
    }
```

As result, you will keep types checking NOT only during code compilation, but in Runtime as well.

Successful usage is not different from regular cases, function is just executed and result is returned.

Unsuccessful case (when passed parameters have unexpected types) will end up with Exception (Error) or log entry if configured.
You can emulate through `any` in test scenario:

```typescript
    const value: any = { v: 3};
    const result = service.multiplyChecked(2, value);
    // Error: Argument: [object Object] has type: object different from expected type: number 
```

If for some reason you don't want to catch all these errors, but still would like to see potential issues, use this configuration

```typescript
    @Typed({throwError: false})
    public multiplyChecked(num: number, num2: number): number {
        return  num * num2;
    }
```

In this case no error will be thrown, but console.log will push message.

## Motivation

The main motivation is to have system which behaves more like strong type language, but can function in Javascript ecosystem.
I described it in more details in the article at [kononov.space](http://www.kononov.space/runtime_type_checks_in_ts_js/). In russian at the moment, translation will be soon. 

## Performance Overhead

Performance overhead is minimal. Measurements where taken with console.time.

First Run

|part|foreach|for|
|---|---|---|
|clean_func|0.113ms|0.080ms|
|metadata|0.208ms|0.148ms|
|typeof|0.063ms|0.045ms|
|foreach|0.303ms|0.163ms|
|checked_func|0.785ms|0.515ms|

Second Run

|part|foreach|for|
|---|---|---|
|clean_func|0.113ms|0.080ms|
|metadata|0.012ms|0.031ms|
|typeof|0.002ms|0.001ms|
|foreach|0.066ms|0.040ms|
|checked_func|0.140ms|0.221ms| 

## Release Notes

 - 0.0.4 - initial code, documentation, tests and `@Typed()` decorator itself.

## Plans

I'm thinking about following potential features:

 - Add ability to use this decorator for class itself, not just for particular function
 - Add more flexible (configurable) logging, not just console.log for example
 - Maybe some global checks, but not sure would it be possible

## Issues

Post issues in [github/ts-runtime-checker/issues](https://github.com/valentinkononov/ts-runtime-checker/issues)

Thanks!


