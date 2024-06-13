export class ArrayUtils {
  public static findNextIndex<T>(array: Array<T>, predicate: (value: T) => boolean, startIndex: number): number {
    const iMax = array.length;
    for (let i = startIndex + 1; i < iMax; ++i) {
      if (predicate(array[i])) {
        return i;
      }
    }
    return -1;
  }

  public static findNextIndexByValue<T>(array: Array<T>, matchValue: T, startIndex: number): number {
    return this.findNextIndex(array, (val) => val === matchValue, startIndex);
  }

  public static findPrevIndex<T>(array: Array<T>, predicate: (value: T) => boolean, startIndex: number): number {
    for (let i = startIndex - 1; i >= 0; i--) {
      if (predicate(array[i])) {
        return i;
      }
    }

    return -1;
  }

  public static findPrevIndexByValue<T>(array: Array<T>, matchValue: T, startIndex: number): number {
    return this.findPrevIndex(array, (val) => val === matchValue, startIndex);
  }
}
