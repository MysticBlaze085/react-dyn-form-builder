export class SelectionUtils {
  static isSelected(row: string | any, selectedRows: any[]): boolean {
    const parseIfString = (item: any) => {
      if (typeof item === 'string') {
        try {
          return JSON.parse(item);
        } catch (error) {
          console.error('Error parsing:', error);
          return null;
        }
      }
      return item;
    };

    const parsedRow = parseIfString(row);
    if (!parsedRow) return false;

    const parsedSelectedRows = selectedRows.map(parseIfString).filter(Boolean);

    return parsedSelectedRows.some((selectedRow) => {
      return SelectionUtils.deepCompare(parsedRow, selectedRow);
    });
  }

  private static deepCompare(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!keys2.includes(key)) return false;
      if (!SelectionUtils.deepCompare(obj1[key], obj2[key])) return false;
    }

    return true;
  }

  static isSelectedStringify(row: string | any, selectedRows: any[]): boolean {
    const stringifyIfObject = (item: any) => {
      if (typeof item === 'object' && item !== null) {
        return JSON.stringify(item);
      }
      return item;
    };

    const stringifiedRow = stringifyIfObject(row);
    const stringifiedSelectedRows = selectedRows.map(stringifyIfObject);

    return stringifiedSelectedRows.some((selectedRow) => selectedRow === stringifiedRow);
  }
}
