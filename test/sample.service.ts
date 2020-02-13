// import {Typed, TypedClass} from '../src/lib/typed-test.decorator';
import { Typed } from '../src';

export class SampleService {
    public multiply(num: number, num2: number): number {
        console.log(num);
        return  num * num2;
    }

    public sum(num: number, num2: number): number {
        return  num + num2;
    }

    public multiplyCustomChecked(num: number, num2: number): number {
        if (typeof num !== 'number') {
            throw Error(`Argument 1 of function multiplyCustomChecked has incorrect type: ${typeof num}`);
        }
        if (typeof num2 !== 'number') {
            throw Error(`Argument 2 of function multiplyCustomChecked has incorrect type: ${typeof num2}`);
        }
        return  num * num2;
    }

    @Typed()
    public multiplyChecked(num: number, num2: number): number {
        return  num * num2;
    }
}
