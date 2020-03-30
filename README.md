# ts-stronger-types

[![Build Status](https://travis-ci.org/valentinkononov/ts-runtime-checker.svg?branch=master)](https://travis-ci.org/valentinkononov/ts-runtime-checker)
[![codecov](https://codecov.io/gh/valentinkononov/ts-runtime-checker/branch/master/graph/badge.svg)](https://codecov.io/gh/valentinkononov/ts-runtime-checker)
![npm](https://img.shields.io/npm/v/ts-stronger-types)
![npm bundle size](https://img.shields.io/bundlephobia/min/ts-stronger-types?label=bundle-size)
![npm](https://img.shields.io/npm/dm/ts-stronger-types)
![NPM](https://img.shields.io/npm/l/ts-stronger-types)

![](images/strong-logo-web.jpeg)

Allows to emulate *stronger* types for Typescript in runtime by adding checks for actual type.
With it you can rely on your Typescript code more in most cases.
Throws error if passed type is different from what you expect (like in C# or similar languages), making your Typescript application behaves similar to application written in strong typed language.
Current version supports checking primitive types (String, Number) and Objects for type name equality. 

> If you tried this, please leave some feedback as issue in [repo](https://github.com/valentinkononov/ts-runtime-checker/issues).  

## Contents

 * [Mission](#mission)
 * [Installation](#installation)
 * [Usage](#usage)
 * [Config](#config)
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
    import {Typed} from 'ts-stronger-types';

    @Typed()
    public multiplyChecked(num: number, num2: number): number {
        return  num * num2;
    }
```

As result, you will keep types checking NOT only during code compilation, but in Runtime as well.

In case of correct runtime values, function is just executed and result is returned.

But when passed arguments have unexpected types, execution will end up with Exception (Error) or log entry if configured.
You can emulate this incorrect behavior through `any` in test scenario:

```typescript
    const value: any = { v: 3};
    const result = service.multiplyChecked(2, value);
    // Error: Argument: [object Object] has type: object different from expected type: number 
```

In this case no error will be thrown, but console.log will push message.

# Config

There is configuration which can turn on / off features of the library. 

### What can be configured:

```typescript
export interface TypedOptions {
    enable: boolean;
    throwError: boolean;
    checkArgumentLength: boolean;
}
```

 - enable / disable all checks
 - enable / disable throwing errors
 - enable / disable checks of argument length

Default - all is true

You can use one of the following options to configure:

### Per Function

```typescript
    import {Typed} from 'ts-stronger-types';

    @Typed({throwError: false, checkArgumentLength: false})
    public multiplyChecked(num: number, num2: number): number {
        return  num * num2;
    }
```

This setting has the biggest priority.

### During Application Startup

```typescript
    import {TypedConfig} from 'ts-stronger-types';

    TypedConfig.set({
            enable: true,
            throwError: true,
            checkArgumentLength: true,
        });
```

This setting has the second priority.

### With Environment Variables

You can turn on / off the whole feature using environment variable `TYPED`.
Config tries to read and parse value from 'process.env.TYPED', it can have value like 'true', 'yes' or 1 for enabling and 'false', 'no' or 0 for disabling.
For example, your `.env` file can have: `TYPED = false`

## Motivation

The main motivation is to have system which behaves more like strong type language, but can function in Javascript ecosystem.
I described it in more details in the article at [kononov.space](http://www.kononov.space/runtime_type_checks_in_ts_js/). In russian at the moment, translation will be soon. 

## What is checked?

#### Checks in Code of decorator:

 - arguments length
 - type of each argument (should be equal to type of parameter in reflect-metadata)
 - type of return value (should be equal to return type in reflect-metadata)

#### What Types we can verify?
 
 - number
 - string
 - date
 - boolean
 - array
 - class

#### What Types we CANNOT verify?

Due to current limitations of Typescript / Javascript we cannot verify in runtime following types:

 - interfaces. Each interface doesn't have prototype and it's name is undefined in runtime. 
 - type of array members. This is due to lack of reflect-metadata for arrays in Typescript. Potentially it can be done in future if TS team bring needed metadata

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
 - 0.1.0 - verification of classes, arrays, return types, code refactoring, 64 tests added, settings

## Plans
s
I'm thinking about following potential features:

 - Add ability to use this decorator for class itself, not just for particular function
 - Add more flexible (configurable) logging, not just console.log for example
 - Maybe some global checks, but not sure would it be possible

## Issues

Post issues in [github/ts-runtime-checker/issues](https://github.com/valentinkononov/ts-runtime-checker/issues)

Thanks!


