import { TypedTestService } from './typed-test.service';
import { TypedConfig } from '../src/lib/typed.config';

describe('typed-numbers', () => {
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

    describe('numeric without decorator', () => {
        it('should return 6', () => {
            expect(sampleService.multiply(2, 3)).toStrictEqual(6);
        });
    });

    describe('numeric with decorator, correct arguments', () => {
        it('should return 6', () => {
            expect(sampleService.funcNumberTyped(2, 3)).toStrictEqual(6);
        });
    });

    describe('numeric with decorator, object instead of number', () => {
        it('should throw error', () => {
            const value: any = { v: 3 };
            expect(() => {
                sampleService.funcNumberTyped(2, value);
            }).toThrow();
        });
    });

    describe('numeric with decorator, date instead of number', () => {
        it('should throw error', () => {
            const value: any = new Date();
            expect(() => {
                sampleService.funcNumberTyped(2, value);
            }).toThrow();
        });
    });

    describe('numeric with decorator, string instead of number', () => {
        it('should throw error', () => {
            const value: any = '3';
            expect(() => {
                sampleService.funcNumberTyped(2, value);
            }).toThrow();
        });
    });

    describe('numeric with decorator, array [1] instead of number', () => {
        it('should throw error', () => {
            const value: any = [3];
            expect(() => {
                sampleService.funcNumberTyped(2, value);
            }).toThrow();
        });
    });

    describe('numeric with decorator, array [3] instead of number', () => {
        it('should throw error', () => {
            const value: any = [3, 4, 5];
            expect(() => {
                sampleService.funcNumberTyped(2, value);
            }).toThrow();
        });
    });
});
