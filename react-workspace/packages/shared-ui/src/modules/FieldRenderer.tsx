import Checkbox from "./types/Checkbox";
import CheckboxControl from "./types/Checkbox";
import CheckboxGroup from "./types/CheckboxGroup";
import Radio from "./types/Radio";
import RadioGroup from "./types/RadioGroup";
import Select from "./types/Select";
import TextFieldControl from "./types/TextField";
import TextareaField from "./types/TextareaField";
import { Value } from "./types";

const FieldRenderer = (type: string) => {
    switch(type) {
        case 'Text':
            return TextFieldControl;
        case 'Textarea':
            return TextareaField;
        case 'Radio':
            return Radio;
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
}

export default FieldRenderer;