export {};

declare global {
  interface Array<T> {
    remove(elem: T): Array<T>;
    lastItem(): T;
    firstItem(): T;
    removeDuplicate(): T[];
    replaceItem<T>(
      replaceCondition: (data: T, index: number) => boolean,
      replacedItem?: T,
      options?: ArrayReplaceOptions<T>,
    ): T[];
    pushOrRemove<T>(replaceData: T, options?: ArrayPushOrRemoveOptions<t>): T[];
  }
}

declare global {
  interface String {}
}
