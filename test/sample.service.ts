import {Typed} from '../src/lib/typed.decorator';

export class SampleService {
    public multiply(num: number, num2: number): number {
        return  num * num2;
    }

    @Typed()
    public multiplyChecked(num: number, num2: number): number {
        return  num * num2;
    }
}
