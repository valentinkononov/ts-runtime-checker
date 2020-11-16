import { getActualType, logOrThrowIncorrectArgument, logOrThrowIncorrectReturnType, Type } from './typed.utils';
import { TypedConfig } from './typed.config';

/*
 * Experimental function to check types in runtime for standalone functions, which are not part of any class
 * Because there is no metadata for such cases, we need to provide Types info when calling this function
 * sample: `checked<Number, Number>(doubleNumber, value, Number, Number);`
 * I'm working to find a better way, but this is OK for library functions, which is exposed outside
 * */
export function checked<TInput1, TOut>(
    fn: (arg1: TInput1) => TOut,
    arg1: TInput1,
    arg1Type: Type<TInput1>,
    outType: Type<TOut>,
): TOut {
    const arg1ActualType = getActualType(arg1);
    const arg1ExpectedType = arg1Type.name;
    if (arg1ActualType !== arg1ExpectedType) {
        logOrThrowIncorrectArgument(fn.name, 'global', arg1, arg1ActualType, arg1ExpectedType, TypedConfig.get());
    }

    // call initial function
    const result = fn(arg1);

    const resultActualType = getActualType(result);
    const resultExpectedType = outType.name;
    if (resultActualType !== resultExpectedType) {
        logOrThrowIncorrectReturnType(fn.name, 'global', resultActualType, resultExpectedType, TypedConfig.get());
    }
    return result;
}
