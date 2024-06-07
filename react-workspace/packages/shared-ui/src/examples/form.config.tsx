import { Button } from '../modules/components';
import FieldRenderer from '../modules/FieldRenderer';
// Documentation for react-reactive-form https://github.com/bietkul/react-reactive-form
import React from 'react';
import { Validators } from 'react-reactive-form';

const formInputConfig = {
    controls: {
        first_name: {
            render: FieldRenderer('text'),
            meta: {
                label: 'First Name',
                placeholder: 'Enter first name',
                value: '',
                required: false
            },
            options: {
                validators: Validators.required,
            },
        },
        last_name: {
            render: FieldRenderer('text'),
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
            render: FieldRenderer('text'),
            meta: {
                label: 'Full Name',
                placeholder: 'Enter Full Name',
                classes: 'col-12 pb-5 nested-input',
            },
            options: {
                validators: Validators.required,
            },
        },
        gender: {
            formState: 'other',
            render: FieldRenderer('radio'),
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
            render: FieldRenderer('dropdown'),
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
            render: FieldRenderer('textarea'),
            meta: {
                label: 'Notes',
            },
        },
        terms: {
            formState: false,
            render: FieldRenderer('checkbox'),
            meta: {
                items: [{ key: 'terms', value: 'I agree to the terms and condition.' }],
                classes: 'col-6',
                required: true,
            },
        },
        $field_0: {
            isStatic: false,
            render: ({ status, value, meta: { handleSubmit, handleEditMode, handleCancelMode } }) => {
                const isValid = status === 'VALID' && value.terms === true;
                return (
                    <div>
                        <Button
                            style={{ marginRight: '5px' }}
                            color="primary"
                            variant="contained"
                            disabled={!isValid}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                        <Button variant="outlined" onClick={status === 'DISABLED' ? handleEditMode : handleCancelMode}>
                            {status === 'DISABLED' ? `Edit` : `Cancel`}
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
