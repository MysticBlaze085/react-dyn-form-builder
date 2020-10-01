import React from 'react';
import {
  FieldGroup,
} from "react-reactive-form";

import { DynamicFormControlsBuilder, FormButtonsBuilder} from '../helpers'

class DynamicFormBuilder extends React.Component { 
  formConfig = this.props.formValue.length ? this.props.formValue : {};
  buildForm = () => DynamicFormControlsBuilder(this.formConfig);
  buttonConfig = this.formConfig.filter(i => i.type === 'Button');

   render() {
     console.log(this.formConfig)
      return (
            <div>
              <h2>Form Builder Testing</h2>
                <FieldGroup 
                  control={this.props.payload}
                  render={({pristine, value}) => (
                    <form onSubmit={() => this.handleSubmit}>
                      {this.buildForm()}
                      {
                        this.buttonConfig.map(i => <FormButtonsBuilder buttonStyles={i.classes} buttonText={i.buttonText} {...i} />)
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