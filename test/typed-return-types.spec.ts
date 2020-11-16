import { TypedConfig } from '../src';
import { TypedReturnTest } from './typed-return-test.service';
import { SomeClass } from './typed-test.entities';

describe('return types', () => {
    let sampleService: TypedReturnTest;

    beforeEach(() => {
        sampleService = new TypedReturnTest();
        // default configuration with all checks
        TypedConfig.set({
            enable: true,
            throwError: true,
            checkArgumentLength: true,
        });
    });

    describe('return type number', () => {
        it('should return number', () => {
            const result = sampleService.getNumberCorrect();
            const actualType = (typeof result).toString();
            expect(actualType).toStrictEqual(Number.name.toLowerCase());
        });

        it('should throw error instead of returning string', () => {
            expect(() => {
                sampleService.getNumberWrongString();
            }).toThrow(TypeError);
        });

        it('should throw error instead of returning boolean', () => {
            expect(() => {
                sampleService.getNumberWrongBoolean();
            }).toThrow(TypeError);
        });

        it('should throw error instead of returning array', () => {
            expect(() => {
                sampleService.getNumberWrongArray();
            }).toThrow(TypeError);
        });

        it('should throw error instead of returning class', () => {
            expect(() => {
                sampleService.getNumberWrongClass();
            }).toThrow(TypeError);
        });

        it('should throw error instead of returning object', () => {
            expect(() => {
                sampleService.getNumberWrongObject();
            }).toThrow(TypeError);
        });
    });

    describe('return type string', () => {
        it('should return string', () => {
            const result = sampleService.getStringCorrect();
            const actualType = (typeof result).toString();
            expect(actualType).toStrictEqual(String.name.toLowerCase());
        });

        it('should throw error instead of returning array', () => {
            expect(() => {
                sampleService.getStringWrongArray();
            }).toThrow(TypeError);
        });

        it('should throw error instead of returning class instance', () => {
            expect(() => {
                sampleService.getStringWrongClass();
            }).toThrow(TypeError);
        });

        it('should throw error instead of returning number', () => {
            expect(() => {
                sampleService.getStringWrongNumber();
            }).toThrow(TypeError);
        });

        it('should throw error instead of returning object', () => {
            expect(() => {
                sampleService.getStringWrongObject();
            }).toThrow(TypeError);
        });
    });

    describe('return type class', () => {
        it('should return class instance', () => {
            const result = sampleService.getClassCorrect();
            let actualType = (typeof result).toString();
            if (result.constructor) {
                actualType = result.constructor.name;
            }
            expect(actualType).toStrictEqual(SomeClass.name);
        });

        it('should throw error instead of returning number', () => {
            expect(() => {
                sampleService.getClassWrongNumber();
            }).toThrow(TypeError);
        });

        it('should throw error instead of returning class object', () => {
            expect(() => {
                sampleService.getClassWrongObject();
            }).toThrow(TypeError);
        });

        it('should throw error instead of returning instance of other class', () => {
            expect(() => {
                sampleService.getClassWrongOtherClass();
            }).toThrow(TypeError);
        });

        it('should throw error instead of returning string', () => {
            expect(() => {
                sampleService.getClassWrongString();
            }).toThrow(TypeError);
        });

        // it('should throw error instead of returning interface instance', () => {
        //     expect(() => { sampleService.getClassWrongInterface(); }).toThrow(TypeError);
        // });
    });
});
