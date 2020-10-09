import React, { useCallback, useEffect } from 'react';
import { FormGenerator } from 'react-reactive-form';
import formInputConfig from './form.config';

const ExampleFeature = () => {
    let genForm;

    const setInputNesting = useCallback(() => {
        genForm
            .get('first_name')
            .onBlurChanges.subscribe((value) => (value ? genForm.patchValue({ full_name: `${value} - ` }) : ''));
        // genForm.valueChanges.subscribe((value) => {
        //     console.log(genForm.status);
        //     if (genForm.status === 'VALID') {
        //         console.log('value', value);
        //         genForm.status = 'INVALID';
        //     }
        // });
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
    }, [unSubscribe]);

    return (
        <div className="container h-100 w-100 mt-5">
            <div className="row">
                <FormGenerator className="col-12" onMount={setForm} fieldConfig={formInputConfig} />
            </div>
        </div>
    );
};

export default ExampleFeature;
