export declare type DataType<T> = {
    type: "PromiseToArray";
    data: () => Promise<T[]>;
} | {
    type: "ArrayOfPromises";
    data: () => Array<Promise<T>>;
} | {
    type: "PromiseOfPromises";
    data: () => Promise<Array<Promise<T>>>;
};
