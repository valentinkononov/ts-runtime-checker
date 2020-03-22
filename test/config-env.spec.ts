import {TypedTestService} from './typed-test.service';
import {TypedConfig} from '../src/lib/typed.config';

describe('config-env', () => {

    beforeAll(() => {
        // console.log('OVERRIDE PROCESS.ENV');
        process.env.TYPED = 'false';
        TypedConfig.reset();
    });

    let sampleService: TypedTestService;

    beforeEach(() => {
        sampleService = new TypedTestService();
    });

    describe('no checks', () => {
        it('should pass through checks', () => {
            const testArg: any = 'bad';
            expect(
                sampleService.funcNumberTyped(2, testArg)
            ).toStrictEqual(NaN);
        });
    });
});
