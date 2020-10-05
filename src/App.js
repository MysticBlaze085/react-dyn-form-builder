import React from 'react';
import './App.css';
import fieldConfig from './form.config';
import { FormGenerator } from 'react-reactive-form';
class App extends React.Component {
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

    render() {
        return (
            <div className="container h-100 w-100 mt-5">
                <div className="d-flex flex-column justify-content-center">
                    <FormGenerator onMount={this.setForm} fieldConfig={fieldConfig} />
                </div>
            </div>
        );
    }
}

export default App;
