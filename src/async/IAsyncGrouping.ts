export interface IAsyncGrouping<TKey, TValue> extends AsyncIterableIterator<TValue> {
    readonly key: TKey
}
