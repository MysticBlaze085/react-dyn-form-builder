import React, { useCallback, useEffect } from 'react';

import { FormGenerator } from 'react-reactive-form';
import formInputConfig from './form.config';

const ExampleFeature = () => {
    let genForm;

    const setInputNesting = useCallback(() => {
        console.log('genForm', genForm.get('first_name'));
        genForm
            .get('first_name')
            .onBlurChanges.subscribe((value) => (value ? genForm.patchValue({ full_name: `${value} - ` }) : ''));
        genForm
            .get('last_name')
            .onBlurChanges.subscribe((value) => {
                const initial = genForm.get('first_name').value;
                genForm.patchValue({ full_name: `` });
                genForm.patchValue({ full_name: `${initial} - ${value}` })
            })
        genForm.disable();
    }, [genForm]);

    const handleSubmit = (e) => {
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

    const setForm = (form) => {
        genForm = form;
        genForm.meta = {
            handleSubmit: handleSubmit,
            handleEditMode: handleEditMode,
            handleCancelMode: handleOnCancelMode,
        };
    };

    const unSubscribe = useCallback(() => {
        genForm.valueChanges.unsubscribe();
    }, [genForm]);

    useEffect(() => {
        setInputNesting();
        unSubscribe();
    }, [setInputNesting, unSubscribe]);

    return (
        <div className="container h-100 w-100 mt-5">
            <div className="row">
                <FormGenerator onMount={setForm} fieldConfig={formInputConfig} />
            </div>
        </div>
    );
};

export default ExampleFeature;
