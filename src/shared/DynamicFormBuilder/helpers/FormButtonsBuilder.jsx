import React from 'react';
import { FormButtons } from '../components';

const FormButtonsBuilder = (props) => {
  const { buttonstyles } = props;
  return (
    <FormButtons key={[props].length} classes={buttonstyles} {...props}/>
  )
}

export default FormButtonsBuilder;