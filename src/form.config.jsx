import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FieldRenderer } from './shared/FormInputBuilder/helpers';

const buttStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        marginRight: '5px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        '&$disabled': {
            background: 'rgba(0, 0, 0, 0.12)',
            color: 'white',
            boxShadow: 'none',
        },
    },
    label: {
        textTransform: 'capitalize',
    },
    disabled: {},
});

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
