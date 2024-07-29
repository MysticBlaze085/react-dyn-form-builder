/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useCallback, useEffect, useState } from 'react';

import {FormBuilder} from 'shared-ui/node_modules/react-reactive-form';
import { FormGeneratorWrapper } from 'shared-ui';
import formInputConfig from './form.config';

const ExampleFeature = () => {
    const defaultGroup = FormBuilder.group({
        first_name: [],
        last_name: []
    })
    const [genForm, setGenForm] = useState<any>(defaultGroup)

    const setInputNesting = useCallback(() => {
        console.log('genForm', genForm.get('first_name'));
        genForm
            .get('first_name')
            .onBlurChanges.subscribe((value: any) => (value ? genForm.patchValue({ full_name: `${value} - ` }) : ''));
        genForm
            .get('last_name')
            .onBlurChanges.subscribe((value: any) => {
                const initial = genForm.get('first_name').value;
                genForm.patchValue({ full_name: `` });
                genForm.patchValue({ full_name: `${initial} - ${value}` })
            })
        genForm.disable();
    }, [genForm]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        alert(`You submitted \n ${JSON.stringify(genForm.value, null, 2)}`);
        console.log(genForm);
    };

    const handleEditMode = () => {
        genForm.enable({ onlySelf: true });
    };

    const handleOnCancelMode = () => {
        genForm.disable({ onlySelf: true });
        genForm.reset();
    };

    const setForm = (form: any) => {
        setGenForm({
            ...form,
            meta: {
                handleSubmit: handleSubmit,
                handleEditMode: handleEditMode,
                handleCancelMode: handleOnCancelMode,
            }
        });
    };

    const unSubscribe = useCallback(() => {
        genForm.valueChanges.unsubscribe();
    }, [genForm]);

    useEffect(() => {
        setInputNesting();
        unSubscribe();
    }, [setInputNesting, unSubscribe]);

    return (
        <div className="h-100">
            <div className="row">
                <FormGeneratorWrapper onMount={setForm} fieldConfig={formInputConfig} />
            </div>
        </div>
    );
};

export default ExampleFeature;
