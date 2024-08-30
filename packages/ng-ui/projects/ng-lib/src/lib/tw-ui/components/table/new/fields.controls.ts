import { Field, FieldBuilder, FieldOptions } from '../../../../tw-form-ui/models/field';

import { TitleCasePipe } from '@angular/common';

const titleCase = (param: string) => new TitleCasePipe().transform(param);

export const paginationSelector: Field = FieldBuilder.createField('select', 'itemsPerPage', '5', 'Items Per Page', 'Items Per Page', {
    labelClass: '',
    options: [
        {
            value: '5',
            label: '5',
            id: '1',
        },
        {
            value: '10',
            label: '10',
            id: '2',
        },
        {
            value: '25',
            label: '25',
            id: '3',
        },
    ],
});

export const searchColumnSelector: (param: string) => Field = (param) =>
    FieldBuilder.createField('text', 'searchColumn', '', `Search by ${titleCase(param)}`, ``, {
        labelClass: '',
        required: false,
    });

export const preferenceVisibilitySelector: (params: string[]) => Field = (params: string[]) => {
    const mapVisibleColumnsOptions: FieldOptions[] = params.map((param) => {
        return {
            id: param,
            value: true,
            label: titleCase(param),
        };
    });

    const headerCheckboxGroup: Field = FieldBuilder.createField('checkbox', 'visibleColumns', params, 'visibleColumns', 'Visible Columns', {
        labelClass: '',
        required: false,
        options: mapVisibleColumnsOptions,
    });

    return headerCheckboxGroup;
};

export const preferenceColumnSelector: (params: string[]) => Field = (params: string[]) => {
    const mapVisibleColumnsOptions: FieldOptions[] = params.map((param) => {
        return {
            id: param,
            value: param,
            label: titleCase(param),
        };
    });

    const columnSearchColumn: Field = FieldBuilder.createField('select', 'column', params[0], 'Column', '', {
        options: [...mapVisibleColumnsOptions],
    });

    return {
        ...columnSearchColumn,
    };
};

export const preferenceGroupBySelector: (params: string[]) => Field = (params: string[]) => {
    const mapVisibleColumnsOptions: FieldOptions[] = params.map((param) => {
        return {
            id: param,
            value: param,
            label: titleCase(param),
        };
    });

    const columnSearchColumn: Field = FieldBuilder.createField('select', 'groupByColumn', 'none', 'Group By', '', {
        options: [{ id: '0', value: 'none', label: 'None' }, ...mapVisibleColumnsOptions],
    });

    return {
        ...columnSearchColumn,
    };
};

export const cellSelector: (index: string | number, params: string[]) => Field = (index: string | number, params: string[]) => {
    const mapVisibleColumnsOptions: FieldOptions[] = params.map((param) => {
        return {
            id: param,
            value: param,
            label: titleCase(param),
        };
    });

    const columnSearchColumn: Field = FieldBuilder.createField('custom-select', 'cell', index, '', '', {
        isMultipleTag: true,
        options: [...mapVisibleColumnsOptions],
    });

    return {
        ...columnSearchColumn,
    };
};
