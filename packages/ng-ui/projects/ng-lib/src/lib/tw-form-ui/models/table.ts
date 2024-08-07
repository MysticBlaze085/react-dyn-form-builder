import { Field } from './field';
import { Observable } from 'rxjs';
import { TABLE_TYPE } from './identifiable';

export declare type RowData = {
    [additionalProperties: string]: any;
} & {
    [key: string]: any;
    selected?: boolean;
    id?: string;
};

export type TableProps = {
    height?: string;
    title?: string;
    caption?: string;
    buttonText?: string;
    buttonLink?: any[];
    buttonAction?: any;
    selectable?: boolean;
    attributes?: {
        [key: string]: string | number;
    };
    isField?: boolean;
    field?: Field;
    fieldCol?: string;
};

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
