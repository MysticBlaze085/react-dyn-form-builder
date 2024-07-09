import FieldRenderer from "../../FieldRenderer";

export const tableFilterInputConfig = (column: string) => ({
    controls: {
        column: {},
        value: {
            render: FieldRenderer('Text'),
            meta: {
                label: `Search by ${column}`,
                required: false
            },
        },
    },
});

export const tableFilterInputControls = (items: string[]) => {
    const mapItems = items.map((item) => ({ label: item, value: item }));
    return {
    controls: {
        column: {
            render: FieldRenderer('Select'),
            meta: {
                label: 'Column',
                items: mapItems
            },
        },
        value: { },
    },
}};