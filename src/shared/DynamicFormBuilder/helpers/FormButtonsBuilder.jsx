import React from 'react';
import { FormButtons } from '../components';

const FormButtonsBuilder = (props) => {
  const { buttonStyles } = props;
  return (
    <FormButtons key={0+1} classes={buttonStyles} {...props}/>
  )
}

export default FormButtonsBuilder;