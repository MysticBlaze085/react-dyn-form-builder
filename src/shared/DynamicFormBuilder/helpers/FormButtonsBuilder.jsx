import React from 'react';
import { FormButtons } from '../components';

const FormButtonsBuilder = (props) => {
  const { buttonstyles } = props;
  return (
    <FormButtons key={0+1} classes={buttonstyles} {...props}/>
  )
}

export default FormButtonsBuilder;