import { Typed } from '../src';
import { SomeClass, SomeInterface } from './typed-test.entities';

export class TypedTestService {
    public multiply(num: number, num2: number): number {
        return num * num2;
    }

    public sum(num: number, num2: number): number {
        return num + num2;
    }

    public multiplyCustomChecked(num: number, num2: number): number {
        if (typeof num !== 'number') {
            throw Error(`Argument 1 of function multiplyCustomChecked has incorrect type: ${typeof num}`);
        }
        if (typeof num2 !== 'number') {
            throw Error(`Argument 2 of function multiplyCustomChecked has incorrect type: ${typeof num2}`);
        }
        return num * num2;
    }

    @Typed()
    public funcNumberTyped(num: number, num2: number): number {
        return num * num2;
    }

    public funcDate(num: number, date: Date): Date {
        date.setDate(num);
        return date;
    }

    @Typed()
    public funcDateTyped(num: number, date: Date): Date {
        date.setDate(num);
        return date;
    }

    public funcBoolean(num: number, shouldIncrement: boolean): number {
        if (shouldIncrement === true) {
            return num + 1;
        } else {
            return num - 1;
        }
    }

    @Typed()
    public funcBooleanTyped(num: number, shouldIncrement: boolean): number {
        if (shouldIncrement === true) {
            return num + 1;
        } else {
            return num - 1;
        }
    }

    public funcString(src: string, count: number): string {
        let result = '';
        for (let i = 0; i < count; i++) {
            result += src;
        }
        return result;
    }

    @Typed()
    public funcStringTyped(src: string, count: number): string {
        let result = '';
        for (let i = 0; i < count; i++) {
            result += src;
        }
        return result;
    }

    public funcClass(arg1: SomeClass): SomeClass {
        const result = new SomeClass();
        result.id = arg1.id;
        result.text = arg1.text + ' copy';
        return result;
    }

    @Typed()
    public funcClassTyped(arg1: SomeClass): SomeClass {
        const result = new SomeClass();
        result.id = arg1.id;
        result.text = arg1.text + ' copy';
        return result;
    }

    @Typed()
    public funcInterfaceTyped(arg1: SomeInterface): SomeInterface {
        const result: SomeInterface = {
            id: arg1.id,
            text: arg1.text + ' copy',
        };
        return result;
    }

    public funcConditional(arg1: number | string): string {
        return arg1.toString() + arg1.toString();
    }

    @Typed()
    public funcConditionalTyped(arg1: number | string): string {
        return arg1.toString() + arg1.toString();
    }

    public funcArrayNum(numArray: number[]): number[] {
        return numArray.filter(x => x > 0);
    }

    @Typed()
    public funcArrayNumTyped(numArray: number[]): number[] {
        return numArray.filter(x => x > 0);
    }

    @Typed()
    public funcArrayDateTyped(dateArray: Date[]): Date[] {
        return dateArray.filter(x => x.getDate() % 2 === 0);
    }
}
