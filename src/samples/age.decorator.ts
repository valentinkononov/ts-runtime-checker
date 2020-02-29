import 'reflect-metadata';

const metaKey: string = 'validationMetadata';

function Age(from: number, to: number) {
    return function (object: Object, propertyName: string) {
        const metadata = {
            target: object.constructor,
            propertyName: propertyName,
            length: { from, to },
        };
        // Reflect.defineMetadata(metaKey, metadata, object.constructor);
        Reflect.defineMetadata(metaKey + propertyName, metadata, object.constructor);
        console.log(Reflect.getMetadata(metaKey + propertyName, object.constructor));
    };
}

function validate<T>(object: T) {
    console.log(object)
    const properties = Object.getOwnPropertyNames(object);
    properties.forEach(propertyName => {
        let metadata = Reflect.getMetadata(metaKey + propertyName, object.constructor);
        console.log(metadata);
        if (!metadata) {
            console.log('ERROR');
            return;
        }
        if (metadata.length) {
            const value = object[metadata.propertyName];
            if (value < metadata.length.from || value > metadata.length.to) {
                throw new Error(`Validation failed. Length ${value} doesn't meet required from: ${metadata.length.from} and to ${metadata.length.to}`);
            }
        }
    });
}

export {
    Age,
    validate,
};
