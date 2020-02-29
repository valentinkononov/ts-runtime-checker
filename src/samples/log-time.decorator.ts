// target = class
// propertyName = function
// descriptor = what a function

/***
 * Decorator to automatically measure time spent by function to execute
 * */
function LogTime() {
    return (target: Object, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {
        const method = descriptor.value;
        descriptor.value = function(...args) {
            console.time(propertyName || 'LogTime');
            const result = method.apply(this, args);
            console.timeEnd(propertyName || 'LogTime');
            return result;
        };
    };
}

function LogResult() {
    return (target: Object, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {
        const method = descriptor.value;
        descriptor.value = function(...args) {
            const result = method.apply(this, args);
            console.log(`Function: ${propertyName || 'LogResult'} returned ${result}`);
            return result;
        };
    };
}

export {
    LogTime,
    LogResult,
};
