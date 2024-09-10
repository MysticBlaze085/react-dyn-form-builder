import { Field } from './field';
import { Observable } from 'rxjs';
import { TABLE_TYPE } from './identifiable';

// need to think how I can simplify this

export declare type RowData = {
  [additionalProperties: string]: any;
} & {
  [key: string]: any;
  selected?: boolean;
  id?: string;
};

export interface TableProps {
  isWrapped?: boolean;
  data?: RowData[];
  columns?: string[];
  isDraggable?: boolean;
  isSelectable?: boolean;
  isSortable?: boolean;
  isSearchable?: boolean;
  isActionButton?: boolean;
  isMultiSelectField?: boolean;
  actionColName?: string;
  actionButtons?: {
    icon?: string;
    label: string;
    color: 'primary' | 'secondary' | 'success' | 'warn' | 'danger';
    onClick: (rowData: any) => void;
  }[];
  tableHeader?: {
    title: string;
    subtitle: string;
    isSearchable: boolean;
    isPreference?: boolean;
    buttons?: any[];
  };
  field?: Field;
}

export type Table = {
  [additionalProperties: string]: any;
} & {
  type: TABLE_TYPE;
  headers: string[];
  rows: Observable<RowData[]>;
  props?: TableProps;
};

export class TableBuilder {
  static createTable(type: TABLE_TYPE, headers: string[], rows: Observable<RowData[]>, props?: TableProps): Table {
    const table = {
      type,
      headers: headers || [],
      rows: rows,
      props: props || {},
    };
    return table;
  }
}
