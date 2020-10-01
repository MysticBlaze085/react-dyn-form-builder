import React from 'react';
import './App.css';

import DynamicFormBuilder from './shared/DynamicFormBuilder/containers/DynamicFormBuilder';
import formConfig from './form.config';
import {
  FormBuilder,
} from "react-reactive-form";

class App extends React.Component {
  buildPayload = (payload) => FormBuilder.group(payload.reduce((acc, post) => {
    let { name, value } = post;
    return { ...acc, [name]: value }
  }, {}));

  render() {
    const buildPayload = this.buildPayload(formConfig());
    const passPayloadToConfig = formConfig(buildPayload);

    return (
      <div className="container h-100 w-100 mt-5">
        <div className="d-flex flex-column justify-content-center">
          <DynamicFormBuilder formValue={passPayloadToConfig} payload={buildPayload} />
        </div>
      </div>

    );
  }
}

export default App;