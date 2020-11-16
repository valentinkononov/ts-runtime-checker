import { TypedTestService } from './typed-test.service';
import { TypedConfig } from '../src/lib/typed.config';

describe('typed-arrays-num', () => {
    let sampleService: TypedTestService;

    beforeEach(() => {
        sampleService = new TypedTestService();
        // default configuration with all checks
        TypedConfig.set({
            enable: true,
            throwError: true,
            checkArgumentLength: true,
        });
    });

    describe('numeric array without decorator', () => {
        it('should return positive numbers', () => {
            const argArray: number[] = [0, 1, 2, 0, 3, 4];
            const expected: number[] = [1, 2, 3, 4];
            expect(sampleService.funcArrayNum(argArray)).toStrictEqual(expected);
        });
    });

    describe('numeric array with decorator, correct arguments', () => {
        it('should return positive numbers', () => {
            const argArray: number[] = [0, 1, 2, 0, 3, 4];
            const expected: number[] = [1, 2, 3, 4];
            expect(sampleService.funcArrayNumTyped(argArray)).toStrictEqual(expected);
        });
    });

    describe('numeric array with decorator, object instead of numeric array', () => {
        it('should throw error', () => {
            const value: any = { v: 3 };
            expect(() => {
                sampleService.funcArrayNumTyped(value);
            }).toThrow(TypeError);
        });
    });

    describe('numeric array with decorator, number instead of numeric array', () => {
        it('should throw error', () => {
            const value: any = 3;
            expect(() => {
                sampleService.funcArrayNumTyped(value);
            }).toThrow(TypeError);
        });
    });

    describe('numeric array with decorator, string instead of numeric array', () => {
        it('should throw error', () => {
            const value: any = '21 march';
            expect(() => {
                sampleService.funcArrayNumTyped(value);
            }).toThrow(TypeError);
        });
    });

    describe('numeric array with decorator, date instead of numeric array', () => {
        it('should throw error', () => {
            const value: any = new Date();
            expect(() => {
                sampleService.funcArrayNumTyped(value);
            }).toThrow(TypeError);
        });
    });

    // unfortunately, at the moment TS cannot give information about what type of array element was defined in metadata
    // so we can just check that is it array :( now

    // describe(`numeric array with decorator, array ['str'] instead of numeric array`, () => {
    //     it('should throw error', () => {
    //         const value: any = ['str'];
    //         expect(() => {
    //             sampleService.funcArrayNumTyped(value);
    //         }).toThrow(TypeError);
    //     });
    // });
    //
    // describe(`numeric array with decorator, array [object] instead of numeric array`, () => {
    //     it('should throw error', () => {
    //         const value: any = [{v: 3}];
    //         expect(() => {
    //             sampleService.funcArrayNumTyped(value);
    //         }).toThrow(TypeError);
    //     });
    // });
});
