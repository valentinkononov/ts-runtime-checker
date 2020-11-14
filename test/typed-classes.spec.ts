import { TypedTestService } from './typed-test.service';
import { TypedConfig } from '../src/lib/typed.config';
import { OtherClass, SomeClass } from './typed-test.entities';

describe('typed-classes', () => {
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

    describe('class without decorator', () => {
        it('should return copy', () => {
            const value = new SomeClass();
            value.id = 1;
            value.text = 'test';

            expect(sampleService.funcClass(value)).toEqual({
                id: 1,
                text: 'test copy',
            } as SomeClass);
        });
    });

    describe('class with decorator, correct arguments', () => {
        it('should return 2 as getDate', () => {
            const value = new SomeClass();
            value.id = 1;
            value.text = 'test';

            expect(sampleService.funcClassTyped(value)).toEqual({
                id: 1,
                text: 'test copy',
            } as SomeClass);
        });
    });

    describe('class with decorator, other object instead of instance of class', () => {
        it('should throw error', () => {
            const value: any = { v: 3 };
            expect(() => {
                sampleService.funcClassTyped(value);
            }).toThrow();
        });
    });

    describe('class with decorator, other object instead of date', () => {
        it('should throw error', () => {
            const value: any = new OtherClass();
            value.id = 1;
            value.comment = 'other';

            expect(() => {
                sampleService.funcClassTyped(value);
            }).toThrow();
        });
    });

    describe('class with decorator, number instead of instance of class', () => {
        it('should throw error', () => {
            const value: any = 3;
            expect(() => {
                sampleService.funcClassTyped(value);
            }).toThrow();
        });
    });

    describe('class with decorator, string instead of instance of class', () => {
        it('should throw error', () => {
            const value: any = '21 march';
            expect(() => {
                sampleService.funcClassTyped(value);
            }).toThrow();
        });
    });

    describe('class with decorator, array [1] instead of instance of class', () => {
        it('should throw error', () => {
            const value: any = [3];
            expect(() => {
                sampleService.funcClassTyped(value);
            }).toThrow();
        });
    });

    describe('class with decorator, array [3] instead of instance of class', () => {
        it('should throw error', () => {
            const value: any = [3, 4, 5];
            expect(() => {
                sampleService.funcClassTyped(value);
            }).toThrow();
        });
    });
});
