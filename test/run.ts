import { TypedTestService } from './typed-test.service';
// import { TypedConfig, TypedOptions } from '../src/lib/typed.config';
// import { Typed } from '../src';
import { SomeClass } from './typed-test.entities';
import { TypedReturnTest } from './typed-return-test.service';

console.log('Start');
// const sampleService = new TypedTestService();
const sampleReturnService = new TypedReturnTest();
//
// const x: any = 9;
const value = new SomeClass();
value.id = 1;
// const y: any = new Date();

// TypedConfig.set({
//     enable: false,
//     throwError: true,
//     checkArgumentLength: true,.env
// });

// TypedConfig.ExcludeDecorator(Typed);
// Typed.prototype = function() {
//     // tslint:disable-next-line:ban-types
//     return (target: Object, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {
//         console.log('test rem')
//         return descriptor.value.apply(this, arguments);
//     };
// };

// let result = sampleService.funcDateTyped(x, new Date());
// const result = sampleService.funcConditionalTyped('22');
// result = sampleService.funcDateTyped(1, new Date());
// result = sampleService.multiplyChecked(x, y);
// console.log(result);

sampleReturnService.getClassCorrect();

// let result = sampleService.sum(x, y);
// console.log(result);
//
// result = sampleService.multiply(2, 3);
// console.log(result);
//
// const arg1: any = 2;
// const arg2: any = 3;
// console.time('test_clean');
// result = sampleService.multiply(arg1, arg2);    // as usual
// console.timeEnd('test_clean'); // 0.079ms
// console.time('test_checked');
// result = sampleService.multiplyChecked(arg1, arg2);    // checked with standard arguments
// console.timeEnd('test_checked');    // 0.298ms
// console.time('test_checked');
// result = sampleService.multiplyChecked(arg1, arg2);    // checked with standard arguments
// console.timeEnd('test_checked');    // 0.298ms
// console.log(result);
//
// const a: any = 1;
// const b: any = '2';
// result = sampleService.multiply(a, b);
//
// const arg3: any = 'test';
// const arg4: any = 'test';
// result = sampleService.multiply(arg3, arg4);
//
// console.log(result);

//
// const arg5: any = {
//     name: 1,
// };
// const arg6: any = 2;
// result = sampleService.multiply(arg5, arg6);    // NaN
// console.log(result);
//
//
// try {
//     console.time('test_checked');
//     result = sampleService.multiplyChecked(arg3, arg4);
//     console.timeEnd('test_checked');
// } catch (e) {
//     console.timeEnd('test_checked');
//     console.log(e);
// }
//
// try {
//     result = sampleService.multiplyChecked(arg5, arg6);
// } catch (e) {
//     console.log(e);
// }
//
// try {
//     result = sampleService.multiplyCustomChecked(arg3, arg4)
// } catch (e) {
//     console.log(e);
// }
//
// try {
//     result = sampleService.multiplyCustomChecked(arg5, arg6)
// } catch (e) {
//     console.log(e);
// }

console.log('Done');
