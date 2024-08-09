import { Field, FieldBuilder } from '../../../../tw-form-ui/models/field';

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
        {
            value: '100',
            label: '100',
            id: '4',
        },
    ],
});

export const searchColumnSelector: (param: string) => Field = (param) =>
    FieldBuilder.createField('text', 'searchColumn', '', `Search by ${titleCase(param)}`, ``, {
        // class: 'sm:col-span-3',
        labelClass: '',
        required: false,
    });
