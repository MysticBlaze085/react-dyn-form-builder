"use client";

import { FormGeneratorWrapper } from "shared-ui";
import { FormGeneratorProps } from 'shared-ui/node_modules/react-reactive-form';

const FormGeneratorWrapperComponent: React.FC<FormGeneratorProps> = ({...props}) => {
  return (
    <div>
      <FormGeneratorWrapper {...props}/>
    </div>
  );
};

export default FormGeneratorWrapperComponent;