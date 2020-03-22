import {TypedTestService} from './typed-test.service';

describe('array', () => {

    let sampleService: TypedTestService;

    beforeEach(() => {
        sampleService = new TypedTestService();
    });

    // describe('without decorator', () => {
    //     it('should return 6', () => {
    //         expect(sampleService.multiply(2, 3)).toStrictEqual(6);
    //     });
    // });
    //
    // describe('numeric with decorator, correct arguments', () => {
    //     it('should return 6', () => {
    //         expect(sampleService.funcNumberTyped(2, 3)).toStrictEqual(6);
    //     });
    // });
    //
    // describe('numeric with decorator, incorrect arguments', () => {
    //     it('should throw error', () => {
    //         const value: any = { v: 3};
    //         expect(() => {
    //             sampleService.funcNumberTyped(2, value);
    //         }).toThrow();
    //     });
    // });
});
