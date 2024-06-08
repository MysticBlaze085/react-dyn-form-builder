import { FormGenerator, FormGeneratorProps } from 'react-reactive-form';

import React from 'react';

const FormGeneratorWrapper: React.FC<FormGeneratorProps> = ({
  onMount = () => {},
  fieldConfig = { controls: {} }, // Provide a valid FieldConfig object here
  ...props
}) => {
  return <FormGenerator onMount={onMount} fieldConfig={fieldConfig} {...props} />;
};

export default FormGeneratorWrapper;
