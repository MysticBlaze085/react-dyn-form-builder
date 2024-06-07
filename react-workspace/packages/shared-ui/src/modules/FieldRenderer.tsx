import { Checkbox, Dropdown, Radio, Text, Textarea } from './types';

import CheckboxFormControl from './types/Checkbox';
import TextFormControl from './types/Text';

const FieldRenderer = (type: string) => {
    switch (type) {
        case 'text':
            return TextFormControl;
        case 'texterea':
            return Textarea;
        case 'radio':
            return Radio;
        case 'checkbox':
            return CheckboxFormControl;
        case 'dropdown':
            return Dropdown;
        // case 'date':
        //     return DatePicker;
        default:
            return null;
    }
}

export default FieldRenderer;