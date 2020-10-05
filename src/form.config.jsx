import React from 'react';
import FieldRenderer from './shared/FormInputBuilder/containers/FieldRenderer';
import Button from '@material-ui/core/Button';

const fieldConfig = {
    controls: {
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
            formState: 'other',
            render: FieldRenderer('RadioGroup'),
            meta: {
                label: 'Gender',
                options: [
                    { key: 'male', value: 'Male' },
                    { key: 'female', value: 'Female' },
                    { key: 'other', value: 'other' },
                ],
            },
        },
        nationality: {
            render: FieldRenderer('SelectBox'),
            meta: {
                label: 'State',
                options: [
                    { key: 'us', value: 'US' },
                    { key: 'uk', value: 'UK' },
                    { key: 'india', value: 'India' },
                    { key: 'china', value: 'China' },
                ],
            },
        },
        notes: {
            render: FieldRenderer('Textarea'),
            meta: {
                label: 'Notes',
            },
        },
        terms: {
            formState: false,
            render: FieldRenderer('Checkbox'),
            meta: {
                options: [{ key: 'terms', value: 'I agree to the terms and condition.' }],
            },
        },
        // Inject a component
        $field_0: {
            // Set isStatic false to subscribe to the form ( state ) changes
            isStatic: false,
            render: ({ pristine, meta: { handleSubmit, handleReset } }) => (
                <div>
                    <Button
                        style={{ marginRight: '5px' }}
                        color="primary"
                        variant="contained"
                        disabled={pristine}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                    <Button variant="outlined" onClick={handleReset}>
                        Reset
                    </Button>
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
