import {FormButtonsStyles, FormInputFieldStyles} from './assets/FormBuilderStyles';

const formConfig = (payload) => {
  return [
  {
    name: 'first_name',
    type: 'Input',
    label: 'First Name',
    placeholder: 'Enter first name',
    value: 'Mel',
  },
  {
    name: 'last_name',
    type: 'Input',
    label: 'Last Name',
    placeholder: 'Enter last name',
    value: '',
  },
  {
    name: 'gender',
    type: 'RadioButton',
    label: 'Gender',
    value: 'Male',
    options: ['Male', 'Female', 'Other'],
  },
  {
    name: 'nationality',
    type: 'Selector',
    label: 'Nationality',
    value: '',
    options: ['US', 'UK', 'India', 'China'],
  },
  {
    name: 'notes',
    type: 'Textarea',
    placeholder: 'Empty',
    label: 'Notes',
    classes: FormInputFieldStyles,
    value: '',
  },
  {
    name: 'terms',
    type: 'CheckBox',
    label: 'I agree to the terms and condition.',
    value: false,
  },
  {
    type: 'Button',
    buttonText: 'Submit',
    classes: FormButtonsStyles,
    isdisabled: `true`,
    onClickAction: (e) => { e.preventDefault();
    alert(`You submitted \n ${JSON.stringify(payload.value, null, 2)}`); }
  },
  {
    type: 'Button',
    buttonText: 'Reset',
    classes: FormButtonsStyles,
    isdisabled: `false`,
    onClickAction: () => { payload.reset(); }
  }
]};

export default formConfig;
