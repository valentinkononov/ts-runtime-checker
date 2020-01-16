import {SampleService} from "./sample.service";

console.log('Start');
const sampleService = new SampleService();
const result = sampleService.multiplyChecked(2, 3);
console.log('Result:');
console.log(result);
console.log('Done');
