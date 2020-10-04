import { TextInput, Checkbox, Radio, SelectBox, Textarea, Value } from '../components';

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
        case 'Radio': {
            return Radio;
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
