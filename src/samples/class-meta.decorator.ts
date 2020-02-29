import 'reflect-metadata';

interface Metadata {
    singleton?: boolean;
    tags?: string[];
}

const metaKey: string = 'customMetadata';

function CustomBehavior(metadata: Metadata) {
    return function(ctor: Function) {
        // add metadata to constructor
        Reflect.defineMetadata(metaKey, metadata, ctor);

        // others can access it by:
        // let metadata = Reflect.getMetadata('annotations', HelloComponent);
    }
}

const instancesMap: Map<Object, Object> = new Map<Object, Object>();

function getInstance<T>(tType: new () => T): T {
    let metadata = Reflect.getMetadata(metaKey, tType) as Metadata;
    console.log(metadata);
    if (metadata.singleton) {
        if (!instancesMap.has(tType)) {
            instancesMap.set(tType, new tType());
        }
        return instancesMap.get(tType) as T;
    } else {
        return new tType() as T;
    }
}

export {
    CustomBehavior,
    Metadata,
    getInstance,
};
