import 'reflect-metadata';
import { TypedConfig, TypedOptions } from './typed.config';

// target = class
// propertyName = function
// descriptor = what a function

// TODO: arrays checks
// TODO: Dates checks
// TODO: string checks
// TODO: Bigint checks
// TODO: Optional arguments checks
// TODO: move all checks into separate functions
// TODO: remove console logs

const DATE_TYPE: string = 'Date';

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

            const paramTypes = Reflect.getMetadata(
                'design:paramtypes',
                target,
                propertyName,
            );

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

                let expectedType: string = paramTypes[i].name;

                if (expectedType === DATE_TYPE) {
                    // do nothing
                } else if (paramTypes[i] instanceof Function) {
                    expectedType = typeof paramTypes[i]();
                }
                //console.log('[TEST]', actualType, expectedType);
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
