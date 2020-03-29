import 'reflect-metadata';
import {Reflection} from 'typedoc';

export function Typed() {
    return (
        target: object, // tslint:disable
        propertyName: string,
        // tslint:disable-next-line
        descriptor: TypedPropertyDescriptor<Function>,
    ) => {
        const method = descriptor.value;
        descriptor.value = function() {
            checkTypes(target, propertyName, arguments);
            return method.apply(this, arguments);
        };
    };
}

export function TypedClass(): any {
    return (target: any) => {
        console.log(target);
        const paramTypes = Reflect.getMetadata(
            'design:paramtypes',
            target.prototype,
            'multiplyCustomChecked',
        );
        console.log(paramTypes);

        const classMembers = Object.getOwnPropertyDescriptors(target.prototype);    // tslint:disable
        const memberNames = Object.keys(classMembers);  // tslint:disable
        memberNames.forEach(name => {
            const method: any = classMembers[name].value;
            if (method instanceof Function) {
                Object.defineProperty(target.prototype, method.name, {
                    value() {
                        checkTypes(target.prototype, method.name, arguments);
                        return method.apply(this, arguments);
                    },
                });
            }
        });

        return target;
    };
}

function checkTypes(target: Object, propertyName: string, ...args: any): void {
    console.time('checkParams');
    console.time('metadata');
    const paramTypes = Reflect.getMetadata(
        'design:paramtypes',    // design:type
        target,
        propertyName,
    );
    console.log(paramTypes);
    console.timeEnd('metadata');
    console.time('foreachParam');
    if (paramTypes) {
        paramTypes.forEach((param, index) => {
            const actualType = typeof args[index];
            const expectedType = param instanceof Function ? typeof param() : param.name;
            if (actualType !== expectedType) {
                throw new TypeError(
                    `Argument: ${index} of function ${propertyName} has type: ${actualType} different from expected type: ${expectedType}.`,
                );
            }
        });
    }
    console.timeEnd('foreachParam');
    console.timeEnd('checkParams');
}
