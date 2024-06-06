import { Text } from './types';

const FieldRenderer = (type: string) => {
    switch (type) {
        case 'text':
            return Text;
        case 'radio':
            return 'Radio';
        case 'checkbox':
            return 'Checkbox';
        case 'dropdown':
            return 'Dropdown';
        case 'date':
            return 'DatePicker';
        default:
            return 'TextField';
    }
}

export default FieldRenderer;