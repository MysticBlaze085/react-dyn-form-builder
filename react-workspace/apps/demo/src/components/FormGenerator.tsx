import { FormGeneratorProps } from 'shared-ui/node_modules/react-reactive-form';
import { FormGeneratorWrapper } from "shared-ui";

const FormGeneratorWrapperComponent: React.FC<FormGeneratorProps> = ({...props}) => {
  return (
    <div>
      <FormGeneratorWrapper {...props}/>
    </div>
  );
};

export default FormGeneratorWrapperComponent;