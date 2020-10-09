import React, { useEffect } from 'react';
import { FormGenerator } from 'react-reactive-form';
import formInputConfig from './form.config';

const ExampleFeature = () => {
    let genForm;

    const setInputNesting = () => {
        genForm
            .get('first_name')
            .onBlurChanges.subscribe((value) => (value ? genForm.patchValue({ full_name: `${value} - ` }) : ''));
        genForm.valueChanges.subscribe((value) => {
            if (!value.terms && genForm.status === 'VALID') {
                genForm.status = 'INVALID';
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`You submitted \n ${JSON.stringify(genForm.value, null, 2)}`);
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

    const unSubscribe = () => {
        genForm.valueChanges.unsubscribe();
    };

    useEffect(() => {
        setInputNesting();
        genForm.disable();

        unSubscribe();
    }, []);

    return (
        <div className="container h-100 w-100 mt-5">
            <div className="row">
                <FormGenerator className="col-12" onMount={setForm} fieldConfig={formInputConfig} />
            </div>
        </div>
    );
};

export default ExampleFeature;
