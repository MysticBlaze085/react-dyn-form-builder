import FieldRenderer from "../../FieldRenderer";

export const tableFilterInputConfig = {
    controls: {
        column: {},
        value: {
            render: FieldRenderer('Text'),
            meta: {
                label: 'Search',
                required: false
            },
        },
    },
};

export const preferenceInputControls = (items: { id: string; value: string }[]) => {
    return {
        controls: {
            column: {
                render: FieldRenderer('CheckboxGroup'),
                meta: {
                    items,
                },
            }
        },
        
        $field_0: {
            isStatic: false,
            render: ({ status, value, meta: { handleSubmit, handleEditMode, handleCancelMode } }) => {
                console.log('status', status, 'value', value, 'meta', { handleSubmit, handleEditMode, handleCancelMode });
                return (
                    <div>
                    </div>
                );
            },
        },
    }
}

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