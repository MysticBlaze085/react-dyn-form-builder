import '@material-tailwind/html/styles/material-tailwind.css';

import * as Directives from './src/tw-form-ui/directives';
import * as Models from './src/tw-form-ui/models';

import { CheckboxControl } from './src/modules/types';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { store } from './src/store';

export * from './src/store';
// export { default as Button} from './src/modules/components/Button';
// export { default as FieldRenderer } from "./src/modules/FieldRenderer";
// export { default as FormGeneratorWrapper } from "./src/modules/FormGeneratorWrapper";
// export { default as Value} from './src/modules/types/Value';
// export { default as Checkbox } from './src/modules/types/Checkbox';
// export { default as CheckboxGroup } from './src/modules/types/CheckboxGroup';
// export { default as Radio } from './src/modules/types/Radio';
// export { default as RadioGroup } from './src/modules/types/RadioGroup';
// export { default as Select } from './src/modules/types/Select';
// export { default as Text } from './src/modules/types/TextField';
// export { default as TextareaField } from './src/modules/types/TextareaField';
export * from './src/modules/components'



const renderReactComponent = (Component, elementId) => {
    ReactDOM.render(
      <Provider store={store}>
        <Component />
      </Provider>,
      document.getElementById(elementId)
    );
  };
  
  export { CheckboxControl, Models, Directives, renderReactComponent };