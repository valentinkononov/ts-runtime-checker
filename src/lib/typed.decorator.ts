import 'reflect-metadata';
import { TypedConfig, TypedOptions } from './typed.config';

// target = class
// propertyName = function
// descriptor = what a function

// Related: https://github.com/microsoft/TypeScript/issues/7169
// http://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-4
// check how JEST verifies type equality. toStrictEqual

// DONE: arrays checks
// DONE: Dates checks
// DONE: more tests
// DONE: string checks
// DONE: add Boolean checks
// TODO: Bigint checks
// TODO: Optional arguments checks
// DONE: Tests for conditional types
// DONE: move all checks into separate functions
// TODO: remove console logs
// TODO: re-write logOrThrow to initiate kind of logger, depending on options
// DONE: check return type by 'design:returntype'
// DONE: decorator for class ??
// TODO: research about checks everywhere
// TODO: add release notes, correct readme
// TODO: tests for any

/***
 * Typed decorator checks function arguments amount and types in runtime
 * In case if caller used incorrect types in runtime, Error will be thrown
 * */
// tslint:disable-next-line:ban-types
export function Typed(config?: TypedOptions) {
    /*
     * Log error or throw error depending on options settings
     * */
    const logOrThrow = (message: string, options: TypedOptions) => {
        if (options.throwError) {
            throw new Error(message);
        } else {
            if (options.customLogger) {
                return options.customLogger(message);
            }
            // tslint:disable-next-line:no-console
            console.log(message);
        }
    };

    const logParamsInfo = (paramTypes: any[]) => {
        // each element in paramTypes has: name, isArray, prototype, from, of
        // console.log(Object.getOwnPropertyNames(paramTypes[0]));
        // console.log(Object.getOwnPropertyNames(paramTypes[0].prototype));
        // console.log(Object.getOwnPropertyNames(paramTypes[0].prototype.constructor));
        // console.log(paramTypes[0].name);
        // console.log(paramTypes[0].prototype.name);
    };

    /*
     * Identifies actual type of object by using typeof and than checking constructor name
     * */
    const getActualType = (value: any) => {
        let actualType = (typeof value).toString();
        if (value.constructor) {
            actualType = value.constructor.name;
        }
        return actualType;
    };

    /*
     * Check that return type from metadata is the same as actual return type
     * */
    // tslint:disable-next-line:ban-types
    const checkReturnType = (target: Object, propertyName: string, result: any, options: TypedOptions) => {
        const returnType = Reflect.getMetadata('design:returntype', target, propertyName);
        if (returnType !== undefined && returnType !== null && result !== undefined && result !== null) {
            const expectedReturnType = returnType.name;
            const actualReturnType = getActualType(result);
            // console.log(`[TEST-RETURN]: ${expectedReturnType}, ${actualReturnType}`);
            if (actualReturnType !== expectedReturnType) {
                const errorMessage = `Function ${propertyName} of class ${target.constructor.name} return type: ${actualReturnType} is different from expected return type: ${expectedReturnType}.`;
                logOrThrow(errorMessage, options);
            }
        }
    };

    /*
     * Read parameters and types from reflect-metadata
     * */
    // tslint:disable-next-line:ban-types
    const getParamsMetadata = (target: Object, propertyName: string) => {
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyName);
        logParamsInfo(paramTypes);
        return paramTypes;
    };

    /*
     * Check that length of expected arguments from metadata is equal to length of actual arguments in runtime
     * */
    // tslint:disable-next-line:ban-types
    const checkArgumentsLength = (
        target: Object,
        propertyName: string,
        paramTypes: any[],
        options: TypedOptions,
        args: any,
    ) => {
        if (options.checkArgumentLength) {
            // 1 check length of arguments and parameters
            if (args.length !== paramTypes.length) {
                const errorMessage = `Parameters length in function ${propertyName} of class ${target.constructor.name}: ${paramTypes.length} is different from arguments length: ${args.length}`;
                logOrThrow(errorMessage, options);
            }
        }
    };

    /*
     * check types of arguments and parameters in metadata, should be equal
     * */
    // tslint:disable-next-line:ban-types
    const checkArguments = (
        target: Object,
        propertyName: string,
        paramTypes: any[],
        options: TypedOptions,
        args: any,
    ) => {
        for (let i = 0; i < args.length; i++) {
            // if we have more than expected number of arguments
            if (i >= paramTypes.length) {
                break;
            }

            const actualType = getActualType(args[i]);
            const expectedType: string = paramTypes[i].name;

            // } else if (paramTypes[i] instanceof Function) {
            //     // TODO: verify
            //     // expectedType = typeof paramTypes[i]();
            // }

            // console.log('[TEST]', actualType, expectedType);
            if (actualType !== expectedType) {
                const errorMessage = `Argument in function ${propertyName} of class ${target.constructor.name}: ${args[i]} has type: ${actualType} different from expected type: ${expectedType}.`;
                logOrThrow(errorMessage, options);
            }
        }
    };

    // tslint:disable-next-line:ban-types
    return (target: Object, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {
        const method = descriptor.value;
        descriptor.value = function () {
            const options: TypedOptions = config || TypedConfig.get();
            if (!options.enable) {
                return method.apply(this, arguments);
            }
            const paramTypes = getParamsMetadata(target, propertyName);
            checkArgumentsLength(target, propertyName, paramTypes, options, arguments);
            checkArguments(target, propertyName, paramTypes, options, arguments);

            const result = method.apply(this, arguments);
            checkReturnType(target, propertyName, result, options);
            return result;
        };
    };
}
