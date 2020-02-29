import {CustomBehavior, getInstance} from "../src/samples/class-meta.decorator";
import {LogResult, LogTime} from "../src/samples/log-time.decorator";
import {Age, validate} from "../src/samples/age.decorator";

@CustomBehavior({
    singleton: false,
    tags: ['singleton', 'test', 'service'],
})
class TestServiceDeco {
    constructor() {
        console.log('TestServiceDeco ctor');
    }

    @LogResult()
    @LogTime()
    public async testLogging() {
        for (let i = 1; i<=10; i++) {
            console.log(i);
        }
    }

}

class Person {
    @Age(18, 60)
    age: number;
}

// const instance1 = getInstance(TestServiceDeco);
// const instance2 = getInstance(TestServiceDeco);

// console.log(instance1 === instance2);
// > true

// instance2.testLogging();
// > testLogging: 0.963ms

const person = new Person();
person.age = 40;
validate(person);
// > validation passed

person.age = 16;
validate(person);
// > validation error
