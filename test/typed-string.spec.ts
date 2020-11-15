import { TypedTestService } from './typed-test.service';
import { TypedConfig } from '../src';

describe('typed-string', () => {
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

    describe('string without decorator', () => {
        it('should return puhpuh as incremented puh', () => {
            expect(sampleService.funcString('puh', 2)).toStrictEqual('puhpuh');
        });
    });

    describe('string with decorator, correct arguments', () => {
        it('should return puhpuh as incremented puh', () => {
            expect(sampleService.funcStringTyped('puh', 2)).toStrictEqual('puhpuh');
        });
    });

    describe('string with decorator, object instead of string', () => {
        it('should throw error', () => {
            const value: any = { v: 3 };
            expect(() => {
                sampleService.funcStringTyped(value, 2);
            }).toThrow();
        });
    });

    describe('string with decorator, number instead of string', () => {
        it('should throw error', () => {
            const value: any = 3;
            expect(() => {
                sampleService.funcStringTyped(value, 2);
            }).toThrow();
        });
    });

    describe('string with decorator, boolean instead of string', () => {
        it('should throw error', () => {
            const value: any = true;
            expect(() => {
                sampleService.funcStringTyped(value, 2);
            }).toThrow();
        });
    });

    describe('string with decorator, array [1] instead of string', () => {
        it('should throw error', () => {
            const value: any = [3];
            expect(() => {
                sampleService.funcStringTyped(value, 2);
            }).toThrow();
        });
    });

    describe('string with decorator, array [3] instead of string', () => {
        it('should throw error', () => {
            const value: any = [3, 4, 5];
            expect(() => {
                sampleService.funcStringTyped(value, 2);
            }).toThrow();
        });
    });
});
