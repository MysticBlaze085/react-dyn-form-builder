import { TextInput, Checkbox, RadioButton, SelectBox, Textarea, Value } from '../components';

const FieldRenderer = (type) => {
    switch (type) {
        case 'Textarea': {
            return Textarea;
        }
        case 'Checkbox': {
            return Checkbox;
        }
        case 'TextInput': {
            return TextInput;
        }
        case 'RadioGroup': {
            return RadioButton;
        }
        case 'SelectBox': {
            return SelectBox;
        }
        case 'Value': {
            return Value;
        }
        default: {
            return TextInput;
        }
    }
};

export default FieldRenderer;
