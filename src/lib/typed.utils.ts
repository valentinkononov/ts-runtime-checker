/*
 * Identifies actual type of object by using typeof and than checking constructor name
 * */
import { TypedOptions } from './typed.config';

export const getActualType = (value: unknown): string => {
    let actualType = (typeof value).toString();
    if (value.constructor) {
        actualType = value.constructor.name;
    }
    return actualType;
};

/*
 * Log error or throw error depending on options settings
 * */
export const logOrThrow = (message: string, options: TypedOptions): void => {
    if (options.throwError) {
        throw new Error(message);
    } else if (options.customLogger) {
        options.customLogger(message);
    } else {
        // tslint:disable-next-line:no-console
        console.log(message);
    }
};

export const logOrThrowIncorrectReturnType = (
    fnName: string,
    className: string,
    returnTypeName: string,
    expectedReturnTypeName: string,
    options: TypedOptions,
): void => {
    const errorMessage = `Function ${fnName} of class ${className} return type: ${returnTypeName} is different from expected return type: ${expectedReturnTypeName}.`;
    logOrThrow(errorMessage, options);
};

export const logOrThrowIncorrectArgument = (
    fnName: string,
    className: string,
    argumentValue: unknown,
    actualArgTypeName: string,
    expectedArgTypeName: string,
    options: TypedOptions,
): void => {
    const errorMessage = `Argument in function ${fnName} of class ${className}: ${argumentValue} has type: ${actualArgTypeName} different from expected type: ${expectedArgTypeName}.`;
    logOrThrow(errorMessage, options);
};

export interface Type<T> extends Function {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
}
