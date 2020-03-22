import 'reflect-metadata';
import { TypedConfig, TypedOptions } from './typed.config';

// target = class
// propertyName = function
// descriptor = what a function

// Related: https://github.com/microsoft/TypeScript/issues/7169
// http://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-4

// DONE: arrays checks
// DONE: Dates checks
// DONE: more tests
// TODO: string checks
// TODO: Bigint checks
// TODO: Optional arguments checks
// TODO: move all checks into separate functions
// TODO: remove console logs
// TODO: add Boolean checks
// TODO: check return type by 'design:returntype'

const DATE_TYPE: string = 'Date';
const ARRAY_TYPE: string = 'Array';

/***
 * Typed decorator checks function arguments amount and types in runtime
 * In case if caller used incorrect types in runtime, Error will be thrown
 * */
// tslint:disable-next-line:ban-types
export function Typed(config?: TypedOptions) {
    // tslint:disable-next-line:ban-types
    return (
        target: Object,
        propertyName: string,
        descriptor: TypedPropertyDescriptor<Function>,
    ) => {
        const method = descriptor.value;
        descriptor.value = function() {
            const options: TypedOptions = config || TypedConfig.get();
            if (!options.enable) {
                return method.apply(this, arguments);
            }

            const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyName);

            // each element in paramTypes has: name, isArray, prototype, from, of
            // console.log(Object.getOwnPropertyNames(paramTypes[0]));

            if (options.checkArgumentLength) {
                // 1 check length of arguments and parameters
                if (arguments.length !== paramTypes.length) {
                    const errorMessage = `Parameters length: ${paramTypes.length} is different from arguments length: ${arguments.length}`;
                    if (options.throwError) {
                        throw new Error(errorMessage);
                    } else {
                        // tslint:disable-next-line:no-console
                        console.log(errorMessage);
                    }
                }
            }

            // 2 check types of arguments and parameters, should be equal
            for (let i = 0; i < arguments.length; i++) {
                // if we have more than expected number of arguments
                if (i >= paramTypes.length) {
                    break;
                }

                let actualType = (typeof arguments[i]).toString();
                if (arguments[i] instanceof Date) {
                    actualType = DATE_TYPE;
                }

                if (arguments[i] instanceof Array) {
                    actualType = ARRAY_TYPE;
                }

                let expectedType: string = paramTypes[i].name;

                if (expectedType === DATE_TYPE) {
                    // do nothing
                } else if (expectedType === ARRAY_TYPE) {
                    // console.log(arguments[i].length);
                    // console.log(typeof arguments[i][0]);

                } else if (paramTypes[i] instanceof Function) {
                    expectedType = typeof paramTypes[i]();
                }
                // console.log('[TEST]', actualType, expectedType);
                if (actualType !== expectedType) {
                    const errorMessage = `Argument: ${arguments[i]} has type: ${actualType} different from expected type: ${expectedType}.`;
                    if (options.throwError) {
                        throw new Error(errorMessage);
                    } else {
                        // tslint:disable-next-line:no-console
                        console.log(errorMessage);
                    }
                }
            }

            return method.apply(this, arguments);
        };
    };
}
