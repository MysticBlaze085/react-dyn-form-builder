import CheckboxControl, { CheckboxProps } from "./types/Checkbox";
import { RadioControl, Value } from "./types";
import TextFieldControl, { TextFieldProps } from "./types/TextField";

import CheckboxGroup from "./types/CheckboxGroup";
import RadioGroup from "./types/RadioGroup";
import { RadioProps } from "./types/Radio";
import Select from "./types/Select";
import TextareaField from "./types/TextareaField";

export const FieldRenderer = (type: string): React.FC<CheckboxProps | RadioProps | TextFieldProps | any> => {
    switch(type) {
        case 'Text':
            return TextFieldControl;
        case 'Textarea':
            return TextareaField;
        case 'Radio':
            return RadioControl;
        case 'RadioGroup':
            return RadioGroup;
        case 'Checkbox':
            return CheckboxControl;
        case 'CheckboxGroup':
            return CheckboxGroup;
        case 'Select':
            return Select;
        case 'Value':
            return Value;
        default:
            return TextFieldControl;
    }
};

export default FieldRenderer;