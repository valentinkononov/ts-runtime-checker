import { TypedTestService } from './typed-test.service';
import { TypedConfig } from '../src';

describe('typed-boolean', () => {
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

    describe('boolean without decorator', () => {
        it('should return 3 as incremented 2', () => {
            expect(sampleService.funcBoolean(2, true)).toStrictEqual(3);
        });
    });

    describe('boolean with decorator, correct arguments', () => {
        it('should return 3 as incremented 2', () => {
            expect(sampleService.funcBooleanTyped(2, true)).toStrictEqual(3);
        });
    });

    describe('boolean with decorator, object instead of boolean', () => {
        it('should throw error', () => {
            const value: any = { v: 3 };
            expect(() => {
                sampleService.funcBooleanTyped(2, value);
            }).toThrow();
        });
    });

    describe('boolean with decorator, number instead of boolean', () => {
        it('should throw error', () => {
            const value: any = 3;
            expect(() => {
                sampleService.funcBooleanTyped(2, value);
            }).toThrow();
        });
    });

    describe('boolean with decorator, string instead of boolean', () => {
        it('should throw error', () => {
            const value: any = '21 march';
            expect(() => {
                sampleService.funcBooleanTyped(2, value);
            }).toThrow();
        });
    });

    describe('boolean with decorator, array [1] instead of boolean', () => {
        it('should throw error', () => {
            const value: any = [3];
            expect(() => {
                sampleService.funcBooleanTyped(2, value);
            }).toThrow();
        });
    });

    describe('boolean with decorator, array [3] instead of boolean', () => {
        it('should throw error', () => {
            const value: any = [3, 4, 5];
            expect(() => {
                sampleService.funcBooleanTyped(2, value);
            }).toThrow();
        });
    });
});
