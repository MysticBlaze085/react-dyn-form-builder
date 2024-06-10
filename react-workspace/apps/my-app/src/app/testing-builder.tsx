"use client";

import FormGeneratorWrapperComponent from "./components/FormGenerator";
import { useCallback, useEffect, useState } from "react";
import formInputConfig from "./form.config";

const TestFormGenComponent = () => {
    const [genForm, setGenForm] = useState<any>(null);

    const setInputNesting = useCallback(() => {
        console.log('genForm', genForm);
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
        },
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
    <div>
      <FormGeneratorWrapperComponent onMount={setForm} fieldConfig={formInputConfig} />
    </div>
  );
};

export default TestFormGenComponent;