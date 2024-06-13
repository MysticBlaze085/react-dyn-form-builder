### Dynamic Form Builder

- Dynamic Form Builder is an Angular module which has a directive to help customize and render JavaScript/JSON configured forms.
- Requires [FlexLayoutModule](https://github.com/angular/flex-layout) 
- Requires [Angular Materials](https://material.angular.io/guide/getting-started)

### HTML Example

```html
 <form [formGroup]="form" (keydown)="form.markAllAsTouched()">
    <ng-container *ngFor="let control of controlConfig">
      <lyn-dyn-form 
        *ngIf="!control.hidden && !control.controlName.includes('.')"  
        [width]="'450px'" 
        [fieldControl]="control" 
        (valueChanges)="form.patchValue($event)">
      </lyn-dyn-form>
      <ng-container *ngTemplateOutlet="nestedControls; context:{form: form, control: control}"></ng-container>
    </ng-container>
  </ng-container>
</form>

<ng-template #nestedControls let-form="form" let-control="control">
  <lyn-dyn-form
    *ngIf="!control.hidden && control.controlName.includes('.')"
    width="100%"
    [fieldControl]="control"
    [formValue]="form.get(getControlName(control))?.value"
    (valueChanges)="patchForm(form, $event)"
  ></lyn-dyn-form>
</ng-template>
```

### Example configured JavaScript arrays

```javascript
const controlInputs: FieldControlModel<FieldTypes>[] = [
  // hidden Text
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: 'hidden',
    hidden: true,
    required: true,
    validators: [Validators.required],
    value: Guid.create(),
    disabled: true,
  }),
  // basic Text with custom validation for 256 characters
  new FieldControlHelper({
    controlType: FieldControlEnums.Text,
    controlName: 'name',
    hint: 'Name of the field.',
    info: 'The name field contains the name.',
    label: 'Name',
    placeholder: 'Name',
    required: true,
    validators: [Validators.required, new FormValidationHelper().maxCharacterLength(256)],
    dataCy: 'name',
    value: 'Name Value',
  }),
  // basic Text with custom validations and angular validation
  new FieldControlHelper<string>({
    controlType: FieldControlEnums.Text,
    controlName: 'baseUrlPattern',
    errorMessage: 'Base Path is required and less than 50 characters',
    hint: 'Uniquely identify your API Proxies address.',
    info: 'The Base URL Pattern field is the URL paths that will be added to the domain name and “rapid.lyniate.com” to uniquely identify your API Proxies address. For example, if you enter “/FHIR” and your domain name is “MedCo”, the path to your API Proxies will be “https://MedCo.rapid.lyniate.com/FHIR.”',
    label: 'Base URL Pattern',
    placeholder: 'Base URL Patter',
    required: true,
    validators: [
      Validators.required,
      Validators.maxLength(50),
      new FormValidationHelper().baseUrlPatternValidator(),
      new FormValidationHelper().noWhitespaceValidator(),
    ],
    dataCy: 'basePath',
    value: null
  }),
  // Insight Text
  new FieldControlHelper<string>({
    controlType: FieldControlEnums.InsightText,
    controlName: `insightText`,
    errorMessage: 'insightText Path is required',
    icon: {
      type: TextIconEnums.SUFFIX,
      color: InsightColorEnums.INFO,
      icon: InsightIconEnums.INFO,
      eventType: IconEventEnums.WARNING,
      text: 'HTTPS is recommended for secure communications',
    },
    hint: 'Fully qualified address to which the messages are received.',
    info: 'The insightText URL field is the fully qualified address to which the messages that are received on the API Proxies will be passed. This field is required and must include the entire path to the endpoint. For example, “http://rapid.lyniate.com.”',
    label: 'Insight Text Path',
    required: true,
    placeholder: 'Insight Text Path',
    validators: [
      Validators.required,
      new FormValidationHelper().httpsIconHintValidation(),
      new FormValidationHelper().httpsOrHttpValidation(),
    ],
    dataCy: 'endpointPath',
    value: null
  }),
  // Password Text
  new FieldControlHelper<string>({
    controlType: FieldControlEnums.Password,
    controlName: 'password',
    hint: 'Applied to the authentication header of the message',
    label: 'Password',
    placeholder: 'Password',
    required: true,
    validators: [Validators.required],
  }),
  // Textarea Text
  new FieldControlHelper<string>({
    controlType: FieldControlEnums.Textarea,
    controlName: 'textarea',
    hint: 'Textarea hint',
    label: 'Textarea',
    placeholder: 'Textarea',
    required: true,
    validators: [Validators.required, new FormValidationHelper().maxCharacterLength(256)],
    textareaMinRows: 5,
    textareaMaxRows: 15,
    value: null
  }),
  // Checkbox
  new FieldControlHelper<boolean>({
    controlType: FieldControlEnums.CheckBox,
    controlName: 'checkbox',
    hint: 'Turn on or off Override Body Text',
    label: 'Enable Override Body Text',
    placeholder: 'Enable Override Body Text',
    required: true,
    validators: [Validators.required],
    value: false,
  }),
  // Value nesting, supports only two levels deep into an object
  new FieldControlHelper<boolean>({
    controlType: FieldControlEnums.Text,
    controlName: 'nested.childOneDot',
    required: true,
    validators: [Validators.required],
    value: false,
    hidden: true,
  }),
  new FieldControlHelper<boolean>({
    controlType: FieldControlEnums.Text,
    controlName: 'nested.child.twoDots',
    required: true,
    validators: [Validators.required],
    value: false,
    hidden: true,
  }),
    // basic dropdown
  new DropdownFieldHelper({
    controlType: DropdownFieldControlEnums.DefaultDropdown,
    controlName: 'dropdown',
    hint: 'Dropdown List',
    info: 'Info of dropdown',
    isMultiple: false,
    label: 'Dropdown',
    placeholder: 'Dropdown',
    required: true,
    validators: [Validators.required],
    dataCy: 'gatewayName',
    value: 'value2',
    options: [
      { isOptionGroup: false, key: 'key', value: 'value', dataCy: 'default-key-value-pair' },
      { isOptionGroup: false, key: 'key2', value: 'value2', dataCy: 'default-key-value-pair' },
      { isOptionGroup: false, key: 'key3', value: 'value3', dataCy: 'default-key-value-pair' },
    ],
  }),
  // multi dropdown
  new DropdownFieldHelper({
    controlType: DropdownFieldControlEnums.MultiDropdown,
    controlName: 'dropdownMulti',
    hint: 'Multi-Dropdown List',
    info: 'Info of dropdown',
    isMultiple: true,
    isSelectAllOptions: true,
    selectAllDisplay: 'Select',
    label: 'Multi-Dropdown',
    placeholder: 'Multi-Dropdown',
    required: true,
    validators: [Validators.required],
    dataCy: 'gatewayName',
    value: [],
    options: [
      { isOptionGroup: false, key: 'key', value: 'value', dataCy: 'default-key-value-pair' },
      { isOptionGroup: false, key: 'key2', value: 'value2', dataCy: 'default-key-value-pair' },
      { isOptionGroup: false, key: 'key3', value: 'value3', dataCy: 'default-key-value-pair' },
    ],
  }),
  // option groups dropdown
  new DropdownFieldHelper({
    controlType: DropdownFieldControlEnums.DropdownOptionGroups,
    controlName: 'dropdownGroup',
    hint: 'Group-Dropdown List',
    info: 'Info of dropdown',
    isMultiple: false,
    label: 'Group-Dropdown',
    placeholder: 'Group-Dropdown',
    required: true,
    validators: [Validators.required],
    dataCy: 'gatewayName',
    value: '',
    options: [
      {
        isOptionGroup: true,
        optgroupLabel: 'Group',
        options: [
          { key: 'key', value: 'value', dataCy: 'default-key-value-pair' },
          { key: 'key2', value: 'value2', dataCy: 'default-key-value-pair' },
          { key: 'key3', value: 'value3', dataCy: 'default-key-value-pair' },
        ],
      },
    ],
  }),
  // autocomplete dropdown with custom validation
  new DropdownFieldHelper({
    controlType: DropdownFieldControlEnums.Autocomplete,
    controlName: 'autocompleteDropdown',
    hint: 'Autocomplete Dropdown List',
    info: 'Info of dropdown',
    isMultiple: true,
    isSelectAllOptions: true,
    selectAllDisplay: 'Select',
    label: 'Autocomplete Dropdown',
    placeholder: 'Autocomplete Dropdown',
    required: true,
    validators: [Validators.required],
    dataCy: 'gatewayName',
    value: [],
    options: [
      { isOptionGroup: false, key: 'key', value: 'value', dataCy: 'default-key-value-pair' },
      { isOptionGroup: false, key: 'key2', value: 'value2', dataCy: 'default-key-value-pair' },
      { isOptionGroup: false, key: 'key3', value: 'value3', dataCy: 'default-key-value-pair' },
    ],
  }),
    // Radio Field Group
  new RadioFieldHelper({
    controlType: FieldControlEnums.RadioGroup,
    controlName: 'radioGroup',
    required: true,
    label: 'Radio Field Group',
    validators: [Validators.required],
    fxLayoutAlign: 'center',
    fxLayout: 'row',
    options: [
      {
        key: 'key',
        value: 'value',
      },
      {
        key: 'key2',
        value: 'value2',
      },
      {
        key: 'key3',
        value: 'value3',
      },
    ],
    value: null,
  }),
];
```


### Angular Sandbox working examples

- `npm run playground` go to browser `http://localhost:4201` and press `ctrl + p` / `f2` all field examples: `Dynamic Form Control Inputs`
