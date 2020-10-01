import React from 'react';
import {
  FieldControl
} from "react-reactive-form";

import {
  TextInput,
  Checkbox,
  SelectBox,
  TextArea,
  RadioButtons
} from "../components";

const DynamicFormControlsBuilder = (props) => {
 return props.map(i =>{
        switch(i.render) {
          case 'TextInput':{
              return <FieldControl name={i.name} render={TextInput} meta={{label: i.label, placeholder: i.placeholder, classes: i.classes}} />
            }
          case 'RadioButton': {
            return <FieldControl name={i.name} render={RadioButtons} meta={{label: i.label, options: i.options, classes: i.classes}} />
          }
          case 'SelectBox': {
            return <FieldControl name={i.name} render={SelectBox}  meta={{label: i.label, options: i.options, classes: i.classes}} />
          }
          case 'TextArea': {
            return <FieldControl name={i.name} render={TextArea} meta={{label: i.label, placeholder: i.placeholder, classes: i.classes}} />
          }
          case 'CheckBox': {
            return <FieldControl name={i.name} render={Checkbox} meta={{label: i.label, classes: i.classes}} />
          }
          default: {
            return null;
          }
        }
      });
}

export default DynamicFormControlsBuilder;