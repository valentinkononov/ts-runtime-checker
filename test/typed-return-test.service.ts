import {Typed} from '../src';
import {OtherClass, SomeClass, SomeInterface} from './typed-test.entities';

export class TypedReturnTest {

    @Typed()
    public getNumberCorrect(): number {
        return 123;
    }

    @Typed()
    public getNumberWrongString(): number {
        return 'incorrect' as any;
    }

    @Typed()
    public getNumberWrongBoolean(): number {
        return true as any;
    }

    @Typed()
    public getNumberWrongArray(): number {
        return [1, 2, 3] as any;
    }

    @Typed()
    public getNumberWrongObject(): number {
        return {v: 3} as any;
    }

    @Typed()
    public getNumberWrongClass(): number {
        return new SomeClass() as any;
    }

    @Typed()
    public getStringCorrect(): string {
        return 'correct';
    }

    @Typed()
    public getStringWrongNumber(): string {
        return 123 as any;
    }

    @Typed()
    public getStringWrongArray(): string {
        return [1, 2, 3] as any;
    }

    @Typed()
    public getStringWrongObject(): string {
        return {v: 3} as any;
    }

    @Typed()
    public getStringWrongClass(): string {
        return new SomeClass() as any;
    }

    @Typed()
    public getClassCorrect(): SomeClass {
        return new SomeClass();
    }

    @Typed()
    public getClassWrongNumber(): SomeClass {
        return 123 as any;
    }

    @Typed()
    public getClassWrongString(): SomeClass {
        return 'incorrect' as any;
    }

    @Typed()
    public getClassWrongOtherClass(): SomeClass {
        return new OtherClass() as any;
    }

    @Typed()
    public getClassWrongObject(): SomeClass {
        return {v: 3} as any;
    }

    @Typed()
    public getClassWrongInterface(): SomeClass {
        const result: SomeInterface = {id: 1, text: 'test'};
        return result as any;
    }

    @Typed()
    public getInterfaceCorrect(): SomeInterface {
        const result: SomeInterface = {id: 1, text: 'test'};
        return result;
    }

    @Typed()
    public getInterfaceWrongNumber(): SomeInterface {
        return 123 as any;
    }

    @Typed()
    public getInterfaceWrongString(): SomeInterface {
        return 'incorrect' as any;
    }

    @Typed()
    public getInterfaceWrongOtherClass(): SomeInterface {
        return new OtherClass() as any;
    }

    @Typed()
    public getInterfaceWrongObject(): SomeInterface {
        return {v: 3} as any;
    }
}
