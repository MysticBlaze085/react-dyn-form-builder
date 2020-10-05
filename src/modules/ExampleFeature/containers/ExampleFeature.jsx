import React from 'react';
import formInputConfig from './form.config';
import { FormGenerator } from 'react-reactive-form';

class ExampleFeature extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        alert(`You submitted \n ${JSON.stringify(this.genForm.value, null, 2)}`);
    };
    handleReset = () => {
        this.genForm.reset();
    };

    setForm = (form) => {
        this.genForm = form;
        this.genForm.meta = {
            handleSubmit: this.handleSubmit,
            handleReset: this.handleReset,
        };
    };

    componentDidMount() {
        this.genForm
            .get('first_name')
            .onBlurChanges.subscribe((value) => (value ? this.genForm.patchValue({ full_name: `${value} - ` }) : ''));
        this.genForm.valueChanges.subscribe((value) => {
            if (!value.terms && this.genForm.status === 'VALID') {
                this.genForm.status = 'INVALID';
            }
        });
    }

    componentWillUnmount() {
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
