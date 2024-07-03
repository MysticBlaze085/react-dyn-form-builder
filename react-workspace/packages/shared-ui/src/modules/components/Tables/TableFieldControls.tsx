import FieldRenderer from "../../FieldRenderer";

export const tableFilterInputConfig = {
    controls: {
        column: {
            render: FieldRenderer('Select'),
            meta: {
                label: 'Column',
                items: [
                    { value: 'name', label: 'Name' },
                    { value: 'job', label: 'Job' },
                    { value: 'date', label: 'Date' },
                ],
            },
        },
        value: {
            render: FieldRenderer('Text'),
            meta: {
                label: 'Search',
                required: false
            },
        },
    },
};