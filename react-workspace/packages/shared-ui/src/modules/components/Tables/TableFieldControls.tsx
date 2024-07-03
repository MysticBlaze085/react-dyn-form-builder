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