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

    return parsedSelectedRows.some((selectedRow) => SelectionUtils.fullCompare(parsedRow, selectedRow));
  }

  private static fullCompare(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) return false;

    const keys = Object.keys(obj1);
    return keys.every((key) => {
      if (!Object.prototype.hasOwnProperty.call(obj2, key)) return false;
      if (typeof obj1[key] === 'object' && obj1[key] !== null) {
        return SelectionUtils.fullCompare(obj1[key], obj2[key]);
      }
      return obj1[key] === obj2[key];
    });
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
