import { TypedTestService } from './typed-test.service';
import { TypedConfig } from '../src/lib/typed.config';

describe('config', () => {
    let sampleService: TypedTestService;

    beforeEach(() => {
        sampleService = new TypedTestService();
        TypedConfig.set({
            enable: true,
            throwError: true,
            checkArgumentLength: true,
        });
    });

    describe('no checks', () => {
        it('should pass through checks', () => {
            TypedConfig.set({
                enable: false,
                throwError: true,
                checkArgumentLength: true,
            });
            const testArg: any = 'bad';
            expect(sampleService.funcNumberTyped(2, testArg)).toStrictEqual(NaN);
        });
    });

    describe('checks', () => {
        it('should throw error', () => {
            TypedConfig.set({
                enable: true,
                throwError: true,
                checkArgumentLength: true,
            });
            const testArg: any = 'bad';
            expect(() => {
                sampleService.funcNumberTyped(2, testArg);
            }).toThrow();
        });
    });

    describe('just console log', () => {
        it('should just log error, no exception thrown', () => {
            TypedConfig.set({
                enable: true,
                throwError: false,
                checkArgumentLength: true,
            });
            const testArg: any = 'bad';
            expect(sampleService.funcNumberTyped(2, testArg)).toStrictEqual(NaN);
        });
    });

    describe('custom logger', () => {
        it('should call custom logger', () => {
            const customLogger = jest.fn();
            TypedConfig.set({
                enable: true,
                throwError: false,
                checkArgumentLength: true,
                customLogger,
            });
            const testArg: any = 'bad';
            expect(
                sampleService.funcNumberTyped(2, testArg),
            ).toStrictEqual(NaN);
            expect(customLogger).toHaveBeenCalled();
        });
    });
});
