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
export function Typed(
    config?: TypedOptions,
): // eslint-disable-next-line @typescript-eslint/ban-types
(target: unknown, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => void {
    /*
     * Log error or throw error depending on options settings
     * */
    const logOrThrow = (message: string, options: TypedOptions): void => {
        if (options.throwError) {
            throw new Error(message);
        } else if (options.customLogger) {
            options.customLogger(message);
        } else {
            // tslint:disable-next-line:no-console
            console.log(message);
        }
    };

    // eslint-disable-next-line
    const logParamsInfo = (paramTypes: any[]) => {
        // each element in paramTypes has: name, isArray, prototype, from, of
        console.debug(Object.getOwnPropertyNames(paramTypes[0]));
        console.debug(Object.getOwnPropertyNames(paramTypes[0].prototype));
        console.debug(Object.getOwnPropertyNames(paramTypes[0].prototype.constructor));
        console.debug(paramTypes[0].name);
        console.debug(paramTypes[0].prototype.name);
    };

    /*
     * Identifies actual type of object by using typeof and than checking constructor name
     * */
    const getActualType = (value: unknown): string => {
        let actualType = (typeof value).toString();
        if (value.constructor) {
            actualType = value.constructor.name;
        }
        return actualType;
    };

    /*
     * Check that return type from metadata is the same as actual return type
     * */
    // eslint-disable-next-line @typescript-eslint/ban-types
    const checkReturnType = (target: unknown, propertyName: string, result: unknown, options: TypedOptions): void => {
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
    // eslint-disable-next-line @typescript-eslint/ban-types
    const getParamsMetadata = (target: unknown, propertyName: string): unknown[] => {
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyName);
        // logParamsInfo(paramTypes);
        return paramTypes;
    };

    /*
     * Check that length of expected arguments from metadata is equal to length of actual arguments in runtime
     * */
    // eslint-disable-next-line @typescript-eslint/ban-types
    const checkArgumentsLength = (
        target: unknown,
        propertyName: string,
        paramTypes: unknown[],
        options: TypedOptions,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        args: any,
    ): void => {
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
    // eslint-disable-next-line @typescript-eslint/ban-types
    const checkArguments = (
        target: unknown,
        propertyName: string,
        paramTypes: unknown[],
        options: TypedOptions,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        args: any,
    ): void => {
        for (let i = 0; i < args.length; i++) {
            // if we have more than expected number of arguments
            if (i >= paramTypes.length) {
                break;
            }

            const actualType = getActualType(args[i]);
            const expectedType: string = (paramTypes[i] as { name: string }).name;

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

    // eslint-disable-next-line @typescript-eslint/ban-types
    return (target: unknown, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {
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
