import React from 'react';
import { FieldRenderer } from './shared/FormInputBuilder/helpers';

const fieldConfig = {
    // Creates a FormGroup
    controls: {
        // Creates a control named first_name
        first_name: {
            render: FieldRenderer('TextInput'),
            meta: {
                label: 'First Name',
                placeholder: 'Enter first name',
            },
        },
        last_name: {
            render: FieldRenderer('TextInput'),
            meta: {
                label: 'Last Name',
                placeholder: 'Enter last name',
            },
        },
        gender: {
            formState: 'male',
            render: FieldRenderer('Radio'),
        },
        nationality: {
            render: FieldRenderer('SelectBox'),
        },
        notes: {
            render: FieldRenderer('Textarea'),
        },
        terms: {
            formState: false,
            render: FieldRenderer('Checkbox'),
        },
        // Inject a component
        $field_0: {
            // Set isStatic false to subscribe to the form ( state ) changes
            isStatic: false,
            render: ({ pristine, meta: { handleSubmit, handleReset } }) => (
                <div>
                    <button disabled={pristine} onClick={handleSubmit}>
                        Submit
                    </button>
                    <button type="button" onClick={handleReset}>
                        Reset
                    </button>
                </div>
            ),
        },
        $field_1: {
            isStatic: false,
            render: FieldRenderer('Value'),
        },
    },
};

export default fieldConfig;
