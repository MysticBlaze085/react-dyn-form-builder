import CheckboxControl, { CheckboxProps } from "./types/Checkbox";
import { RadioControl, RadioGroup, Value } from "./types";
import TextFieldControl, { TextFieldProps } from "./types/TextField";

import CheckboxGroup from "./types/CheckboxGroup";
import { RadioProps } from "./types/Radio";
import SelectControl from "./types/Select";
import TextareaFieldControl from "./types/TextareaField";

export const FieldRenderer = (type: string): React.FC<CheckboxProps | RadioProps | TextFieldProps | any> => {
    switch(type) {
        case 'Text':
            return TextFieldControl;
        case 'Textarea':
            return TextareaFieldControl;
        case 'Radio':
            return RadioControl;
        case 'RadioGroup':
            return RadioGroup;
        case 'Checkbox':
            return CheckboxControl;
        case 'CheckboxGroup':
            return CheckboxGroup;
        case 'Select':
            return SelectControl;
        case 'Value':
            return Value;
        default:
            return TextFieldControl;
    }
};

export default FieldRenderer;