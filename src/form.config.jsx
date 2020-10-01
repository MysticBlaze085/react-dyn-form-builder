import {FormButtonsStyles, FormInputFieldStyles} from './assets/FormBuilderStyles';

const formConfig = (payload) => {
  return [
  {
    name: 'first_name',
    render: 'TextInput',
    label: 'First Name',
    placeholder: 'Enter first name',
    value: 'Mel',
  },
  {
    name: 'last_name',
    render: 'TextInput',
    label: 'Last Name',
    placeholder: 'Enter last name',
    value: '',
  },
  {
    name: 'gender',
    render: 'RadioButton',
    label: 'Gender',
    value: 'Male',
    options: ['Male', 'Female', 'Other'],
  },
  {
    name: 'nationality',
    render: 'SelectBox',
    label: 'Nationality',
    value: '',
    options: ['US', 'UK', 'India', 'China'],
  },
  {
    name: 'notes',
    render: 'TextArea',
    placeholder: 'Empty',
    label: 'Notes',
    classes: FormInputFieldStyles,
    value: '',
  },
  {
    name: 'terms',
    render: 'CheckBox',
    label: 'I agree to the terms and condition.',
    value: false,
  },
  {
    type: 'Button',
    buttonText: 'Submit',
    classes: FormButtonsStyles,
    isDisabled: true,
    onClickAction: (e) => { e.preventDefault();
    alert(`You submitted \n ${JSON.stringify(payload.value, null, 2)}`); }
  },
  {
    type: 'Button',
    buttonText: 'Reset',
    classes: FormButtonsStyles,
    isDisabled: false,
    onClickAction: () => { payload.reset(); }
  }
]};

export default formConfig;
