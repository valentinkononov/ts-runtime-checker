import {SampleService} from './sample.service';

describe('sample', () => {

    let sampleService: SampleService;

    beforeEach(() => {
        sampleService = new SampleService();
    });

    describe('basic', () => {
        it('should return 6', () => {
            expect(sampleService.multiply(2, 3)).toStrictEqual(6);
        })
    })

    describe('basic', () => {
        it('should return 6', () => {
            expect(sampleService.multiplyChecked(2, 3)).toStrictEqual(6);
        })
    })
});
