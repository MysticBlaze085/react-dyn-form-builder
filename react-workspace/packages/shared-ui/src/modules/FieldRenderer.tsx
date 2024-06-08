import Checkbox from "./types/Checkbox";
import CheckboxControl from "./types/Checkbox";
import CheckboxGroup from "./types/CheckboxGroup";
import Radio from "./types/Radio";
import RadioGroup from "./types/RadioGroup";
import Select from "./types/Select";
import TextField from "./types/TextField";
import TextareaField from "./types/TextareaField";

const FieldRenderer = (type: string) => {
    switch(type) {
        case 'Text':
            return TextField;
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
        default:
            return TextField;
    }
}

export default FieldRenderer;