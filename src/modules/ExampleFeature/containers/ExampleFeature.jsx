import React from 'react';
import formInputConfig from './form.config';
import { FormGenerator } from 'react-reactive-form';

class ExampleFeature extends React.Component {
    setInputNesting = () => {
        this.genForm
            .get('first_name')
            .onBlurChanges.subscribe((value) => (value ? this.genForm.patchValue({ full_name: `${value} - ` }) : ''));
        this.genForm.valueChanges.subscribe((value) => {
            if (!value.terms && this.genForm.status === 'VALID') {
                this.genForm.status = 'INVALID';
            }
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        alert(`You submitted \n ${JSON.stringify(this.genForm.value, null, 2)}`);
    };

    handleEditMode = () => {
        this.genForm.status === 'DISABLED'
            ? this.genForm.enable({ onlySelf: true })
            : this.genForm.disable({ onlySelf: true });
        this.genForm.reset();
    };

    setForm = (form) => {
        this.genForm = form;
        this.genForm.meta = {
            handleSubmit: this.handleSubmit,
            handleEditMode: this.handleEditMode,
        };
    };

    componentDidMount() {
        this.setInputNesting();
        this.handleEditMode();
    }

    componentWillUnmount() {
        this.genForm.get('first_name').unsubscribe();
        this.genForm.valueChanges.unsubscribe();
    }

    render() {
        return (
            <div className="container h-100 w-100 mt-5">
                <div className="row">
                    <FormGenerator className="col-12" onMount={this.setForm} fieldConfig={formInputConfig} />
                </div>
            </div>
        );
    }
}

export default ExampleFeature;
