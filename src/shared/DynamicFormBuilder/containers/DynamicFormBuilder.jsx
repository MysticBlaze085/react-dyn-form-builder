import React from 'react';
import {
  FieldGroup,
} from "react-reactive-form";

import { DynamicFormControlsBuilder, FormButtonsBuilder} from '../helpers'
import {InputFields} from '../components';

class DynamicFormBuilder extends React.Component { 
  formConfig = this.props.formValue.length ? this.props.formValue : {};
  buildForm = () => DynamicFormControlsBuilder(this.formConfig);
  buttonConfig = this.formConfig.filter(i => i.type === 'Button');

   render() {
      return (
            <div>
              <h2>Form Builder Testing</h2>
                <FieldGroup
                  control={this.props.payload}
                  render={({pristine, value}) => (
                    <form onSubmit={() => this.handleSubmit}>
                      <InputFields {...this.formConfig} />
                      {
                        this.buttonConfig.map(i => <FormButtonsBuilder classes={i.classes} buttonText={i.buttonText} {...i} />)
                      }
                      <div>
                        <h3>Values</h3>
                        <pre>{JSON.stringify(value, 0, 2)}</pre>
                      </div>
                    </form>
                  )}
                />
            </div>
          )
   } 
}

export default DynamicFormBuilder;