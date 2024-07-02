import { ButtonDefault } from '../modules/components';
import FieldRenderer from '../modules/FieldRenderer';
import React from 'react';
import { Validators } from 'react-reactive-form';

const formInputConfig = {
    controls: {
        first_name: {
            render: FieldRenderer('Text'),
            meta: {
                label: 'First Name',
                // placeholder: 'Enter first name',
                // value: '',
                // required: false
            },
            options: {
                validators: Validators.required,
            },
        },
        last_name: {
            render: FieldRenderer('Text'),
            meta: {
                label: 'Last Name',
                // placeholder: 'Enter last name',
                // classes: 'col-6',
            },
            options: {
                validators: Validators.required,
            },
        },
        full_name: {
            render: FieldRenderer('Text'),
            meta: {
                label: 'Full Name',
                // placeholder: 'Enter Full Name',
                // classes: 'col-12 pb-5 nested-input',
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
                    { id: 'male', value: 'Male' },
                    { id: 'female', value: 'Female' },
                    { id: 'other', value: 'other' },
                ],
                // classes: 'col-6',
            },
            options: {
                validators: Validators.required,
            },
        },
        nationality: {
            render: FieldRenderer('Select'),
            meta: {
                label: 'State',
                items: [
                    { value: 'us', label: 'US' },
                    { value: 'uk', label: 'UK' },
                    { value: 'india', label: 'India' },
                    { value: 'china', label: 'China' },
                ],
                // classes: 'col-6 pr-2',
            },
        },
        notes: {
            render: FieldRenderer('Textarea'),
            meta: {
                label: 'Notes',
            },
        },
        terms: {
            // formState: false,
            render: FieldRenderer('Checkbox'),
            meta: {
                item: { id: 'terms', value: 'I agree to the terms and condition.' },
                // classes: 'col-6',
                // required: true,
            },
        },
        $field_0: {
            isStatic: false,
            render: ({ status, value, meta: { handleSubmit, handleEditMode, handleCancelMode } }) => {
                const isValid = status === 'VALID' && value.terms === true;
                return (
                    <div>
                        <ButtonDefault
                            style={{ marginRight: '5px' }}
                            color="blue"
                            variant="contained"
                            disabled={!isValid}
                            onClick={handleSubmit}
                        >
                            Submit
                        </ButtonDefault>
                        <ButtonDefault onClick={status === 'DISABLED' ? handleEditMode : handleCancelMode}>
                            {status === 'DISABLED' ? `Edit` : `Cancel`}
                        </ButtonDefault>
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
