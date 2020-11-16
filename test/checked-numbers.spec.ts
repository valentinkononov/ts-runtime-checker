import { TypedConfig, checked } from '../src';

function doubleNumber(value: number): number {
    return value * 2;
}

describe('checked-numbers', () => {
    beforeEach(() => {
        // default configuration with all checks
        TypedConfig.set({
            enable: true,
            throwError: true,
            checkArgumentLength: true,
        });
    });

    describe('numeric with checked function, correct arguments', () => {
        it('should return 6', () => {
            expect(doubleNumber(3)).toStrictEqual(6);
        });
    });

    describe('numeric with checked function, object instead of number', () => {
        it('should throw error', () => {
            const value: any = { v: 3 };
            expect(() => {
                checked<Number, Number>(doubleNumber, value, Number, Number);
            }).toThrow(TypeError);
        });
    });

    describe('numeric with checked function, date instead of number', () => {
        it('should throw error', () => {
            const value: any = new Date();
            expect(() => {
                checked<Number, Number>(doubleNumber, value, Number, Number);
            }).toThrow(TypeError);
        });
    });

    describe('numeric with checked function, string instead of number', () => {
        it('should throw error', () => {
            const value: any = '3';
            expect(() => {
                checked<Number, Number>(doubleNumber, value, Number, Number);
            }).toThrow(TypeError);
        });
    });

    describe('numeric with checked function, array [1] instead of number', () => {
        it('should throw error', () => {
            const value: any = [3];
            expect(() => {
                checked<Number, Number>(doubleNumber, value, Number, Number);
            }).toThrow(TypeError);
        });
    });

    describe('numeric with checked function, array [2] instead of number', () => {
        it('should throw error', () => {
            const value: any = [3, 4, 5];
            expect(() => {
                checked<Number, Number>(doubleNumber, value, Number, Number);
            }).toThrow(TypeError);
        });
    });
});
