import { TypedTestService } from './typed-test.service';
import { TypedConfig } from '../src';

describe('typed-dates', () => {
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

    describe('date without decorator', () => {
        it('should return 2 as getDate', () => {
            const date = new Date();
            expect(sampleService.funcDate(2, date).getDate()).toStrictEqual(2);
        });
    });

    describe('date with decorator, correct arguments', () => {
        it('should return 2 as getDate', () => {
            const date = new Date();
            expect(sampleService.funcDateTyped(2, date).getDate()).toStrictEqual(2);
        });
    });

    describe('date with decorator, object instead of date', () => {
        it('should throw error', () => {
            const value: any = { v: 3 };
            expect(() => {
                sampleService.funcDateTyped(2, value);
            }).toThrow();
        });
    });

    describe('date with decorator, number instead of date', () => {
        it('should throw error', () => {
            const value: any = 3;
            expect(() => {
                sampleService.funcDateTyped(2, value);
            }).toThrow();
        });
    });

    describe('date with decorator, string instead of number', () => {
        it('should throw error', () => {
            const value: any = '21 march';
            expect(() => {
                sampleService.funcDateTyped(2, value);
            }).toThrow();
        });
    });

    describe('date with decorator, array [1] instead of date', () => {
        it('should throw error', () => {
            const value: any = [3];
            expect(() => {
                sampleService.funcDateTyped(2, value);
            }).toThrow();
        });
    });

    describe('date with decorator, array [3] instead of date', () => {
        it('should throw error', () => {
            const value: any = [3, 4, 5];
            expect(() => {
                sampleService.funcNumberTyped(2, value);
            }).toThrow();
        });
    });
});
