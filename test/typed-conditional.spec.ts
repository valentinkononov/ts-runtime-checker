import { TypedTestService } from './typed-test.service';
import { TypedConfig } from '../src';

describe('typed-conditional', () => {
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

    describe('conditional type without decorator', () => {
        it('should return puhpuh as incremented puh', () => {
            expect(sampleService.funcConditional('puh')).toStrictEqual('puhpuh');
        });
        it('should return 22 as string incremented 2', () => {
            expect(sampleService.funcConditional(2)).toStrictEqual('22');
        });
    });

    // describe('conditional type with decorator, correct arguments', () => {
    //     it('should return puhpuh as incremented puh', () => {
    //         expect(
    //             sampleService.funcConditionalTyped('puh'),
    //         ).toStrictEqual('puhpuh');
    //     });
    //     it('should return puhpuh as incremented puh', () => {
    //         expect(
    //             sampleService.funcConditionalTyped(2),
    //         ).toStrictEqual('22');
    //     });
    // });
    //
    // describe('conditional type with decorator, object instead of string', () => {
    //     it('should throw error', () => {
    //         const value: any = { v: 3 };
    //         expect(() => {
    //             sampleService.funcConditionalTyped(value);
    //         }).toThrow();
    //     });
    // });
    //
    // describe('conditional type with decorator, boolean instead of string', () => {
    //     it('should throw error', () => {
    //         const value: any = true;
    //         expect(() => {
    //             sampleService.funcConditionalTyped(value);
    //         }).toThrow();
    //     });
    // });
    //
    // describe('conditional type with decorator, array [1] instead of string', () => {
    //     it('should throw error', () => {
    //         const value: any = [3];
    //         expect(() => {
    //             sampleService.funcConditionalTyped(value);
    //         }).toThrow();
    //     });
    // });
    //
    // describe('conditional type with decorator, array [3] instead of string', () => {
    //     it('should throw error', () => {
    //         const value: any = [3, 4, 5];
    //         expect(() => {
    //             sampleService.funcConditionalTyped(value);
    //         }).toThrow();
    //     });
    // });
});
