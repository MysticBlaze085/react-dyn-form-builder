// Documentation for react-reactive-form https://github.com/bietkul/react-reactive-form
import React from 'react';
import FieldRenderer from '../../../shared/FormInputBuilder/containers/FieldRenderer';
import Button from '@material-ui/core/Button';
import { Validators } from 'react-reactive-form';

const formInputConfig = {
    controls: {
        first_name: {
            render: FieldRenderer('TextInput'),
            meta: {
                label: 'First Name',
                placeholder: 'Enter first name',
                classes: 'col-6 pr-2',
            },
            options: {
                validators: Validators.required,
            },
        },
        last_name: {
            render: FieldRenderer('TextInput'),
            meta: {
                label: 'Last Name',
                placeholder: 'Enter last name',
                classes: 'col-6',
            },
            options: {
                validators: Validators.required,
            },
        },
        full_name: {
            render: FieldRenderer('TextInput'),
            meta: {
                label: 'Full Name',
                placeholder: 'Enter Full Name',
                classes: 'col-12 pb-5',
            },
            options: {
                validators: Validators.required,
            },
        },
        gender: {
            formState: 'other',
            render: FieldRenderer('RadioGroup'),
            meta: {
                label: 'Gender',
                items: [
                    { key: 'male', value: 'Male' },
                    { key: 'female', value: 'Female' },
                    { key: 'other', value: 'other' },
                ],
                classes: 'col-6',
            },
            options: {
                validators: Validators.required,
            },
        },
        nationality: {
            render: FieldRenderer('SelectBox'),
            meta: {
                label: 'State',
                items: [
                    { key: 'us', value: 'US' },
                    { key: 'uk', value: 'UK' },
                    { key: 'india', value: 'India' },
                    { key: 'china', value: 'China' },
                ],
                classes: 'col-6 pr-2',
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
                items: [{ key: 'terms', value: 'I agree to the terms and condition.' }],
                classes: 'col-6',
            },
            options: {
                validators: Validators.required,
            },
        },
        $field_0: {
            // Set isStatic false to subscribe to the form ( state ) changes
            isStatic: false,
            render: ({ invalid, meta: { handleSubmit, handleReset } }) => {
                return (
                    <div>
                        <Button
                            style={{ marginRight: '5px' }}
                            color="primary"
                            variant="contained"
                            disabled={invalid}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                        <Button variant="outlined" onClick={handleReset}>
                            Reset
                        </Button>
                    </div>
                );
            },
        },
        $field_1: {
            isStatic: false,
            render: FieldRenderer('Value'),
        },
    },
};

export default formInputConfig;
