import {deepClone} from '@constants/functional';

if (!Array.prototype.lastItem) {
  Array.prototype.lastItem = function <T>(): T {
    return this.at(-1);
  };
}

if (!Array.prototype.remove) {
  Array.prototype.remove = function <T>(elem: T): T[] {
    return this.filter(e => JSON.stringify(e) !== JSON.stringify(elem));
  };
}

if (!Array.prototype.firstItem) {
  Array.prototype.firstItem = function <T>(): T {
    return this[0];
  };
}

if (!Array.prototype.removeDuplicate) {
  Array.prototype.removeDuplicate = function <T>(): T[] {
    // var distinctArr = this.filter(function (el: any) {
    //   var isDup = el.inArray;
    //   el.inArray = true;
    //   return !isDup;
    // });
    // distinctArr.forEach(function (el: any) {
    //   delete el.inArray;
    // });
    // return distinctArr;
    return Array.from(new Set(this.map((obj: T) => JSON.stringify(obj)))).map(
      strObj => JSON.parse(strObj),
    );
  };
}

if (!Array.prototype.replaceItem) {
  Array.prototype.replaceItem = function <T>(
    replaceCondition: (data: T, index: number) => boolean,
    replacedItem: T,
    options?: ArrayReplaceOptions<T>,
  ): T[] {
    if (this === null || this == undefined) {
      return this;
    }

    const itemIndex = this.findIndex(replaceCondition);
    if (itemIndex !== -1) {
      if (replacedItem) {
        this[itemIndex] = replacedItem;
        return this;
      }

      return this.filter((item, index) => index !== itemIndex);
    }

    if (options?.pushWhenEmpty) {
      this.push(replacedItem);
    }
    return this;
  };
}

if (!Array.prototype.pushOrRemove) {
  Array.prototype.pushOrRemove = function <T>(
    replaceData: T,
    options?: ArrayPushOrRemoveOptions<T>,
  ): T[] {
    const tempItemps = deepClone(this) ?? [];
    const itemIndex = options?.customCondition
      ? tempItemps.findIndex(options?.customCondition)
      : tempItemps.indexOf(replaceData);
    const isItemEmpty = itemIndex === -1;
    if (isItemEmpty) {
      return [...tempItemps, replaceData];
    }

    if (options?.replaceWhenExist && !isItemEmpty) {
      tempItemps[itemIndex] = replaceData;
      return tempItemps;
    }

    const result = tempItemps.remove(replaceData);
    return result;
  };
}
